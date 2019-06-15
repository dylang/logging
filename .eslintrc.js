const DISABLED = 0;
const ENABLED = 'error';

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended"],
    plugins: [
        // https://github.com/benmosher/eslint-plugin-import
        'import',
        // https://github.com/facebook/jest/tree/master/packages/eslint-plugin-jest
        'jest',
        'prettier',
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
        '@typescript-eslint'
    ],
    rules: {
        'prettier/prettier': [ ENABLED, {
            parser: 'typescript',
            singleQuote: true,
            tabWidth: 4,
            arrowParens: 'always',
            bracketSpacing: true,
            jsxBracketSameLine: false,
            printWidth: 120,
            semi: true,
            trailingComma: 'none',
            useTabs: false
        } ],
        // handled by prettier
        '@typescript-eslint/indent': DISABLED,
        '@typescript-eslint/explicit-function-return-type': DISABLED,
        '@typescript-eslint/explicit-member-accessibility': [ ENABLED, {
            accessibility: 'explicit',
            overrides: {
                accessors: 'explicit',
                constructors: 'no-public',
                methods: 'explicit',
                properties: 'explicit',
                parameterProperties: 'explicit'
            }
        } ],
        '@typescript-eslint/no-explicit-any': DISABLED
    }
};
