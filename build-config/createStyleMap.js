import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';

import { getPostCssConfig } from '../build-config/utils';

/**
 * 创建单独的打包文件，实现样式按包分离
 *
 * @param {*} moduleName 模块名称
 * @param {string} [rootModuleName=''] 根模块名称
 * @param {string} [componentDir='src/components'] 组件文件路径
 * @return {*} 打包配置信息
 */
const createStyleConfig = (moduleName, rootModuleName = 'index.ts', componentDir = 'src/components', isExtract) => {
  return {
    input: moduleName === `${rootModuleName}` ? `${componentDir}/index.ts` : `${componentDir}/${moduleName}/index.tsx`,
    output: {
      file: moduleName === `${rootModuleName}` ? `dist/index.js` : `dist/${moduleName}/index.js`,
      format: 'es', //cjs umd 三种格式输出
    },
    plugins: [
      clear({
        targets: ['dist']
      }),
      babel({
        exclude: 'node_modules/**', // 只编译源代码
        runtimeHelpers: true
      }),
      // 支持json文件
      json(),
      // 支持代码压缩
      terser(),
      // 支持第三方模块
      resolve(),
      // 支持 commonjs 格式
      commonjs(),
      // 支持typescript
      typescript(),
      postcss(Object.assign({
        extensions: ['.less', '.css', '.scss'],
        plugins: [require('autoprefixer')({ overrideBrowserslist: ['> 0.15 % in CN'] })] // 自动添加css前缀
      }, getPostCssConfig(moduleName, isExtract))),
    ],
    // 第三方模块不会强行打包到输出中
    external: (id) => /^(qss|react|antd|@ant-design\/icons|core-js)/.test(id),
  };
}

export default createStyleConfig;