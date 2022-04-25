const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
    assets: "assets/",
};

const PAGES_DIR = `${PATHS.src}/html/pages/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter((fileName) => fileName.endsWith(".html"));

module.exports = {
    entry: {
        app: PATHS.src + "/index.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, PATHS.dist),
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.sass$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: "src/js/postcss.config.js",
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: {
                                path: "src/js/postcss.config.js",
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATHS.src + "/assets/img",
                    to: "assets/img",
                },
                {
                    from: PATHS.src + "/assets/fonts",
                    to: "assets/fonts",
                },
            ],
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: PATHS.src + "/html/index.html",
            filename: "index.html",
        }),
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page}`,
                })
        ),
    ],
};