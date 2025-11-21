import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'dist/esm',
    transformer: 'babel',
  },
  cjs: {
    output: 'dist/cjs',
    transformer: 'babel',
  },
  // Skip type declarations to avoid the @antv/g type error
  prebundle: {},
});
