// List all plugin names
'use strict'
module.exports = function(gulp, config, plugins){


	// Trims out bower, node module, dist, git, and demo folders	
	gulp.task('trim', function(cb){
		return gulp.src([
				config.demo,
				config.dist,
				'node_modules',
				'bower_components',
				'.git'
			])
			.pipe(vinylPaths(del))
	})

}