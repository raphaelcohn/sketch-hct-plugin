import type { TSESTree } from '@typescript-eslint/types';
import { DefinitionBase } from './DefinitionBase';
import { DefinitionType } from './DefinitionType';
declare class CatchClauseDefinition extends DefinitionBase<DefinitionType.CatchClause, TSESTree.CatchClause, null, TSESTree.BindingName> {
    readonly isTypeDefinition = false;
    readonly isVariableDefinition = true;
    constructor(name: TSESTree.BindingName, node: CatchClauseDefinition['node']);
}
export { CatchClauseDefinition };
//# sourceMappingURL=CatchClauseDefinition.d.ts.map