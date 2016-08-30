'use strict'
let fs = require('fs')

// Config object
let config = {
	// Directories
	src: 'src',
	dist: 'dist',
	build: 'build',
	style: 'style',
	script: 'script',
	demo: 'demo',

	// Target browsers
	browsers: ['last 2 versions'],

	// Package file contents
	package: JSON.parse(fs.readFileSync('./package.json'))
}

// Info banner
let author
author = config.package.author.url ? config.package.author.url : config.package.author
config.info = "/*! " + config.package.title + " v" + config.package.version + " | " + config.package.license + " License | " + author + " */\n"

// Expose
module.exports = config