// 多文件打包
import moduleMap from './createModuleMap';
import createStyleMap from './createStyleMap';
import { getDeclareConfig } from './getDeclareConfig';

const argv = process.argv;
const mode = argv.pop();

/**
 * 获取rollup配置信息
 *
 * @param {*} moduleName 单独打包组件的名称
 * @return {*} 
 */
const getRollUpConfig = (moduleName) => {
  let config = [];
  if (mode === 'all') {
    // 生成对应的css文件配置信息
    config = Object.keys(moduleMap).map(moduleName => createStyleMap(moduleName));
    config.shift();
    // 添加声明文件配置
    config.push(...getDeclareConfig(moduleMap));
  } else {
    config = [
      createStyleMap(moduleName, 'index.ts', 'src/components', true),
      ...getDeclareConfig({ [moduleName]: `src/components/${moduleName}/index.tsx` })];
  }
  return config;
}

export default getRollUpConfig('video-player');