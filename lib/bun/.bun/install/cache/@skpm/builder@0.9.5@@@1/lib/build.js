#!/usr/bin/env node
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let copyManifest = (() => {
  var _ref = _asyncToGenerator(function* (manifestJSON) {
    return new Promise(function (resolve, reject) {
      const copy = _extends({}, manifestJSON);
      copy.version = manifestJSON.version || skpmConfig.version;
      copy.description = manifestJSON.description || skpmConfig.description;
      copy.homepage = manifestJSON.homepage || skpmConfig.homepage;
      copy.name = manifestJSON.name || skpmConfig.name;
      copy.identifier = manifestJSON.identifier || skpmConfig.identifier;
      copy.disableCocoaScriptPreprocessor = typeof manifestJSON.disableCocoaScriptPreprocessor === 'undefined' ? true : manifestJSON.disableCocoaScriptPreprocessor;

      if (manifestJSON.appcast !== false && skpmConfig.appcast !== false) {
        copy.appcast = manifestJSON.appcast || appcastURL(skpmConfig.appcast || '.appcast.xml');
      } else {
        delete copy.appcast;
      }

      if (!copy.author && skpmConfig.author) {
        let { author } = skpmConfig;
        if (typeof skpmConfig.author === 'string') {
          author = (0, _parseAuthor2.default)(skpmConfig.author);
        }
        copy.author = author.name;
        if (!copy.authorEmail && author.email) {
          copy.authorEmail = author.email;
        }
      }

      copy.commands = manifestJSON.commands.map(function (command) {
        const script = command.script.replace(/\.(?![jt]sx?$)|\//g, '_').replace(/[jt]sx?$/, 'js');
        return _extends({}, command, { script });
      });

      _fs2.default.writeFile(_path2.default.join(output, 'Contents', 'Sketch', 'manifest.json'), JSON.stringify(copy, null, 2), function (err) {
        if (err) {
          reject(new Error(`Error while writing the manifest: ${err.message}`));
          return;
        }
        resolve();
      });
    });
  });

  return function copyManifest(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getResources = (() => {
  var _ref2 = _asyncToGenerator(function* (_skpmConfig) {
    if (!_skpmConfig.resources || !_skpmConfig.resources.length) {
      return [];
    }

    const resources = yield (0, _globby2.default)(_skpmConfig.resources);
    return resources;
  });

  return function getResources(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let getAssets = (() => {
  var _ref3 = _asyncToGenerator(function* (_skpmConfig) {
    if (!_skpmConfig.assets || !_skpmConfig.assets.length) {
      return [];
    }

    const assets = yield (0, _globby2.default)(_skpmConfig.assets, { dot: true });
    return assets;
  });

  return function getAssets(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

let copyAsset = (() => {
  var _ref4 = _asyncToGenerator(function* (asset) {
    const dirWithoutFirst = _path2.default.normalize(asset).split(_path2.default.sep).splice(1).join(_path2.default.sep);

    const destPath = _path2.default.join(output, 'Contents', 'Resources', dirWithoutFirst);

    yield (0, _mkdirp.mkdirp)(_path2.default.dirname(destPath));

    return new Promise(function (resolve, reject) {
      const callback = function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      };
      if (_fs2.default.copyFile) {
        _fs2.default.copyFile(asset, destPath, callback);
      } else {
        (0, _child_process.exec)(`cp "${asset}" "${destPath}"`, callback);
      }
    }).then(function () {
      console.log(`${argv.watch ? '' : _chalk2.default.dim(`[${counter + 1}/${steps}] `)}${randomBuildEmoji()}  Copied ${_chalk2.default.blue(asset)}`);
      if (!argv.watch) {
        checkEnd();
      }
    }).catch(function (err) {
      console.error(`${_chalk2.default.red('error')} Error while copying ${asset}`);
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
    });
  });

  return function copyAsset(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

let buildCommandsAndResources = (() => {
  var _ref5 = _asyncToGenerator(function* (commands, resources, watch) {
    const webpackConfig = yield (0, _webpackConfig2.default)(argv, output, manifestFolder, skpmConfig);

    const compilers = [];
    const entries = commands.concat((resources || []).map(function (resource) {
      return {
        isPluginCommand: false,
        script: resource,
        absolutePath: _path2.default.join(process.cwd(), resource)
      };
    }));

    // eslint-disable-next-line no-restricted-syntax
    for (const entry of entries) {
      const compiler = (0, _webpack2.default)((yield webpackConfig(entry)));
      if (watch) {
        // https://github.com/webpack/webpack.js.org/issues/125
        // watchOptions need to be manually passed to the watch() method.
        compilers.push(compiler.watch(compiler.options.watchOptions, buildCallback(entry.script, watch)));
      } else {
        compiler.run(buildCallback(entry.script));
      }
    }

    return compilers;
  });

  return function buildCommandsAndResources(_x5, _x6, _x7) {
    return _ref5.apply(this, arguments);
  };
})();

let buildPlugin = (() => {
  var _ref6 = _asyncToGenerator(function* () {
    let manifestJSON;
    try {
      // delete the require cache so that we can require it anew (when watching)
      delete require.cache[manifest];
      manifestJSON = require(manifest);

      // set the identifier because we need it to reload the plugin
      skpmConfig.identifier = manifestJSON.identifier || skpmConfig.identifier || skpmConfig.name;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    const commands = getCommands(manifestJSON);
    const resources = yield getResources(skpmConfig);
    const assets = yield getAssets(skpmConfig);
    steps = commands.length + resources.length + assets.length + 1;

    const now = Date.now();

    // start by copying the manifest
    try {
      yield copyManifest(manifestJSON);
      if (!argv.watch) {
        console.log(`${_chalk2.default.dim(`[${counter + 1}/${steps}]`)} 🖨  Copied ${_chalk2.default.blue(skpmConfig.manifest)} in ${_chalk2.default.grey(Date.now() - now)}ms`);
        checkEnd();
      } else {
        console.log(`🖨  Copied ${_chalk2.default.blue(skpmConfig.manifest)} in ${_chalk2.default.grey(Date.now() - now)}ms`);
      }
    } catch (err) {
      console.error(`${_chalk2.default.red('error')} Error while copying ${skpmConfig.manifest}`);
      console.error(err);
      if (!argv.watch) {
        process.exit(1);
      }
    }

    // then copy the assets
    // we do not watch them because we would need to spin a new chokidar instance and that's expensive
    // if you add a new asset, just restart the build
    yield Promise.all(assets.map(copyAsset));

    // and then, build the commands
    return buildCommandsAndResources(commands, resources, argv.watch);
  });

  return function buildPlugin() {
    return _ref6.apply(this, arguments);
  };
})();

let buildAndWatchPlugin = (() => {
  var _ref7 = _asyncToGenerator(function* () {
    let compilers = yield buildPlugin();

    if (argv.watch) {
      _fs2.default.watch(manifest, _asyncToGenerator(function* () {
        // manifest has changed, we need to rebuild the plugin entirely

        if (compilers && compilers.length) {
          // if we are watching the commands, close the watchers first
          yield Promise.all(compilers.map(function (c) {
            return new Promise(function (resolve) {
              if (c) {
                c.close(resolve);
              } else {
                resolve();
              }
            });
          }));
        }

        compilers = yield buildPlugin();
      }));
    }
  });

  return function buildAndWatchPlugin() {
    return _ref7.apply(this, arguments);
  };
})();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _parseAuthor = require('parse-author');

var _parseAuthor2 = _interopRequireDefault(_parseAuthor);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _child_process = require('child_process');

var _skpmConfig2 = require('@skpm/internal-utils/skpm-config');

var _skpmConfig3 = _interopRequireDefault(_skpmConfig2);

var _replaceArraysByLastItem = require('@skpm/internal-utils/replace-arrays-by-last-item');

var _replaceArraysByLastItem2 = _interopRequireDefault(_replaceArraysByLastItem);

var _webpackConfig = require('./utils/webpackConfig');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const buildEmojis = ['🔧', '🔨', '⚒', '🛠', '⛏', '🔩'];
function randomBuildEmoji() {
  return buildEmojis[Math.floor(Math.random() * buildEmojis.length)];
}

const { argv } = _yargs2.default.scriptName('skpm-build').option('watch', {
  alias: 'w',
  describe: 'Watch and rebuild automatically',
  type: 'boolean'
}).option('quiet', {
  alias: 'q',
  describe: 'Hide compilation warnings',
  type: 'boolean'
}).option('run', {
  alias: 'r',
  describe: 'Run plugin after compiling',
  type: 'boolean'
}).option('app', {
  describe: "The path to the copy of Sketch to run the plugin after compiling. If this isn't supplied, we try to run the latest Xcode build. If there is none, we try to find a normal Sketch.",
  type: 'string'
}).option('manifest', {
  describe: 'The path to another manifest. Use this option if you need to build different version of your plugin.',
  type: 'string'
}).option('output', {
  describe: 'The path to the final plugin. Use this option if you need to build different version of your plugin.',
  type: 'string'
}).help().strict();

(0, _replaceArraysByLastItem2.default)(argv, ['watch', 'quiet', 'run', 'app', 'manifest', 'output']);

let packageJSON;
try {
  packageJSON = require(_path2.default.join(process.cwd(), 'package.json'));
} catch (err) {
  console.error(`${_chalk2.default.red('error')} Error while reading the package.json file`);
  console.error(err);
  process.exit(1);
}

const skpmConfig = (0, _skpmConfig3.default)(packageJSON, argv);

if (!skpmConfig.main) {
  console.error(`${_chalk2.default.red('error')} Missing "skpm.main" fields in the package.json. Should point to the ".sketchplugin" file`);
  process.exit(1);
}
if (!skpmConfig.manifest) {
  console.error(`${_chalk2.default.red('error')} Missing "skpm.manifest" fields in the package.json. Should point to the "manifest.json" file`);
  process.exit(1);
}

const output = _path2.default.join(process.cwd(), skpmConfig.main);
const manifest = _path2.default.join(process.cwd(), skpmConfig.manifest);

if (!_fs2.default.existsSync(_path2.default.join(output, 'Contents', 'Sketch'))) {
  _mkdirp.mkdirp.sync(_path2.default.join(output, 'Contents', 'Sketch'));
}

const manifestFolder = _path2.default.dirname(manifest);

const appcastURL = appcast => {
  if (/^http/.test(appcast)) {
    return appcast;
  }
  return `https://raw.githubusercontent.com/${skpmConfig.repository}/master/${appcast.replace(/^\.\//g, '')}`;
};

let counter = 0;

function getCommands(manifestJSON) {
  const commandsAndHandlers = manifestJSON.commands.reduce((prev, c) => {
    if (!prev[c.script]) {
      prev[c.script] = {
        isPluginCommand: true,
        absolutePath: _path2.default.join(manifestFolder, c.script),
        script: c.script,
        handlers: [],
        identifiers: []
      };
    }
    if (c.handler) {
      prev[c.script].handlers.push(c.handler);
    } else if (c.handlers) {
      // eslint-disable-next-line no-inner-declarations
      function getHandlers(handlers) {
        if (typeof handlers === 'string') {
          prev[c.script].handlers.push(handlers);
        } else if (Array.isArray(c.handlers)) {
          c.handlers.forEach(h => {
            prev[c.script].handlers.push(h);
          });
        } else {
          Object.keys(handlers).forEach(k => getHandlers(handlers[k]));
        }
      }
      getHandlers(c.handlers);
    }

    // always expose the default
    if (prev[c.script].handlers.indexOf('onRun') === -1) {
      prev[c.script].handlers.push('onRun');
    }
    if (c.identifier) {
      prev[c.script].identifiers.push(c.identifier);
    }
    return prev;
  }, {});

  return Object.keys(commandsAndHandlers).map(k => commandsAndHandlers[k]);
}

let steps;
function checkEnd() {
  counter += 1;
  if (counter >= steps) {
    console.log(`${_chalk2.default.green('success')} Plugin built`);
    process.exit(0);
  }
}

function buildCallback(file, watching) {
  return (err, stats) => {
    if (err) {
      console.error(`${_chalk2.default.red('error')} Error while building ${file}`);
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
    }

    const info = stats.toJson({
      chunks: false,
      colors: true,
      modules: false,
      assets: false,
      performance: false,
      reasons: false,
      version: false
    });

    if (stats.hasErrors()) {
      console.error(`${_chalk2.default.red('error')} Error while building ${file}`);(info.errors || []).forEach(error => {
        console.error(error);
      });
      if (!watching) {
        process.exit(1);
      }
    } else {
      if (stats.hasWarnings() && !argv.quiet) {
        ;(info.warnings || []).forEach(warning => {
          console.warn(warning);
        });
      }
      console.log(`${watching ? '' : _chalk2.default.dim(`[${counter + 1}/${steps}] `)}${randomBuildEmoji()}  Built ${_chalk2.default.blue(file)} in ${_chalk2.default.grey(info.time)}ms`);
      if (!watching) {
        checkEnd();
      }
    }
  };
}

try {
  buildAndWatchPlugin();
} catch (err) {
  console.error(`${_chalk2.default.red('error')} Error while building the plugin`);
  console.error(err);
  process.exit(1);
}