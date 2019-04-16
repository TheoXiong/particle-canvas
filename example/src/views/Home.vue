<template>
  <div id="home">
    <nav-menu :value="menus" @click="onClick" :over-banner="overBanner"></nav-menu>
    <banner></banner>
    <particle-view></particle-view>
  </div>
</template>

<script>
import NavMenu from '@/views/NavMenu.vue'
import Banner from '@/views/Banner.vue'
import ParticleView from '@/components/ParticleView.vue'

export default {
  name: 'Home',
  data() {
    return {
      overBanner: true,
      menus: [{
        key: '1',
        name: 'Demo1'
      }, {
        key: '2',
        name: 'Demo2'
      }, {
        key: '3',
        name: 'Demo3'
      }]
    }
  },
  methods: {
    onClick (key, name) {
      console.log(`click, key ${key}, name ${name}`)
    }
  },
  components: { NavMenu, Banner, ParticleView }  
}
</script>

<style scoped>


</style>