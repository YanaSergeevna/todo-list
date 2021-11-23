import Vue from 'vue'
import App from './App.vue'


import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize)

import './scss/style.scss';

new Vue({
  el: '#app',
  render: h => h(App)
})


