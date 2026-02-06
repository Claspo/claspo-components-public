const path = require('path');
const fs = require('node:fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const directoryPath = './src';
const distFolder = 'out';
const assetsFolder = 'assets';
const isDevMode = process.env.dev && process.env.dev === '1';

function componentFolderName(name) {
    return name.includes('Component') ? name : name + 'Component';
}

let componentNames = [];
let filesNames = [];
const files = fs.readdirSync(directoryPath);
files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
        componentNames.push(file);
    } else {
        filesNames.push(file);
    }
})
console.log('Components in the specified directory: ', componentNames);
console.log('Files in the specified directory: ', filesNames);

let entry = componentNames.reduce((acc, name) => ({
    ...acc,
    [`${(name)}/${name}.js`]: `./${directoryPath}/${(name)}/${(name)}.js`
}), {});

let mergedEntries = filesNames.reduce((acc, name) => ({
    ...acc,
    [`${name}`]: `./${directoryPath}/${name}`
}), entry);

const copyAssets = componentNames.map(componentName => ({
    from: `${directoryPath}/${(componentName)}/${assetsFolder}`,
    to: `${(componentName)}/${assetsFolder}`,
    noErrorOnMissing: true,
}));

const isDev = process.env.dev && process.env.dev === '1';

module.exports = {
    mode: isDev ? 'development' : 'production',
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: !isDev, // Turn off minimization to keep debugger statements
    },
    entry: mergedEntries,
    output: {
        filename: '[name]', // Output bundled file names will be 'app.bundle.js' and 'admin.bundle.js'
        path: path.resolve(__dirname, distFolder),
        module: true,
        library: {
            type: 'module',
        },
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Handle .ts files
                use: 'ts-loader', // Use ts-loader for TypeScript compilation
                exclude: /node_modules/,
            },
            {
                test: /\.js$/, // Handle .js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-class-properties',
                            './babel-plugin-arrow-methods.js',
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: copyAssets
        }),
        // for each component adds class assignment to window
        new class {
            apply(compiler) {
                compiler.hooks.compilation.tap('CustomFooterPlugin', (compilation) => {
                    compilation.hooks.processAssets.tap(
                        {
                            name: 'CustomFooterPlugin',
                            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
                        },
                        (assets) => {


                            for (const name of componentNames) {
                                const assetName = `${componentFolderName(name)}/${name}.js`;

                                if (assets[assetName]) {
                                    const source = assets[assetName].source();
                                    const className = isDevMode ? '__webpack_exports__.default' : `${componentFolderName(name)}`;

                                    assets[assetName] = new webpack.sources.RawSource(
                                        source + `\nwindow.clComponentClass_${componentFolderName(name)} = ${className};`
                                    );
                                }
                            }
                        }
                    );
                });
            }
        }
    ],
}; 