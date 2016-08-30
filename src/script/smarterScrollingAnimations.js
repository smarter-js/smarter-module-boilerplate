
/*
// USAGE:
let anim = new ScrollAnimations(1000)

// or
let anim = new ScrollAnimations({
	
})


// TODO:
- Proper tests

*/


// Prototype/settings
let proto = {

	// Target X and Y
	x: false,
	y: false,
	startingX: false,
	startingY: false,

	// Animation duration
	duration: 1000,

	// Animation easing function
	easing: 'easeOutCubic',

	// Target element
	element: false,

	// Starting progress, goes from 0 to this.duration
	progress: 0,
	delta: 0,
	start: false,

	// Tick every frame
	tick: function(timestamp){

		// Find progress
		if(this.start === false){
			this.start = timestamp
		}
		else{
			this.progress = timestamp - this.start
			this.delta = this.easingFunctions[this.easing](this.progress / this.duration)
		}

		// Tween current numbers
		if(this.x !== false){
			this.curX = this.startingX + (this.delta * this.xDifference)
		}
		if(this.y !== false){
			this.curY = this.startingY + (this.delta * this.yDifference)
		}

		// Render
		if(this.element === false) this.moveDocument()
		else this.moveElement()

		// Wait for next frame
		if(this.progress < this.duration){
			requestAnimationFrame(this.tick.bind(this))
		}
		else if(this.onComplete){
			this.onComplete()
		}
	},

	// Scroll document
	moveDocument: function(){
		if(this.y !== false){
			document.documentElement.scrollTop = this.curY
			document.body.parentNode.scrollTop = this.curY
			document.body.scrollTop = this.curY
		}
		if(this.x !== false){
			document.documentElement.scrollLeft = this.curX
			document.body.parentNode.scrollLeft = this.curX
			document.body.scrollLeft = this.curX
		}
	},
	// Scroll element
	moveElement: function(){
		if(this.y !== false) this.element.scrollTop = this.curY
		if(this.x !== false) this.element.scrollLeft = this.curX
	},

	easingFunctions: {
		linear: function(t){ return t },

		easeInQuad: function(t){ return t*t },
		easeOutQuad: function(t){ return t*(2-t) },
		easeInOutQuad: function(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t },

		easeInCubic: function(t){ return t*t*t },
		easeOutCubic: function(t){ return (--t)*t*t+1 },
		easeInOutCubic: function(t){ return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

		easeInQuart: function(t){ return t*t*t*t },
		easeOutQuart: function(t){ return 1-(--t)*t*t*t },
		easeInOutQuart: function(t){ return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

		easeInQuint: function(t){ return t*t*t*t*t },
		easeOutQuint: function(t){ return 1+(--t)*t*t*t*t },
		easeInOutQuint: function(t){ return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}
}


// Constructor function
function ScrollAnimations(settings){
	if(typeof settings === 'number'){
		this.y = settings
	}
	else{
		let i
		for(i in settings){
			this[i] = settings[i]
		}
	}

	// If requestAnimationFrame is not properly supported, just skip to destination
	if(!('requestAnimationFrame' in window)){
		this.curX = this.x
		this.curY = this.y
		if(this.element === false){
			this.moveDocument()
		}
		else{
			this.moveElement()
		}
		return this
	}

	// Get starting position
	if(this.element === false){
		if(this.x && this.startingX === false){
			this.startingX = document.documentElement.scrollLeft
				|| document.body.parentNode.scrollLeft
				|| document.body.scrollLeft
		}
		if(this.y && this.startingY === false){
			this.startingY = document.documentElement.scrollTop
				|| document.body.parentNode.scrollTop
				|| document.body.scrollTop
		}
	}
	else{
		if(this.x && this.startingX === false){
			this.startingX = this.element.scrollLeft
		}
		if(this.y && this.startingY === false){
			this.startingY = this.element.scrollTop
		}
	}

	// Find difference
	if(this.x){
		this.xDifference = this.x - this.startingX
	}
	if(this.y){
		this.yDifference = this.y - this.startingY
	}

	// Start animating
	requestAnimationFrame(this.tick.bind(this))

	return this
}
ScrollAnimations.prototype = proto






