// Preprocesses Pug for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	// Error handling
	let onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			notifier({
				message: 'ERROR!!!',
				onLast: true
			})
		}
	}


	// Clear demo folder
	gulp.task('demo:clean', function(){
		return gulp.src(config.demo)
			.pipe(vinylPaths(del))
	})

	// Transpile Pug
	gulp.task('demo:html', function(){

		return gulp.src([
				config.src + '/' + config.demo + '/**/*.pug',
				'!' + config.src + '/' + config.demo + '/**/_*.pug',
			])
			.pipe(plumber(onError))
			.pipe(pug({
				pretty: '\t'
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
	gulp.task('demo:build', ['demo:script', 'demo:style', 'demo:html', 'demo:bower'])

	// Clean, then build complete demo folder
	gulp.task('demo', function(){
		return runSequence('demo:clean', ['demo:build'])
	})


}