module.exports = {
	devServer: {
		overlay: false
	},
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = '데일리 체크인';
			return args;
		});
	}
};
