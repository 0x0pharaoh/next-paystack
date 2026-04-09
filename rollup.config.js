const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const {nodeResolve} = require('@rollup/plugin-node-resolve');
const pkg = require('./package.json');

module.exports = {
  input: 'libs/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner: '"use client";',
      inlineDynamicImports: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
      banner: '"use client";',
      inlineDynamicImports: true,
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
