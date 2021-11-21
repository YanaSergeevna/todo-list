import Vue from 'vue'
import App from './App.vue'

import VueTextareaAutosize from 'vue-textarea-autosize'

import './scss/style.scss';


new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(VueTextareaAutosize)