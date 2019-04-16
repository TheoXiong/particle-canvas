const MAX_PARTICLE_RADIUS = 100

function isValidRgbValue (value) {
    if (typeof value === 'number' && value >= 0 && value <= 255) {
        return true
    }
    return false
}

class Particle {
    constructor () {
        this.radius = 1
        this.startX = 0
        this.startY = 0
        this.endX = 0
        this.endY = 0
        this.curX = 0
        this.curY = 0
        this.lastX = 0
        this.lastY = 0
        this.stepX = 0
        this.stepY = 0
        this.delta = 0.05
        this.opacity = 0
        this.inText = false
        this.fadeInRate = 0.01
        this.fadeOutRate = 0.01
        this.flickerRate = 0.005
        this.opacityMax = 0.98
        this.fadingOut = true
        this.fadingIn = true
        this.color = {r: 160, g: 160, b: 160}
    }
    init (options) {
        if (!(typeof options === 'object' && options !== null)) {
            return false
        }
        if (typeof options.radius === 'number' && options.radius >= 0 && options.radius <= MAX_PARTICLE_RADIUS) {
            this.radius = options.radius
        }
        if (typeof options.startX === 'number' && !isNaN(options.startX)) {
            this.startX = options.startX
        }
        if (typeof options.startY === 'number' && !isNaN(options.startY)) {
            this.startY = options.startY
        }
        if (typeof options.endX === 'number' && !isNaN(options.endX)) {
            this.endX = options.endX
        }
        if (typeof options.endY === 'number' && !isNaN(options.endY)) {
            this.endY = options.endY
        }
        if (typeof options.curX === 'number' && !isNaN(options.curX)) {
            this.curX = options.curX
        }
        if (typeof options.curY === 'number' && !isNaN(options.curY)) {
            this.curY = options.curY
        }
        if (typeof options.lastX === 'number' && !isNaN(options.lastX)) {
            this.lastX = options.lastX
        }
        if (typeof options.lastY === 'number' && !isNaN(options.lastY)) {
            this.lastY = options.lastY
        }
        if (typeof options.stepX === 'number' && !isNaN(options.stepX)) {
            this.stepX = options.stepX
        }
        if (typeof options.stepY === 'number' && !isNaN(options.stepY)) {
            this.stepY = options.stepY
        }
        if (typeof options.delta === 'number' && options.delta > 0 && options.delta < 1) {
            this.delta = options.delta
        }
        if (typeof options.opacity === 'number' && options.opacity >= -0.1 && options.opacity <= 1) {
            this.opacity = options.opacity
        }
        if (typeof options.fadeInRate === 'number' && options.fadeInRate >= 0 && options.fadeInRate <= 1) {
            this.fadeInRate = options.fadeInRate
        }
        if (typeof options.fadeOutRate === 'number' && options.fadeOutRate >= 0 && options.fadeOutRate <= 1) {
            this.fadeOutRate = options.fadeOutRate
        }
        if (typeof options.flickerRate === 'number' && options.flickerRate >= -1 && options.flickerRate <= 1) {
            this.flickerRate = options.flickerRate
        }
        if (options.color &&
            isValidRgbValue(options.color.r) &&
            isValidRgbValue(options.color.g) &&
            isValidRgbValue(options.color.b)) {
            this.color = options.color
        }
    }
    fadeIn () {
        this.fadingIn = !(this.opacity > this.opacityMax)
        if (this.fadingIn) {
            this.opacity += this.fadeInRate
        } else {
            this.opacity = 1
        }
    }
    fadeOut () {
        this.fadingOut = !(this.opacity < 0)
        if (this.fadingOut) {
            this.opacity -= this.fadeOutRate
            if (this.opacity < 0) {
                this.opacity = 0
            }
        } else {
            this.opacity = 0
        }
    }
    flicker () {
        if (this.opacity >= 1) {
            this.flickerRate = -1 * Math.abs(this.flickerRate)
        } else if (this.opacity <= -0.1) {
            this.flickerRate = Math.abs(this.flickerRate)
        }
        this.opacity += this.flickerRate
    }
    draw (ctx, color) {
        var particleColor = color || this.color

        ctx.fillStyle = `rgba(${particleColor.r},${particleColor.g},${particleColor.b},${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.curX, this.curY, this.radius, 0, 2 * Math.PI, true)
        ctx.closePath()
        ctx.fill()
    }
}

export default Particle
