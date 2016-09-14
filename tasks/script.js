// Preprocesses JavaScript for development and production
'use strict'
module.exports = function(gulp, config, plugins){


	// Transpile demo JavaScript
	gulp.task('demo:script', function(cb){

		return gulp.src(config.src + '/' + config.demo + '/**/*.js')
			.pipe(plumber(config.onError))
			.pipe(babel({
				presets: ['es2015', 'react'],
				sourceMaps: true,
			}))
			.pipe(semi.remove({
				leading: true
			}))
			.pipe(gulp.dest(config.demo))
			.pipe(notify({
				message: 'Demo JavaScript processed',
				onLast: true
			}))

	})

	// Transpile module JavaScript
	let umdOptions = {
		exports: umdName,
		namespace: umdName
	}
	function umdName(file){
		if(config.package.exportName){
			return config.package.exportName
		}
		else{
			return config.camelName
		}
	}
	gulp.task('script', function(){

		let full = gulp.src(config.src + '/' + config.script + '/main.js')
			.pipe(plumber(config.onError))
			//.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(umd(umdOptions))
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(jsbeautifier({
				indent_char: '\t',
				indent_size: 1
			}))
			.pipe(semi.remove({
				leading: true
			}))
			.pipe(rename(function(path){
				path.basename = config.package.name
			}))
			//.pipe(sourcemaps.write('./'))

		let min = gulp.src(config.src + '/' + config.script + '/main.js')
			.pipe(plumber(config.onError))
			.pipe(umd(umdOptions))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(uglify({
				preserveComments:'some'
			}))
			.pipe(stripDebug())
			.pipe(rename(function(path){
				path.basename = config.package.name + '.min'
			}))


		return merge(full, min)
			.pipe(gulp.dest(config.dist))
			.pipe(notify({
				message: 'JavaScript processed',
				onLast: true
			}))
	})




}