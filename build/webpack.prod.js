const HtmlWebbpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')

module.exports = {
    entry:{
        "bundle":'./src/index.ts'
    },
    mode:"production",
    devtool:"cheap-module-eval-source-map",
    output:{
        path: path.resolve(__dirname,"../dist"),
        filename:'jreap-core.js',
		library: 'jreapCore',
		libraryTarget:'umd'
	},
	externals: ['axios','qs'],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    module:{
        rules:[
			// {
			// 	test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			// 	use:{
			// 		loader: "file-loader",
			// 		options: {
			// 			outputPath: "font/"
			// 		}
			// 	}
			// },
            { 
				test: /\.tsx?$/, 
				loader: "awesome-typescript-loader" 
			},
			{ 
				test: /\.js$/, 
				loader: "source-map-loader" },
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		"css-loader"
			// 	]
			// },{
			// 	test: /\.(sass|scss)$/,
			// 	use: [
			// 		MiniCssExtractPlugin.loader,
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2
			// 			}
			// 		},
			// 		"sass-loader"
			// 	]
			// },
            // {
            //     test: /\.less$/,
            //     use: [
            //         { loader: "style-loader" },
            //         { loader: "css-loader" },
            //         {
            //             loader: "less-loader",
            //             options: {
            //                 lessOptions: {
            //                     javascriptEnabled: true,
            //                 }
            //             }
            //         }
            //     ]
            // },
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
		// new MiniCssExtractPlugin({
		// 	// Options similar to the same options in webpackOptions.output
		// 	// all options are optional
		// 	filename: 'index.css',
		// 	chunkFilename: '[id].css',
		// 	ignoreOrder: false, // Enable to remove warnings about conflicting order
		// }),
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
		],
		usedExports:true
	}
}