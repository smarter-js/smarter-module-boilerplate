// Controls file watching & live reload
'use strict'
module.exports = function(gulp, config, plugins){

	// Watches files for changes
	gulp.task('watch', function(){
		
		// Source files
		gulp.watch(config.src + '/' + config.style +  '/**/*.scss', ['style'])
		gulp.watch(config.src + '/' + config.script + '/**/*.js', ['script'])

		// Demo files
		gulp.watch(config.src + '/' + config.demo + '/**/*.pug', ['demo:html'])
		gulp.watch(config.src + '/' + config.demo + '/**/*.js', ['demo:script'])
		gulp.watch(config.src + '/' + config.demo + '/**/*.scss', ['demo:style'])


		// Reload browser
		gulp.watch([
			config.dist + '/**/*.js',
			config.demo + '/**/*.{html,js}'
		], plugins.browserSync.reload)

	})



	// Watch and browser sync tasks
	gulp.task('default', ['sync', 'watch'])



}