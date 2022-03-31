import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs'; // commonjs模块转换插件
import eslint from '@rollup/plugin-eslint'; // eslint插件
import alias from '@rollup/plugin-alias';
import packageJSON from './package.json';

const getPath = _path => path.resolve(__dirname, _path);
// alias
const aliasPlugin = alias({
  entries: [
    { find: '@', replacement: getPath('./src') }
  ]
})
// eslint
const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**', 'lib/**']
})
// ts
const tsPlugin = typescript({
  tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
})

export default {
  input: getPath("./src/index.ts"),
  output: [
    {
      name: packageJSON.name,
      format: "umd", // node模块
      file: packageJSON.main
    },
    {
      name: packageJSON.name,
      format: "es", // es6模块
      file: packageJSON.module
    }
  ],
  plugins: [
    aliasPlugin,
    commonjs(),
    esPlugin,
    tsPlugin
  ]
}
