import dts from 'rollup-plugin-dts'; // 打包声明文件

/** 获取声明文件配置 */
const getDeclareConfig = (moduleMap) => {
  const configList = [];
  const moduleMapList = Object.keys(moduleMap);
  moduleMapList.map(moduleName => {
    configList.push({
      input: moduleName === 'index.ts' ? 'src/components/index.d.ts' : `src/components/${moduleName}/index.d.ts`,
      output: [{ file: moduleName === 'index.ts' ? 'dist/index.d.ts' : `dist/${moduleName}/index.d.ts`, format: 'es' }],
      plugins: [dts()],
    });
  })
  if (moduleMapList.length > 1) {
    configList.shift();
  }
  return configList;
}

export { getDeclareConfig };