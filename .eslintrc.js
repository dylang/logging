// Our rules are based on the defaults provided by XO
// https://github.com/sindresorhus/xo
module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    globals: {
        window: true,
        document: true
    },
    parserOptions: {
        'ecmaVersion': 2017
    },
    plugins: [
        // https://github.com/dustinspecker/eslint-plugin-no-use-extend-native
        'no-use-extend-native',
        // https://github.com/avajs/eslint-plugin-ava
        'unicorn',
        // https://www.npmjs.com/package/eslint-plugin-promise
        'promise',
        // https://www.npmjs.com/package/eslint-config-import
        'import'
    ],
    extends: [
        'xo/esnext',
        'plugin:unicorn/recommended'
    ],
    rules: {
        // we've transitioned from tabs to four spaces
        'no-tabs': ['error'],
        'indent': ['error', 4],
        // use import, not require
        'import/no-commonjs': 'error',
        // Allow for: "ComponentName.test.js" instead of "component-name.test.js"
        'unicorn/filename-case': 0,
        // Enables using eslint-disable at the top of a file to ignore the whole file.
        // useful for development and quick prototypes.
        'unicorn/no-abusive-eslint-disable': 0,
        // Allow for todo comments
        'no-warning-comments': 0,
        // readability: { spacing } and [ spacing ].
        'object-curly-spacing': ['error', 'always'],
        // readability: [[ 1, 2 ], 2, [ 3, 4 ]]
        'array-bracket-spacing': ['error', 'always', { 'arraysInArrays': false }],
        // Good: (x) => { ... }, Bad: x => { ... }
        'arrow-parens': ['error', 'always'],
        // multi-line ternary ? and : operator at beginning of the line
        'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
        // Allow debugger statements
        'no-debugger': 'warn',
        // Sort imports, absolute first then relative
        'import/order': ['warn']
    }
};
