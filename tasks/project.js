// Change project settings
'use strict'
module.exports = function(gulp, config, plugins){




	// Change name of project
	gulp.task('name', function(){
		let title = process.argv[process.argv.length - 1],
			name = title.replace(/ /g, '-').toLowerCase()

		gulp.src([
				'./package.json',
				'./bower.json'
			])
			.pipe(jsonEditor(function(json){
				json.name = name
				json.title = title
				return json
			}))
			.pipe(gulp.dest('./'))
	})

	// Change description of project
	gulp.task('description', function(){
		let desc = process.argv[process.argv.length - 1]
		gulp.src([
				'./package.json',
				'./bower.json'
			])
			.pipe(jsonEditor(function(json){
				json.description = desc
				return json
			}))
			.pipe(gulp.dest('./'))
	})
	gulp.task('desc', ['description'])






}