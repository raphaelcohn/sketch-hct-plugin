#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _path = require('path');

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _toolConfig = require('@skpm/internal-utils/tool-config');

var _skpmConfig = require('@skpm/internal-utils/skpm-config');

var _skpmConfig2 = _interopRequireDefault(_skpmConfig);

var _getSketchVersion = require('@skpm/internal-utils/getSketchVersion');

var _getSketchVersion2 = _interopRequireDefault(_getSketchVersion);

var _checkDevMode = require('@skpm/internal-utils/check-dev-mode');

var _checkDevMode2 = _interopRequireDefault(_checkDevMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Linking makes no sense when running on a CI, so let's do nothing here
if (process.env.CI) {
  process.exit(0);
}

const { pluginDirectory } = (0, _toolConfig.get)();

const { argv } = _yargs2.default.scriptName('skpm-link').help().strict().usage('Usage: cd path/to/my/plugin && skpm-link').option('output', {
  describe: 'The path to the final plugin. Use this option if you need to link specific version of your plugin.',
  type: 'string'
}).help().strict();

const path = argv.$1 || '.';

if (path.indexOf(pluginDirectory) !== -1) {
  console.error(`${_chalk2.default.red('error')} The path should be the one pointing to your new plugin folder, not the sketch plugins folder`);
  process.exit(1);
}

function getPath(file) {
  return path[0] === '/' ? (0, _path.join)(path, file) // absolute path
  : (0, _path.join)(process.cwd(), path, file); // relative path
}

let packageJSON;
try {
  packageJSON = require(getPath('package.json'));
} catch (err) {
  console.error(`${_chalk2.default.red('error')} Error while reading the package.json file`);
  console.error(err);
  process.exit(1);
}

const skpmConfig = (0, _skpmConfig2.default)(packageJSON, argv);

if (!skpmConfig.main) {
  console.error(`${_chalk2.default.red('error')} Missing "skpm.main" fields in the package.json. Should point to the ".sketchplugin" file`);
  process.exit(1);
}

if (!skpmConfig.name) {
  console.error(`${_chalk2.default.red('error')} Missing "name" field in the package.json.`);
  process.exit(1);
}

console.log(`${_chalk2.default.dim('[1/1]')} 🔗  Symlinking the plugin ${skpmConfig.name}...`);

try {
  // Create the encompassing directory if it doesn't already exist
  if (!_fs2.default.existsSync((0, _path.join)(pluginDirectory, skpmConfig.name))) {
    _mkdirp.mkdirp.sync((0, _path.join)(pluginDirectory, skpmConfig.name));
  }

  const symlinkPath = (0, _path.join)(pluginDirectory, skpmConfig.name, (0, _path.basename)(skpmConfig.main));
  // Show an error if this symlink already exists
  if (_fs2.default.existsSync(symlinkPath)) {
    console.log(`${_chalk2.default.yellow('warning')} This plugin has already been linked.`);
    process.exit(0);
  }

  // Create the symlink within the encompassing directory
  _fs2.default.symlinkSync(getPath(skpmConfig.main), symlinkPath);

  console.log(`${_chalk2.default.green('success')} Plugin ${skpmConfig.name} symlinked`);
  console.log(`${_chalk2.default.blue(skpmConfig.name)} - ${_chalk2.default.grey(skpmConfig.version)}`);

  (0, _checkDevMode2.default)().then(() => (0, _getSketchVersion2.default)()).then(sketchVersion => {
    if (sketchVersion && _semver2.default.gte(sketchVersion, '45.0.0')) {
      console.log();
      console.log(`${_chalk2.default.yellow('warning')} Starting with Sketch 45, you may need to restart Sketch for your plugin to appear in the "Plugins" menu`);
      console.log();
    }
    process.exit(0);
  });
} catch (err) {
  console.log(`${_chalk2.default.red('error')} Error while symlinking the plugin ${skpmConfig.name}`);
  console.log((err || {}).body || err);
  process.exit(1);
}