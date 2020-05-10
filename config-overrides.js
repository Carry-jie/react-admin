// 配置按需打包
// const {
//   override,
//   fixBabelImports
// } = require('customize-cra');


// module.exports = override(
//   // 针对 antd 实现按需打包: 根据 import 来打包(使用 babel-plugin-import)
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css', // 引入那个组件，自动打包这个组件相关的样式
//   }),
// );


// 配置按需打包 和 配置主题
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
   style: true,
  }),
  // 使用 less-loader 对源码中的 less 的变量进行重新定义
 addLessLoader({
   javascriptEnabled: true,
   modifyVars: { '@primary-color': '#1DA57A' },
 }),
);