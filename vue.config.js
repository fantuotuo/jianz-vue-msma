module.exports={
	publicPath:process.env.NODE_ENV === 'production'? './': '/',
	assetsDir:"static_vue",
	chainWebpack: config => {
		config.plugin('html')
			.tap(args => {
				args[0].title= '摩斯密码';
				return args;
			})
	}
}