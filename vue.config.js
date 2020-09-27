const path = require("path");
// 编译测时速
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 前端服务器发布
  publicPath: "./",

  // 输出目录
  outputDir: "./dist",
  // 静态资源目录
  assetsDir: "static",

  indexPath: "./index.html",
  // 是否在构建生产包时生成 sourceMap 文件
  productionSourceMap: false,
  // 配置 webpack-dev-server 行为
  devServer: {
    // 端口
    port: 8088,
    // 启动时自动默认浏览器打开
    open: true,
    overlay: {
      // 显示warnings
      warnings: true,
      // 显示error
      errors: true,
    },
    // before: require('./mock/mock-server.js')
    // 代理配置
    // proxy: {
    //   "/api": {
    //     target: "", // 后台地址
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/api" // 重写接口
    //     }
    //   }
    // }
  },
  // 简单配置
  configureWebpack: {
    devtool:
      process.env.NODE_ENV === "development"
        ? "cheap-module-eval-source-map"
        : false, //'source-map'
    performance: {
      hints: "warning",
      //入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      //生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith(".js");
      },
    },
    resolve: {
      // 别名
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src"),
      },
    },
  },
  // 简单配置+编译测时速
  // configureWebpack: smp.wrap({
  //   resolve: {
  //     // 别名
  //     alias: {
  //       '@': resolve('src')
  //     }
  //   }
  // }),
  // 链式高级配置
  chainWebpack: (config) => {
    // 分析
    config.when(process.env.use_analyzer === "true", (config) =>
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
    );
    // 分包策略
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config.optimization.splitChunks({
        chunks: "all",
        minSize: 30000, //字节 引入的文件大于30kb才进行分割
        maxSize: 50000, //50kb，尝试将大于50kb的文件拆分成n个50kb的文件 1000 = 1kb
        minChunks: 1, //模块至少使用次数
        maxAsyncRequests: 5, //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
        maxInitialRequests: 3, //首页加载的时候引入的文件最多3个
        automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
        name: true, //缓存组里面的filename生效，覆盖默认命名
        cacheGroups: {
          libs: {
            name: "chunk-libs", //基础类库，比如 vue+vue-router+vuex+axios+全局被共用的，体积不大的第三方库
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", //  按需提取、加载较大的第三方库。模仿chunk-elementUI 创建
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons", //提取给views视图层复用较多的公共组件
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5, //优先级，先打包到哪个组里面，值越大，优先级越高
            reuseExistingChunk: true, ///模块嵌套引入时，判断是否复用已经被打包的模块
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
    // 代码压缩默认 true
    // config.optimization.minimize(false)

    //gizp压缩
    // config.when(process.env.NODE_ENV === "production", config =>
    //   config
    //     .plugin("compression-webpack-plugin")
    //     .use(require("compression-webpack-plugin"), [
    //       {
    //         filename: "[path].gz[query]",
    //         algorithm: "gzip",
    //         test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
    //         threshold: 10240,
    //         minRatio: 0.8
    //       }
    //     ])
    // );
  },
};
