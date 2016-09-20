/*! Smarter Module Boilerplate v0.0.3 | MIT License | Kennedy Rose <kennedy@kennedyrose.com> (https://kennedyrose.com) */ 
;(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory)
	} else if (typeof exports === 'object') {
		module.exports = factory()
	} else {
		root.smarterModuleBoilerplate = factory()
	}
}(this, function() {
	'use strict'

	function smarterModuleBoilerplate() {
		var el = document.createElement('div')
		el.className = 'test'
		el.innerText = 'UMD module ran successfully!'
		document.body.appendChild(el)
	}
	return smarterModuleBoilerplate
}))