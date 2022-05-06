const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: [
        'vuetify',
    ],
    devServer: {
        client: {
            overlay: false,
        },
        proxy: `${process.env.VUE_APP_API_SERVER}`
    },
});
