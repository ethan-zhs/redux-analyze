const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (...args) => path.join(__dirname, '..', ...args)

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry: resolve('src/index.js'),
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                include: [resolve('src')]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        // webpack热更新组件
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/index.html'), // 模板路径
            inject: true, // js插入位置
            chunksSortMode: 'none',
            chunks: ['manifest', 'vendor', resolve('src/index.js')],
            hash: true
        })
    ],
    devServer: {
        host: '0.0.0.0',
        contentBase: resolve('dist'),
        port: 7777
    }
}
