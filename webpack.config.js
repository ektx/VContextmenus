const path = require('path')
const webpack = require('webpack')

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'vcontextmenus.js',
		// 模块名称
		// library: 'vcontextmenus',
		// 输出格式
		// libraryTarget: 'umd',
		// 是否将模块名称作为 AMD 输出的命名空间
		// umdNameDefine: true
	},
	// 包的依懒
	externals: {
		vue: {
			root: 'Vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue'
		}
	},
	resolve: {
		// 自动扩展文件后缀名
		extensions: ['.js', '.vue']
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'autoprefixer-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"'
			}
		})
	]
}