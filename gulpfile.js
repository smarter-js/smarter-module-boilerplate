// Load options
let _config = require('./config.js'),
	config = {},
	i
for(i in _config){
	config[i] = _config[i]
}

// Load plugins
const gulp = require('gulp')
	, gulpLoadPlugins = require('gulp-load-plugins')
	, plugins = gulpLoadPlugins({
		pattern: ['*']
	})

plugins.fs = require('fs')
plugins.opn = require('opn')
plugins.camelCase = require('camelcase')
plugins.babelify = require('babelify')
plugins.childProcess = require('child_process')
plugins.gulpif = plugins.if
plugins.merge = require('event-stream').merge
plugins.glob = require('glob-all')
plugins.debowerify = require('debowerify')
plugins.browserSync = require('browser-sync').create()
plugins.runSequence = require('run-sequence')
plugins.del = require('del')
plugins.vinylPaths = require('vinyl-paths')
plugins.source = require('vinyl-source-stream')
plugins.buffer = require('vinyl-buffer')
plugins.notifier = require('node-notify')
for(i in plugins){
	global[i] = plugins[i]
}

// Get camelcase version of name
config.camelName = camelCase(config.package.name)

config.onError = {
	errorHandler: function(err) {
		util.log(util.colors.red(err))
		this.emit('end')
		gulp.src('')
			.pipe(notify({message: 'ERROR!!!', onLast: true}))
		
	}
}

// Load tasks
let files = glob.sync('./tasks/*.js')
for(i = 0; i < files.length; i++){
	require(files[i])(gulp, config, plugins)
}

// Test for errors
gulp.task('test', function(cb){
	cb()
})















