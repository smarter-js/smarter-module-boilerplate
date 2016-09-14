// Git functions
'use strict'
module.exports = function(gulp, config, plugins){


	gulp.task('git:init', function(){
		return gulp.src('')
			.pipe(shell('git remote add origin ' + require('./package.json').repository.url, {
				verbose: true,
			}))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Initial commit"', {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master', {
				verbose: true,
			}))
	})



	gulp.task('git:commit', function(){
		let msg = process.argv[process.argv.length - 1]
		return gulp.src('')
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "' + msg + '"', {
				verbose: true,
			}))
	})
	gulp.task('commit', ['git:commit'])

	gulp.task('git:push', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump())
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version build/bump"', {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master', {
				verbose: true,
			}))
	})
	gulp.task('push', function(cb){
		runSequence(
			'build',
			['git:push'],
			cb
		)
	})

	gulp.task('git:release', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump({type:'minor'}))
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version bump"', {
				verbose: true,
			}))
			.pipe(shell('git tag v' + require('./package.json').version, {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master --tags', {
				verbose: true,
			}))

	})
	gulp.task('git:majorrelease', function(){
		// Increment version and push
		return gulp.src('./package.json')
			.pipe(bump({type:'major'}))
			.pipe(gulp.dest('./'))
			.pipe(shell('git add -A', {
				verbose: true,
			}))
			.pipe(shell('git commit -m "Version bump"', {
				verbose: true,
			}))
			.pipe(shell('git tag v' + require('./package.json').version, {
				verbose: true,
			}))
			.pipe(shell('git push -u origin master --tags', {
				verbose: true,
			}))

	})

	// Removes .git directory
	gulp.task('git:clean', function(){
		return gulp.src('.git')
			.pipe(vinylPaths(del))
	})



}