import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// ESM config
const esmConfig = {
    input: {
        index: 'src/index.js',
        browser: 'src/browser.js',
        logging: 'src/logging.js',
    },
    output: {
        dir: 'lib',
        format: 'esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
    },
    external: ['chalk', 'debug', 'nicely-format'],
    plugins: [nodeResolve()],
};

// CommonJS config
const cjsConfig = {
    input: {
        index: 'src/index.js',
        logging: 'src/logging.js',
    },
    output: {
        dir: 'lib/cjs',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
    },
    external: ['chalk', 'debug', 'nicely-format'],
    plugins: [nodeResolve(), commonjs()],
};

export default [esmConfig, cjsConfig];
