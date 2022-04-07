import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
const external = [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
];

export default [
    // browser-friendly UMD build
    {
        input: 'src/index.ts',
        output: [
            {
                name: pkg.name,
                file: `dist/ng-decorator.min.js`,
                format: 'umd',
                globals: ['angular', 'tslib'],
                plugins: [terser()],
            },
            {
                file: pkg.module,
                format: 'esm',
                globals: ['angular', 'tslib'],
                exports: 'named',
                sourcemap: true,
            },
            {
                file: pkg.main,
                format: 'cjs',
                globals: ['angular', 'tslib'],
                sourcemap: true,
                exports: 'named',
            },
        ],
        external,
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
        ],
    },
];
