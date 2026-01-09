module.exports = {
  rules: {
    'arrow-methods': {
      create(context) {
        return {
          ClassDeclaration(node) {
            // Check if the class extends WcElement or HTMLElement
            const extendsWcElementOrHTMLElement = node.superClass
              && ['WcElement', 'WcControlledElement', 'HTMLElement'].includes(node.superClass.name);
            const excludedMethodNames = ['connectedCallback', 'disconnectedCallback'];
            const forbiddenFunctionTypes = ['method', 'get', 'set'];

            // If the class extends WcElement or HTMLElement, check its methods
            if (extendsWcElementOrHTMLElement) {
              node.body.body.forEach((classNode) => {
                if (classNode.type === 'MethodDefinition') {
                  // Check if the method is a regular (non-static) method, getter, or setter
                  if (
                    forbiddenFunctionTypes.includes(classNode.kind) &&
                    !classNode.static &&
                    classNode.key.name &&
                    !excludedMethodNames.includes(classNode.key.name) &&
                    classNode.value.type !== 'ArrowFunctionExpression'
                  ) {
                    context.report({
                      node: classNode,
                      message:
                        `Non-static class methods, getters, and setters should be arrow functions in order to work in Firefox, excluding ${excludedMethodNames.join(', ')}`,
                    });
                  }
                }
              });
            }
          },
        };
      },
    },
  },
};
