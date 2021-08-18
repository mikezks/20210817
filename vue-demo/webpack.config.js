const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = () => ({
    mode: 'development',
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named'
    },
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        publicPath: "auto",
        uniqueName: "vue",
        chunkFilename: '[name].js',
    },
    resolve: {
        extensions: [".vue", ".jsx", ".js", ".json"],
        alias: {
            vue: "@vue/runtime-dom",
        }
    },
    module: {
        rules: [
            {
              test: /\.vue$/,
              use: "vue-loader",
            },
            {
                test: /\.png$/,
                use: {
                  loader: "url-loader",
                  options: { limit: 8192 },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    "css-loader",
                ],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new ModuleFederationPlugin({
            name: "vue",
            library: { type: "var", name: "vue" },
            filename: "remoteEntry.js",
            exposes: {
            './web-components': './src/main.js',
            },
            shared: ["vue", "core-js"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', "index.html"),
            favicon: "./public/favicon.ico",
            title: 'Vue Routing Demo'
        }),
        new VueLoaderPlugin(),
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    }
});
