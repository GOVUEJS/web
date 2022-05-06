const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: [
        'vuetify',
    ],
    devServer: {
        client: {
            overlay: false,
        },
        proxy: {
            // url 리소스를 추가해주자
            "/api": {
                target: `${process.env.VUE_APP_API_SERVER}`,
                changeOrigin: true,
                pathRewrite: {'^/api': ''},
            },
        }
    },
});
