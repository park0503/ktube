const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/"

module.exports = {
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        recorder: BASE_JS + "recorder.js",
        commentSection: BASE_JS + "commentSection.js"
    },
    mode: 'development',
    watch: true,
    output: {
        filename: "js/[name].js",
        //path는 무조건 절대경로
        path: path.resolve(__dirname, "assets"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    }
                }
            },
            {
                test: /\.scss$/,
                //loader들을 합칠 땐 역순으로 합친다. 역순으로 실행되기 때문.
                //sass-loader: sass파일을 css로 변환
                //css-loader: css파일을 js에 import 해 줌.
                //style-loader: import된 컴파일된 css를 실제 적용하게 해 줌. 실제 head에 style로 적용시켜 줌.
                //MiniCssExtractPlugin: import된 컴파일된 css를 독립된 css파일로 분리해 줌.
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
};