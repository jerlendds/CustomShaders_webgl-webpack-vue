const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebPackPlugin = require('html-webpack-plugin'); // https://webpack.js.org/plugins/html-webpack-plugin/
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
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
            // ... other rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify',
                exclude: [nodeModulesPath],
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


// module.exports = {
//     entry: {
//         app: mainPath,

//     },
//     mode: 'development',
//     devtool: 'inline-source-map',
//     devServer: {
//         contentBase: './dist',
//         hot: true,
//     },
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         clean: true,
//     },
//     module: {
//         rules: [
//             // ... other rules

//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader'
//             },
//             {
//                 test: /\.(glsl|frag|vert)$/,
//                 loader: 'raw!glslify',
//                 exclude: [nodeModulesPath],
//             },
//         ]
//     },
//     plugins: [
//         // make sure to include the plugin!
//         new VueLoaderPlugin(),
//         new HtmlWebPackPlugin({
//             title: 'Hot Module Replacement',
//             template: 'public/index.html'
//         }),
//         new Webpack.HotModuleReplacementPlugin()
//     ]
// }
