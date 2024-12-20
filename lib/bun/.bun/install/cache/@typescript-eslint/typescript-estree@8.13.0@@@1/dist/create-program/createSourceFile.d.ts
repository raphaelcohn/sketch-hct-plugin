import * as ts from 'typescript';
import type { ParseSettings } from '../parseSettings';
import type { ASTAndNoProgram } from './shared';
declare function createSourceFile(parseSettings: ParseSettings): ts.SourceFile;
declare function createNoProgram(parseSettings: ParseSettings): ASTAndNoProgram;
export { createNoProgram, createSourceFile };
//# sourceMappingURL=createSourceFile.d.ts.map