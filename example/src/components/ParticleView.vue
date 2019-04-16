<template>
  <div class="particle-view">
    <div id="canvas-wrap">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { ParticleWords } from '../../../src/index.js'

export default {
  name: 'ParticleView',
  data() {
    return {
    }
  },
  mounted () {
    let wrap = document.getElementById('canvas-wrap')
    let canvas = document.getElementById('canvas')
    canvas.width = wrap.offsetWidth
    canvas.height = wrap.offsetHeight

    let particle = new ParticleWords(canvas, {r: 51, g: 51, b: 51}, 56, 'Lucida Handwriting')
    particle.showText('Particle')
    particle.init()
  }
}
</script>

<style scoped>
.particle-view{
  padding: 20px;
  background: #f8f8ff;
}
#canvas-wrap{
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 600px;
}

</style>