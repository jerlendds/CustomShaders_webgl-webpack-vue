const path = require('path');
const { VueLoaderPlugin } = require('vue-loader') // https://vue-loader.vuejs.org/
const HtmlWebPackPlugin = require('html-webpack-plugin'); // https://webpack.js.org/plugins/html-webpack-plugin/

module.exports = {
    entry: {
        app: './src/main.js',

    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [

            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',

            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            title: 'Hot Module Replacement',
            template: 'public/index.html'
        }),
    ]
}
