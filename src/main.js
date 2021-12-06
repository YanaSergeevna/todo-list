import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueTextareaAutosize from 'vue-textarea-autosize'
Vue.use(VueTextareaAutosize)

import PerfectScrollbar from 'vue2-perfect-scrollbar'
Vue.use(PerfectScrollbar)

import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './scss/style.scss';

new Vue({
  el: '#app',
  render: h => h(App),
  store
})

