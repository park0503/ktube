const path = require("path");

module.exports = {
    entry: "./src/client/js/main.js",
    mode: 'development',
    output: {
        filename: "main.js",
        //path는 무조건 절대경로
        path: path.resolve(__dirname, "assets", "js"),
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
                //css-loader: css파일을 js에 가져올 수 있게(import) -> js가 웹사이트에 컴파일된 css를 입력하게 해 줌.
                //style-loader: 웹사이트에 입력된 컴파일된 css를 실제 적용하게 해 줌. 실제 head에 style로 적용시켜줌.
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
};