// List all plugin names
'use strict'
module.exports = function(gulp, config, plugins){


	// Displays a list of all plugins	
	gulp.task('plugins', function(cb){
		console.log('\nPLUGINS:')
		let keys = Object.keys(plugins).sort()
			, i
		for(i = 0; i < keys.length; i++){
			console.log(keys[i])
		}
		console.log('')
		cb()
	})

	gulp.task('modules', ['plugins'])

}