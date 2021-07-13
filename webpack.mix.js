let mix = require('laravel-mix');

mix.copyDirectory('src/images/**', 'images')
	.sass('src/app.scss', 'dist/')
	.js('src/app.js', 'dist/')
	.browserSync({
		proxy: '8vc-rebuild-animations.test',
		files: ['dist/*', 'index.php'],
	})
	.disableSuccessNotifications();
