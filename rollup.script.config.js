const path = require('path');
const { transformSync } = require('@babel/core');

const builtInComponents = [
  ['SysTextComponent', 'SysText.manifest.js'],
  ['SysContainerComponent', 'SysContainer.manifest.js'],
  ['SysColumnsComponent', 'SysColumns.manifest.js'],
  ['SysColumnComponent', 'SysColumn.manifest.js'],
  ['SysImageComponent', 'SysImage.manifest.js'],
  ['SysInputComponent', 'SysInput.manifest.js'],
  ['SysButtonComponent', 'SysButton.manifest.js'],
];
const strippedManifestFields = new Set([
  'contextMenuModel',
  'floatingControlsModel',
  'propertyPaneModel',
  'i18nPropertyPaneModel',
  'props',
  'metaDescription',
]);

const input = builtInComponents.reduce((entries, [componentName, manifestFileName]) => {
  entries[`${componentName}/${componentName}`] = `src/${componentName}/${componentName}.js`;
  entries[`${componentName}/${manifestFileName.replace(/\.js$/, '')}`] = `src/${componentName}/${manifestFileName}`;

  return entries;
}, {});

function getObjectPropertyKey(property) {
  if (property.computed) {
    return null;
  }

  if (property.key.type === 'Identifier') {
    return property.key.name;
  }

  if (property.key.type === 'StringLiteral') {
    return property.key.value;
  }

  return null;
}

function stripScriptManifestFields() {
  return {
    name: 'strip-script-manifest-fields',
    transform(code, id) {
      if (!id.endsWith('.manifest.js')) {
        return null;
      }

      const result = transformSync(code, {
        babelrc: false,
        configFile: false,
        comments: false,
        compact: false,
        filename: id,
        plugins: [
          () => ({
            visitor: {
              ExportDefaultDeclaration(exportPath) {
                const declaration = exportPath.get('declaration');

                if (!declaration.isObjectExpression()) {
                  return;
                }

                declaration.node.properties = declaration.node.properties.filter((property) => {
                  if (property.type !== 'ObjectProperty' && property.type !== 'ObjectMethod') {
                    return true;
                  }

                  return !strippedManifestFields.has(getObjectPropertyKey(property));
                });
              },
            },
          }),
        ],
      });

      return {
        code: result.code,
        map: null,
      };
    },
  };
}

module.exports = {
  input,
  output: {
    dir: path.resolve(__dirname, 'out/script'),
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
    chunkFileNames: 'shared/[name]-[hash].js',
    sourcemap: false,
  },
  plugins: [
    stripScriptManifestFields(),
  ],
  external(id) {
    return !id.startsWith('.') && !path.isAbsolute(id);
  },
};
