import Vue from 'vue'
import Example from './Example.vue'
import router from './router'

import '@/assets/iconfont/iconfont.css'
import '@/assets/css/global.css'

new Vue({
    el: '#example',
    router,
    render: h => h(Example)
});
