import Particle from './core/particle.js'

function clamp(min, max, value) {
  if (value > max) {
    return max
  } else if (value < min) {
    return min
  } else {
    return value
  }
}

const PARTICLE_NUM = 1000

class ParticleStar {
  constructor(canvas = {}, options = {}) {
    this.canvas = canvas
    this.options = options
    this.cWidth = 0
    this.cHeight = 0
    this.ctx = null
    this.particles = []
    this.mousePos = [0, 0]
    this.winFrameId = null
  }
  init () {
    if (!this.canvas.getContext) return false

    this.cWidth = this.canvas.width
    this.cHeight = this.canvas.height
    this.ctx = this.canvas.getContext('2d')

    for (var i = 0; i < PARTICLE_NUM; i++) {
      this.particles[i] = new Particle()
      this.particles[i].init(this.getInitOptions())
    }

    return true
  }
  show () {
    if (this.init()) {
      if (this.options.onmousemove) {
        self = this
        this.canvas.onmousemove = (e) => {
          self.updateMousePos(e.clientX, e.clientY)
          console.log(e, self)
        }
      }

      this.draw()
    } else {
      console.error('[particleStars] init failed.')
      return false
    }
  }
  getInitOptions() {
    var direction = Math.random() > 0.5 ? 1 : -1
    return {
      radius:
      Math.random() > 0.9 ? 1.5 + Math.random() * 0.5 : 0.5 + Math.random() * 0.5,
      curX: Math.random() * this.cWidth,
      curY: Math.random() * this.cHeight,
      lastX: Math.random() * this.cWidth,
      lastY: Math.random() * this.cHeight,
      stepX: Math.random() * 1 - 0.5,
      stepY: Math.random() * 1 - 0.5,
      delta: 0.1,
      opacity: Math.random(),
      flickerRate: direction * (Math.random() * 0.007 + 0.003),
      color: this.options.color
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.cWidth, this.cHeight)
    var self = this

    this.winFrameId = window.requestAnimationFrame(function drawStep() {
      self.ctx.clearRect(0, 0, self.cWidth, self.cHeight)
      self.moveParticle()
      self.winFrameId = window.requestAnimationFrame(drawStep)
    })
  }
  moveParticle() {
    for (var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i]

      var len = this.distanceOfTwoPoint(
        p.lastX,
        p.lastY,
        this.mousePos[0],
        this.mousePos[1]
      )
      var thr = this.cHeight * 0.08
      if (len < thr * 0.95) {
        let tp = this.targetPointOfSpread(p.lastX, p.lastY, thr)
        p.curX = p.lastX + (tp.x - p.lastX) * p.delta
        p.curY = p.lastY + (tp.y - p.lastY) * p.delta
      } else if (len >= thr * 0.8 && len <= thr * 1.5) {
        let tp = this.targetPointOfRotate(p.lastX, p.lastY, thr)
        p.curX = p.lastX + (tp.x - p.lastX) * p.delta
        p.curY = p.lastY + (tp.y - p.lastY) * p.delta
      } else {
        p.curX += p.stepX
        p.curY += p.stepY
      }

      if (p.curX <= 0 || p.curX >= this.cWidth) {
        p.stepX *= -1
        p.curX = clamp(0, this.cWidth, p.curX)
      }
      if (p.curY <= 0 || p.curY >= this.cHeight) {
        p.stepY *= -1
        p.curY = clamp(0, this.cHeight, p.curY)
      }

      p.lastX = p.curX
      p.lastY = p.curY

      p.flicker()
      p.draw(this.ctx)
    }
  }
  distanceOfTwoPoint(x0, y0, x1, y1) {
    return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2))
  }
  targetPointOfSpread(x, y, r) {
    var dx = x - this.mousePos[0]
    var dy = y - this.mousePos[1]
    var A = Math.atan2(dy, dx)
    var targetX = r * Math.cos(A) + this.mousePos[0]
    var targetY = r * Math.sin(A) + this.mousePos[1]
    return {
      x: targetX,
      y: targetY
    }
  }
  targetPointOfRotate(x, y, r) {
    var dx = x - this.mousePos[0]
    var dy = y - this.mousePos[1]
    var A = Math.atan2(dy, dx) - 0.1 * Math.PI
    var targetX = r * Math.cos(A) + this.mousePos[0]
    var targetY = r * Math.sin(A) + this.mousePos[1]
    return {
      x: targetX,
      y: targetY
    }
  }
  updateMousePos(x, y) {
    this.mousePos[0] = x
    this.mousePos[1] = y
  }
  destroy() {
    if (this.canvas === null) {
      return false
    }
    if (this.winFrameId) {
      window.cancelAnimationFrame(this.winFrameId)
      this.winFrameId = null
    }
    this.particles = []
  }
}

export default ParticleStar
