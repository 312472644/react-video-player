const fs = require('fs');
const path = require('path');

/**
 * 判断组件是否有样式文件
 *
 * @param {string} [componentDir='src/components']
 * @return {*} map数据结构{component:boolean}
 */
const moduleStyleSheet = (componentDir = 'src/components') => {
  const moduleName = fs.readdirSync(path.resolve(componentDir));
  const styleSheet = {};
  moduleName.forEach((item) => {
    try {
      fs.readFileSync(`${componentDir}/${item}/index.scss`);
      styleSheet[item] = true;
    }
    catch {
      styleSheet[item] = false;
    }
  })
  return styleSheet;
};

/**
 * 获取打包样式文件配置信息
 *
 * @param {*} moduleName 模块名称
 * @param {boolean} [isExtract=false] 是否需要将所有css生成一个文件
 * @return {*} 
 */
const getPostCssConfig = (moduleName, isExtract = false) => {
  const postCss = {};
  const styleSheet = moduleStyleSheet();
  if (moduleName === 'index.ts' || moduleName === 'index.tsx') {
    postCss.extract = true;
  } else {
    postCss.inject = !isExtract;
    if (isExtract) {
      postCss.extract = true;
      return postCss;
    }
    // 样式输出到 createModuleConfig 创建的模块文件夹下
    postCss.extract = styleSheet[moduleName] ? `index.css` : false;
  }
  return postCss;
}

export { moduleStyleSheet, getPostCssConfig };