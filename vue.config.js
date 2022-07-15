// vue.config.js配置

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 9275,
    // 跨域
    proxy: {
      '/phoenix/web/v2/rank': {
        target: 'https://blog.csdn.net/phoenix/web/v2/rank',
        bypass:function(req){
          req.headers.referer = 'https://blog.csdn.net'
          req.headers.host = 'blog.csdn.net'    
        },
        pathRewrite:{
          '^/phoenix/web/v2/rank':''
        },
        changeOrigin: true
      },
      '/cgi-bin/musics.fcg': {
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        bypass:function(req){
          req.headers.referer = 'https://u.y.qq.com/'
          req.headers.host = 'u.y.qq.com'    
        },
        pathRewrite:{
          '^/cgi-bin/musics.fcg':''
        },
        changeOrigin: true
      },
      '/downloads/point': {
        target: 'https://api.npmjs.org/downloads/point',
        bypass:function(req){
          req.headers.referer = 'https://api.npmjs.org'
          req.headers.host = 'api.npmjs.org'    
        },
        pathRewrite:{
          '^/downloads/point':''
        },
        changeOrigin: true
      },
      '/downloads/range': {
        target: 'https://api.npmjs.org/downloads/range',
        bypass:function(req){
          req.headers.referer = 'https://api.npmjs.org'
          req.headers.host = 'api.npmjs.org'    
        },
        pathRewrite:{
          '^/downloads/range':''
        },
        changeOrigin: true
      },
      '/versions': {
        target: 'https://api.npmjs.org/versions',
        bypass:function(req){
          req.headers.referer = 'https://api.npmjs.org'
          req.headers.host = 'api.npmjs.org'    
        },
        pathRewrite:{
          '^/versions':''
        },
        changeOrigin: true
      }
    }
  }
}