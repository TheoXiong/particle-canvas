<template>
  <div class="nav-menu flex-c-c" :class="{'is-not-overbanner': !overBanner}">
    <div class="nav-menu-wrap flex-c-b">
      <div class="nav-log flex-c">
        <img :src="logoImg" class="nav-logo-img">
        <span class="nav-logo-text">{{ logoText }}</span>
      </div>
      <div class="nav-content flex-c">
        <div class="nav-content-item"
          v-for="item in value"
          :key="item.key"
          @click="onClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/image/logo.png'

export default {
  name: 'NavMenu',
  data () {
    return {
      logoImg,
      logoText: 'Particle'
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    overBanner: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick (item) {
      this.$emit('click', item.key, item.name)
    }
  }
}
</script>

<style scoped>
.nav-menu{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  transition: all 0.4s ease;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
}
.is-not-overbanner{
  background-color: rgba(36, 40, 54, 0.8);
} 

.nav-menu-wrap{
  height: 100%;
  width: 1180px;
}

.nav-logo-img{
  width: 28px;
  height: 28px;
}
.nav-logo-text{
  margin-left: 14px;
  font-size: 22px;
  color: #fff;
  font-weight: 600;
}
.nav-content-item{
  margin: 0 16px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
}
.nav-content-item:hover{
  color: #a9a9a9;
}
</style>