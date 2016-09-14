// Change project settings
'use strict'
module.exports = function(gulp, config, plugins){


	function processStr(str){
		if(str.indexOf('-') > -1){
			return processName(str)
		}
		if(str.indexOf(' ') > -1){
			return processTitle(str)
		}
		return processCamel(str)
	}
	function processCamel(camel){
		let obj = { camel: camel },
			upperReg = /([A-Z])/g

		obj.name = obj.camel.replace(upperReg, '-$1').toLowerCase()

		obj.title = obj.camel.replace(upperReg, ' $1')
		obj.title = obj.title.charAt(0).toUpperCase() + obj.title.slice(1)

		return obj
	}
	function processName(name){
		let obj = { name: name },
			i

		let arr = obj.name.split('-')
		for(i = arr.length; i--;){
			arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
		}

		obj.title = arr.join(' ')
		obj.camel = arr.join('')
		obj.camel = obj.camel.charAt(0).toLowerCase() + obj.camel.slice(1)


		return obj
	}
	function processTitle(title){
		let obj = { title: title },
			regSpace = / /g

		obj.name = obj.title.replace(regSpace, '-').toLowerCase()

		obj.camel = obj.title.replace(regSpace, '')
		obj.camel = obj.camel.charAt(0).toLowerCase() + obj.camel.slice(1)


		return obj
	}


	function camelize(name){
		let camel = name.split('-')
		for(let i = 1; i < camel.length; i++){
			camel[i] = camel[i].charAt(0).toUpperCase() + camel[i].slice(1)
		}
		return camel.join('')
	}

	function rename(obj){

		obj = processStr(obj)

		let oldCamel = new RegExp(camelize(config.package.name), 'g'),
			oldTitle = new RegExp(config.package.title, 'g')


		let json = gulp.src([
				'./package.json',
				'./bower.json'
			])
			.pipe(jsonEditor(function(json){
				json.name = obj.name
				json.title = obj.title
				return json
			}))
			.pipe(gulp.dest('./'))


		let script = gulp.src(config.src + '/' + config.script + '/main.js')
			.pipe(replace(oldCamel, obj.camel))
			.pipe(gulp.dest(config.src + '/' + config.script))

		let pug = gulp.src(config.src + '/' + config.demo + '/**/*.pug')
			.pipe(replace(oldTitle, obj.title))
			.pipe(gulp.dest(config.src + '/' + config.demo))

		let demoScript = gulp.src(config.src + '/' + config.demo + '/**/*.js')
			.pipe(replace(oldCamel, obj.camel))
			.pipe(gulp.dest(config.src + '/' + config.demo))

		return merge(json, script, pug)
	}


	// Change name of project
	gulp.task('name', function(){
		return rename(process.argv[process.argv.length - 1])
	})
	gulp.task('rename', ['name'])

	gulp.task('selfname', function(){
		let name = __dirname.split('/')
		name = name[name.length - 2]
		return rename(name)
	})



	// Removes readme
	gulp.task('clean:readme', function(){
		return gulp.src('README.md')
			.pipe(vinylPaths(del))
	})



	// Change description of project
	gulp.task('description', function(){
		let desc = process.argv[process.argv.length - 1]
		return gulp.src([
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