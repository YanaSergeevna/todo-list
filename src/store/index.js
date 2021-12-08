import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: 'todo-board',
    storage: window.localStorage
})
let savedTasks = localStorage.getItem('todo-board')
import mutations from './mutations'

const store = new Vuex.Store({
    state: {
        todos: savedTasks ? JSON.parse(savedTasks): []
    },
    mutations:  mutations,
    getters: {
        allTasks(state) {
            return state.todos.filter(task => task.done === false);
        },
        resolvedTasks(state) {
            return state.todos.filter(task => task.done === true);
        }
    },
    plugins: [vuexPersist.plugin]
  })

export default store