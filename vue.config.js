module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://danniao.hanyu.weyoui.cn/index.php/Home',
                secure: false,
                ws: false,
                changeOrigin: true
            }
        }
    }
}
