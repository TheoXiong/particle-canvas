<template>
  <div class="banner">
    <div class="banner-main">
      <h1 class="banner-title">{{ title }}</h1>
      <h2 class="banner-desc">{{ desc }}</h2>
      <div class="banner-btns flex-c-c">
        <vue-button type="primary" size="medium" @click="toGithub">
          <i class="iconfont icongithub-fill"></i>
          <span>GitHub</span>
        </vue-button>
      </div>
    </div>
    <div class="banner-quickstart"></div>
  </div>
</template>

<script>
import VueButton from '@/components/VueButton.vue'

export default {
  name: 'Banner',
  data() {
    return {
      title: 'particle-canvas',
      desc: 'A lightweight javaScript library for creating particles animation'
    }
  },
  methods: {
    toGithub () {
      window.open('https://github.com/TheoXiong/particle-canvas', '_blank')
    }
  },
  components: { VueButton }
}
</script>

<style scoped>
.banner{
  position: relative;
  top: 0;
  height: 500px;
  width: 100%;
  min-width: 1180px;
  line-height: 1.5;
  /* background-color: #282b2e; */
  background: url('../assets/image/banner.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.banner-main{
  padding-top: 175px;
  color: #fff;
  text-align: center;
}
.banner-title{
  font-size: 44px;
  width: 400px;
  margin: 0 auto;
  text-align: center;
}
.banner-desc{
  font-size: 17px;
  font-weight: 300;
  line-height: 0.7;
}
.banner-btns{
  margin-top: 32px;
}
</style>