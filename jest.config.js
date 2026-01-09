module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!(@claspo)/)'
    ],
    globals: {
        'babel-jest': {
            useESM: true,
        },
    },
}; 
