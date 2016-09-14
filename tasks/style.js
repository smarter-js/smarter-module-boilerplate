// Preprocesses Sass for development and production
'use strict'
module.exports = function(gulp, config, plugins){


	// Transpile demo Sass
	gulp.task('demo:style', function(){

		return gulp.src(config.src + '/' + config.demo + '/**/*.{scss,css}')
			.pipe(plumber(config.onError))
			.pipe(sourcemaps.init())
			.pipe(sass({
				indentType: 'tab',
				outputStyle: 'expanded',
				indentWidth: 1
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.demo))
			.pipe(plugins.browserSync.stream())
			.pipe(notify({
				message: 'Demo Sass processed',
				onLast: true
			}))

	})

	// Transpile module Sass
	gulp.task('style:build', function(){

		let full = gulp.src(config.src + '/' + config.style + '/main.scss')
			.pipe(plumber(config.onError))
			.pipe(sourcemaps.init())
			.pipe(sass({
				indentType: 'tab',
				outputStyle: 'expanded',
				indentWidth: 1
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(sourcemaps.write('/'))
			.pipe(rename(function(path){
				path.basename = config.package.name
			}))

		let min = gulp.src(config.src + '/' + config.style + '/main.scss')
			.pipe(plumber(config.onError))
			.pipe(sass({
				outputStyle: 'compressed'
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(csso())
			.pipe(rename(function(path){
				path.basename = config.package.name + '.min'
			}))

		return merge(full, min)
			.pipe(gulp.dest(config.dist))
			.pipe(plugins.browserSync.stream())
			.pipe(notify({
				message: 'Library styles processed',
				onLast: true
			}))

	})
	// Prepend info to dist files
	gulp.task('style:info', function(){
		let info = JSON.parse(fs.readFileSync('./package.json'))
		return gulp.src(config.src + '/' + config.style + '/info.scss')
			.pipe(insert.transform(function(contents, file){
				let author
				author = info.author.url ? info.author.url : info.author
				return config.info + '\n'
			}))
			.pipe(gulp.dest(config.src + '/' + config.style))
	})

	gulp.task('style', function(cb){
		runSequence('style:info', ['style:build'], cb)
	})


}