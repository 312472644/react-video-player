/** 代码分割，每个组件都生成一个对应的文件 */
const fs = require('fs');
const path = require('path');
const componentDir = 'src/components';
const moduleName = fs.readdirSync(path.resolve(componentDir));
const moduleMap = moduleName.reduce((prev, name) => {
  prev[name] = name === 'index.ts' ? `${componentDir}/${name}` : `${componentDir}/${name}/index.tsx`;
  return prev;
}, {});

console.log('打包模块名称', moduleMap);
export default moduleMap;