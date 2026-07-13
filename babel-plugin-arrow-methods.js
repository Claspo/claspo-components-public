/**
 * Babel plugin that transforms class methods to arrow function class properties.
 *
 * Transforms:
 *   methodName() { ... }
 * Into:
 *   methodName = () => { ... }
 *
 * Excludes:
 *   - constructor
 *   - connectedCallback
 *   - disconnectedCallback
 *   - static methods
 *   - getters and setters
 */
module.exports = function(babel) {
  const { types: t } = babel;

  const EXCLUDED_METHODS = ['constructor', 'connectedCallback', 'disconnectedCallback'];

  return {
    name: 'transform-class-methods-to-arrow-functions',
    visitor: {
      ClassDeclaration(path, state) {
        // Get the filename to check if it's a component file.
        // Babel reports state.filename using the OS-native path separator, so
        // normalize Windows backslashes to forward slashes before matching.
        // Without this the regex below never matches on Windows and no methods
        // get transformed to arrow functions (breaking `this` in event listeners).
        const filename = (state.filename || '').replace(/\\/g, '/');

        // Only process component files (files in src directory with matching class name)
        const filenameMatch = filename.match(/src\/([^/]+)\/\1\.js$/);
        if (!filenameMatch) {
          return;
        }

        const className = path.node.id?.name;
        const expectedClassName = filenameMatch[1];

        // Only transform the main component class (class name matches file name)
        if (className !== expectedClassName) {
          return;
        }

        path.traverse({
          ClassMethod(methodPath) {
            const methodName = methodPath.node.key.name;

            // Skip excluded methods
            if (EXCLUDED_METHODS.includes(methodName)) {
              return;
            }

            // Skip static methods
            if (methodPath.node.static) {
              return;
            }

            // Skip getters and setters (they cannot be arrow functions)
            if (methodPath.node.kind === 'get' || methodPath.node.kind === 'set') {
              return;
            }

            // Skip computed property names
            if (methodPath.node.computed) {
              return;
            }

            // Create arrow function expression
            const arrowFunction = t.arrowFunctionExpression(
              methodPath.node.params,
              methodPath.node.body,
              methodPath.node.async
            );

            // Create class property with arrow function
            const classProperty = t.classProperty(
              t.identifier(methodName),
              arrowFunction
            );

            // Replace the method with the class property
            methodPath.replaceWith(classProperty);
          }
        });
      }
    }
  };
};