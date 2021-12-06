export default{
    createTask(state, payload){
        state.todos.push(payload);
    },
    removeTask(state, payload){
        let index = state.todos.findIndex(task => task.id === payload);
        state.todos.splice(index, 1);
    },
    updateTask(state, payload){
        let index = state.todos.findIndex(task => task.id === payload.id);
        state.todos[index].name = payload.value
    },
    checkTask(state, payload) {
        let index = state.todos.findIndex(task => task.id === payload.id);
        state.todos[index].done = payload.done
    },
    addPriority(state, payload){
        let index = state.todos.findIndex(task => task.id === payload.id);
        state.todos[index].priority = payload.priority
    },
    changeDate(state, payload) {
        let index = state.todos.findIndex(task => task.id === payload.id);
        state.todos[index].date = payload.date
    }
}