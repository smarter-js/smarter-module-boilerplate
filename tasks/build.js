// Builds from src to dist or from dist to build
'use strict'
module.exports = function(gulp, config, plugins){


	// Clears, then builds dist folder
	gulp.task('dist', function(cb){
		runSequence(
			'undist',
			['style', 'script'],
			cb
		)
	})


	// Clears, then builds dist and demo folder
	gulp.task('build', function(cb){
		runSequence('dist', ['demo'], cb)
	})


	// Clear dist folder
	gulp.task('undist', function(){
		return gulp.src(config.dist)
			.pipe(vinylPaths(del))
	})



}