const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const pkg = require('./package.json');

module.exports = {
  input: 'libs/index.ts',
  external: ['@paystack/inline-js'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner: '"use client";',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      banner: '"use client";',
    },
  ],
  plugins: [
    external(),
    typescript({tsconfig: './tsconfig.rollup.json'}),
    nodeResolve({
      extensions: ['.mjs', '.js', '.jsx', '.json', '.node', '.ts', '.tsx'],
    }),
    commonjs(),
  ],
};
