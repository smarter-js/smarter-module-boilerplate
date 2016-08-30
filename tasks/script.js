// Preprocesses JavaScript for development and production
'use strict'
module.exports = function(gulp, config, plugins){

	let onError = {
		errorHandler: function(err) {
			util.log(util.colors.red(err))
			this.emit('end')
			gulp.src('')
				.pipe(notify({message: 'ERROR!!!', onLast: true}))
			
		}
	}


	// Transpile demo JavaScript
	gulp.task('demo:script', function(cb){

		return gulp.src(config.src + '/' + config.demo + '/**/*.js')
			.pipe(plumber(onError))
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
	gulp.task('script', function(){

		let full = gulp.src(config.src + '/' + config.script + '/' + config.fileName + '.js')
			.pipe(plumber(onError))
			//.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(umd())
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(jsbeautifier({
				indent_char: '\t',
				indent_size: 1
			}))
			.pipe(semi.remove({
				leading: true
			}))
			//.pipe(sourcemaps.write('./'))

		let min = gulp.src(config.src + '/' + config.script + '/' + config.fileName + '.js')
			.pipe(plumber(onError))
			.pipe(umd())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(wrapJs(config.info + '\n;%= body %'))
			.pipe(uglify({
				preserveComments:'some'
			}))
			.pipe(stripDebug())
			.pipe(rename(function(path){
				path.basename += '.min'
			}))


		return merge(full, min)
			.pipe(gulp.dest(config.dist))
			.pipe(notify({
				message: 'JavaScript processed',
				onLast: true
			}))
	})




}