// Preprocesses Pug for development and production
'use strict'
module.exports = function(gulp, config, plugins){


	// Clear demo folder
	gulp.task('demo:clean', function(){
		return gulp.src(config.demo)
			.pipe(vinylPaths(del))
	})

	// Transpile Pug
	gulp.task('demo:html', function(){

		let sources = gulp.src([
			'dist/**/*.{js,css}',
			'!dist/**/*.min.{js,css}',
			'demo/script.js',
			'demo/style.css'
		])

		return gulp.src([
				config.src + '/' + config.demo + '/**/*.pug',
				'!' + config.src + '/' + config.demo + '/**/_*.pug',
			])
			.pipe(plumber(config.onError))
			.pipe(pug({
				pretty: '\t'
			}))
			.pipe(inject(sources, {
				addPrefix: '..',
				addRootSlash: false
			}))
			.pipe(gulp.dest(config.demo))
			.pipe(notify({
				message: 'Demo Pug processed',
				onLast: true
			}))

	})


	// Copy in bower files
	gulp.task('demo:bower', function(){
		return gulp.src(mainBowerFiles())
			.pipe(gulp.dest(config.demo))
	})

	// Build complete demo folder
	gulp.task('demo:build', function(){
		return runSequence(['demo:script', 'demo:style', 'demo:bower'], 'demo:html')
	})

	// Clean, then build complete demo folder
	gulp.task('demo', function(){
		return runSequence('demo:clean', ['demo:build'])
	})


}