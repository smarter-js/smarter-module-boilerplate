// Change project settings
'use strict'
module.exports = function(gulp, config, plugins){
	let boilerplateRepo = 'https://github.com/smarter-js/smarter-module-boilerplate.git',
		shellOpt = {
			verbose: true
		}




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





	// Update to latest boilerplate
	// Clone boilerplate to temp directory
	gulp.task('update:boilerplate', function(){
		return gulp.src('')
			.pipe(shell('git clone "' + boilerplateRepo + '" temp', shellOpt))
	})
	// Clean dependencies and task files
	gulp.task('update:preclean', function(){
		return gulp.src([
				'node_modules',
				'bower_components',
				'tasks'
			])
			.pipe(vinylPaths(del))
	})
	// Copy over relevent files
	gulp.task('update:copy', function(){
		return gulp.src([
				'temp/**/*',
				'!temp/.git',
				'!temp/src',
				'!temp/dist',
				'!temp/demo',
				'!temp/README.md',
				'!temp/build'
			])
			.pipe(gulp.dest('./'))
	})
	// Delete temp boilerplate directory
	gulp.task('update:postclean', function(){
		return gulp.src([
				'temp'
			])
			.pipe(vinylPaths(del))
	})
	// Update settings with project info
	gulp.task('update:settings', function(){
		return gulp.src([
				'./package.json',
				'./bower.json'
			])
			.pipe(jsonEditor(function(json){
				json.name = config.package.name
				json.title = config.package.title
				json.description = config.package.description
				return json
			}))
			.pipe(gulp.dest('./'))
	})
	// Install new dependencies
	gulp.task('update:install', function(){
		return gulp.src('')
			.pipe(shell('npm install', shellOpt))
			.pipe(shell('bower install', shellOpt))
	})
	gulp.task('update', function(cb){
		return runSequence(
				['update:boilerplate', 'update:preclean'],
				'update:copy',
				['update:postclean', 'update:settings'],
				'update:install',
				cb
			)
	})



}