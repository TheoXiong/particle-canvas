/**
 * Created by xz on 18/8/8.
 * Text Vision
 */

import Particle from './particle.js'

const MAX_TEXT_LENGTH = 10
const PARTICLE_NUM = 3200
const GATHER_HOLD_ON_TIME = 60 * 3
const SPREAD_HOLD_ON_TIME = 60 * 2
const SPREAD_TIME_OUT = GATHER_HOLD_ON_TIME + SPREAD_HOLD_ON_TIME + 60 * 2

function isArray (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

function emptyArray (arr) {
    if (isArray(arr)) {
        arr.splice(0, arr.length)
    }
}

function isValidRgbValue (value) {
    if (typeof value === 'number' && value >= 0 && value <= 255) {
        return true
    }
    return false
}

/**
 * VisionText Constructor
 * @param {canvas} canvas object, form Html Dom
 * @param {textColor} text color object, such as {r: 226, g: 225, b: 142}
 * @param {textSize} text size, The recommended value is less than 32. if the text is too big, it may be miss some characters
 * @param {fontFamily} text font family
 * @param {text} text string, require a string which length should be less than 10 characters
 */
class VisionText {
    constructor (canvas, textColor, textSize, fontFamily) {
        this.canvas = canvas || null
        this.cWidth = 0
        this.cHeight = 0
        this.ctx = null
        this.text = ''
        this.textColor = textColor
        this.textSize = textSize || 32
        this.fontFamily = fontFamily.toString()
        this.particles = []
        this.pixels = []
        this.drawEnd = false
        this.spreadOutEnd = false
        this.winFrameId = null
    }
    init () {
        if (this.canvas === null || !this.canvas.getContext) {
            return false
        }

        this.cWidth = this.canvas.width
        this.cHeight = this.canvas.height
        this.ctx = this.canvas.getContext('2d')

        if (!this.textColor || !this.textColor.r || !this.textColor.g || !this.textColor.b) {
            this.textColor = {r: 226, g: 225, b: 142}
        }
        for (var i = 0; i < PARTICLE_NUM; i++) {
            this.particles[i] = new Particle(this.canvas)
            this.particles[i].init(this.getInitOptions())
        }

        this.draw()
        return true
    }
    getInitOptions () {
        var direction = Math.random() > 0.5 ? 1 : -1
        var startRadius = this.cHeight * 0.5
        var centerX = this.cWidth * 0.5
        var centerY = this.cHeight * 0.5
        var startY = Math.random() * this.cHeight
        var startX = centerX + Math.sqrt(startRadius * startRadius - (startY - centerY) * (startY - centerY)) * direction
        return {
            radius: Math.random() * 1.1,
            startX: startX,
            startY: startY,
            endX: centerX + ((Math.random() - 0.5) * this.cWidth * 0.4),
            endY: centerY,
            lastX: startX,
            lastY: startY,
            delta: 0.04 * Math.random() + 0.02,
            opacity: Math.random(),
            fadeInRate: 0.01,
            fadeOutRate: 0.01
        }
    }
    draw () {
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight)
        this.ctx.fillStyle = 'rgb(255, 255, 255)'
        this.ctx.textBaseline = 'middle'
        this.ctx.font = this.textSize + 'px ' + this.fontFamily + ', \'STKaiti\', \'Lucida Handwriting\', \'Arial\''
        var self = this
        var statusCount = 0

        this.winFrameId = window.requestAnimationFrame(function drawStep () {
            self.ctx.clearRect(0, 0, self.cWidth, self.cHeight)
            self.ctx.fillStyle = 'rgb(255, 255, 255)'
            self.ctx.fillText(self.text, (self.cWidth - self.ctx.measureText(self.text).width) * 0.5, self.cHeight * 0.5)
            let imgData = self.ctx.getImageData(0, 0, self.cWidth, self.cHeight)
            self.ctx.clearRect(0, 0, self.cWidth, self.cHeight)

            if (!self.drawEnd) {
                statusCount = 0
                self.gatherParticle(imgData)
            } else {
                if (statusCount > GATHER_HOLD_ON_TIME) {
                    self.spreadOutParticle()
                    if (self.spreadOutEnd) {
                        if (statusCount > (GATHER_HOLD_ON_TIME + SPREAD_HOLD_ON_TIME)) {
                            self.drawEnd = false
                            self.resetParticle()
                        }
                    }
                } else {
                    self.gatherParticle(imgData)
                }
                statusCount++

                if (statusCount > SPREAD_TIME_OUT) {
                    self.drawEnd = false
                    self.resetParticle()
                }
            }

            self.winFrameId = window.requestAnimationFrame(drawStep)
        })
    }
    getPixelCoordinate (imgData) {
        emptyArray(this.pixels)

        for (var x = 0; x < imgData.width; x += 1) {
            for (var y = 0; y < imgData.height; y += 1) {
                var index = 4 * (y * imgData.width + x)
                if (imgData.data[index] > 1) {
                    this.pixels.push([x, y])
                }
            }
        }
    }
    gatherParticle (imgData) {
        this.getPixelCoordinate(imgData)

        var j = parseInt((this.particles.length - this.pixels.length) / 2, 10)
        j = j < 0 ? 0 : j

        for (var i = 0; i < this.pixels.length && j < this.particles.length; i++, j++) {
            try {
                var p = this.particles[j]
                var dX = (this.pixels[i][0]) - p.lastX
                var dY = (this.pixels[i][1]) - p.lastY

                if (Math.abs(dX) > 2 || Math.abs(dY) > 2) {
                    p.curX = p.lastX + dX * p.delta
                    p.curY = p.lastY + dY * p.delta
                    this.drawEnd = false
                } else {
                    p.curX = this.pixels[i][0]
                    p.curY = this.pixels[i][1]
                    this.drawEnd = true
                }

                p.lastX = p.curX
                p.lastY = p.curY
                p.inText = true
                p.fadeIn()
                p.draw(this.ctx, this.textColor)
            } catch (e) {
                console.log(e)
            }
        }
    }
    spreadOutParticle () {
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i]

            if (p.inText) {
                var dX = p.endX - p.lastX
                var dY = p.endY - p.lastY

                p.curX = p.lastX + dX * p.delta / 2
                p.curY = p.lastY + dY * p.delta / 2
                p.lastX = p.curX
                p.lastY = p.curY

                p.fadeOut()
                p.draw(this.ctx, this.textColor)

                if (p.opacity <= 0.03) {
                    this.spreadOutEnd = true
                } else {
                    this.spreadOutEnd = false
                }
            }
        }
    }
    resetParticle () {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].lastX = this.particles[i].startX
            this.particles[i].lastY = this.particles[i].startY
            this.particles[i].inText = false
        }
    }
    showText (text) {
        if (typeof text === 'string' && text.length <= MAX_TEXT_LENGTH) {
            this.text = text
        }
    }
    switchTextColor (textColor) {
        if (textColor &&
            isValidRgbValue(textColor.r) &&
            isValidRgbValue(textColor.g) &&
            isValidRgbValue(textColor.b)) {
            this.textColor = textColor
        }
    }
    stop () {
        if (this.canvas === null || this.ctx === null) {
            return false
        }

        if (this.winFrameId) {
            window.cancelAnimationFrame(this.winFrameId)
            this.winFrameId = null
        }
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight)
        return true
    }
    reStart () {
        if (this.canvas === null || this.ctx === null) {
            return false
        }

        if (this.winFrameId) {
            this.stop()
        }

        this.draw()
        return true
    }
    destroy () {
        if (this.winFrameId) {
            this.stop()
        }
        this.canvas = null
        this.ctx = null
        this.cWidth = 0
        this.cHeight = 0
        this.text = ''
        this.particles = []
        this.pixels = []
    }
}

export default VisionText
