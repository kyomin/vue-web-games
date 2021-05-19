const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    // import 시에 확장자 생략할 수 있게 된다.
    resolve: {
        extensions: ['.js', '.vue']
    },
    // 이 부분을 시작 지점으로 정해 처리하기 시작한다.
    entry: {
        app: './main.js'
    },
    // 웹팩은 기본적으로 js 파일들을 묶는다.
    // 하지만, 타입스크립트 등 다른 확장자를 해석하기 위한 기준을 아래에서 마련해야 한다.
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]
    },
    // 플러그인은 필수는 아니지만, 추가적 작업을 위한 것이다.
    plugins: [
        new VueLoaderPlugin()
    ],
    // 웹팩이 번들한 최종 결과물이 나온다.
    // 이를 html에서 script에 명시만 하면 여러 js 파일들을 로드할 수 있는 효과를 얻게 된다.
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist')
    }
};