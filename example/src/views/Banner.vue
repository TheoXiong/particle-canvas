<template>
  <div class="banner">
    <div class="banner-main">
      <h1 class="banner-title">{{ title }}</h1>
      <h2 class="banner-desc">{{ desc }}</h2>
      <div class="banner-btns">

      </div>
    </div>
    <div class="banner-quickstart"></div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      title: 'particle-canvas',
      desc: 'A lightweight javaScript library for creating particles animation'
    }
  },
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
  background-color: #282b2e;
  /* background: url('../assets/image/banner.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%; */
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