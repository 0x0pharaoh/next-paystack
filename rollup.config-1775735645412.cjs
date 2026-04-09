'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('rollup-plugin-typescript2');
var commonjs = require('@rollup/plugin-commonjs');
var external = require('rollup-plugin-peer-deps-external');
var resolve = require('@rollup/plugin-node-resolve');
var pkg = require('./package.json');

//import * as react from 'react';
//import * as reactDom from 'react-dom';

var rollup_config = {
  input: 'libs/index.ts',
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
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
  ],
};

exports.default = rollup_config;
