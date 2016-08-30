!function(){'use strict'

	/*
	new ScrollAnimations({
		y: 1000,
		startingY: 0,
		onComplete: function(){
			console.log('Animation complete')
		}
	})
	*/

	new ScrollAnimations(1000)


	// Initiate Fastclick
	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body)
		}, false)
	}
}()