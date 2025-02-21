const HtmlWebbpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

const path = require('path')

module.exports = {
    entry:{
        "bundle":'./src/index.ts'
    },
    mode:"development",
    devtool:"cheap-module-eval-source-map",
    devServer:{
        contentBase: 'dist',
		//open: true,
		proxy:{
			"/api": "http://www.baidu.com"
		},
		port: 8848,//定义端口
		hot: true,
		hotOnly: false,
		historyApiFallback: true,
    },
    
    output:{
        path: path.resolve(__dirname,"../dist"),
		sourceMapFilename: "[name].js.map"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        rules:[
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins:[
		// 打包插件
		new HtmlWebbpackPlugin({
			template:"./src/index.html",
			minify: {
	            removeComments: true,
	            collapseWhitespace: true,
	            removeRedundantAttributes: true,
	            useShortDoctype: true,
	            removeEmptyAttributes: true,
	            removeStyleLinkTypeAttributes: true,
	            keepClosingSlash: true,
	            minifyJS: true,
	            minifyCSS: true,
	            minifyURLs: true,
	        },
	        chunksSortMode:'dependency'
		}),
		//清除dist插件
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
	],
    
    optimization:  {
		splitChunks: {
			chunks: 'all',
		    minSize: 30000,
		    maxSize: 0,
		    minChunks: 1,
		    maxAsyncRequests: 5,
		    maxInitialRequests: 3,
		    automaticNameDelimiter: '~',
		    name: true,
		    cacheGroups: {
		    	vendors: {
		          test: /[\\/]node_modules[\\/]/,
		          priority: -20,
		          filename: "vendors.js",
		          maxSize: 3000000,
		        },
		        default: {
			        minChunks: 2,
			        priority: -20,
			        reuseExistingChunk: true
			    }
		     }
		},
		minimizer: [
			new OptimizeCssAssetsPlugin({}),
		],
		minimizer: [
    		new UglifyJsPlugin({
		        test: /\.js(\?.*)?$/i,
		    })
    	]
	}
}