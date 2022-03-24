import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import sizes from '@atomico/rollup-plugin-sizes';
import banner from 'bannerjs';
import pkg from './package.json';

export default [
  {
    input: 'src/main.js',
    output: [
      {
        file: 'dist/notify.common.js',
        format: 'cjs',
        name: 'Notify',
        exports: 'auto',
        banner: banner.multibanner(),
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'Notify',
        banner: banner.multibanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      sizes(),
    ],
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        // format: 'iife',
        name: 'Notify',
        banner: banner.multibanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      sizes(),
    ],
  },
  {
    input: 'src/main.js',
    output: [
      {
        file: pkg.unpkg.replace(/.js$/, '.min.js'),
        format: 'umd',
        // format: 'iife',
        name: 'Notify',
        banner: banner.onebanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      terser({}),
      commonjs(),
      sizes(),
    ],
  },
];
