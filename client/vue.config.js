const path = require('path');
const webpack = require('webpack');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    configureWebpack: {
        resolve: {
            alias: {
                '@images': resolve('src/assets/images'),
                '@fonts': resolve('src/assets/fonts')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                mapGetters: ['vuex', 'mapGetters'],
                mapActions: ['vuex', 'mapActions'],
                mapMutations: ['vuex', 'mapMutations'],
                mapState: ['vuex', 'mapState']
            })
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "src/scss/_mixins.scss";'
            }
        }
    }
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:5000'
    //         }
    //     }
    // }
};