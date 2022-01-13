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
    },
    filterActiveTasks(state,payload) {
        let processTasks = state.todos.filter(task => task.done === false);

        if(processTasks.length > 0) {
            let today = new Date();
            for ( let processTask of processTasks) {
                let taskDate = new Date(processTask.date),
                    index = state.todos.findIndex(task => task.id === processTask.id);
                if(taskDate < today){
                    state.todos[index].date = today.toISOString();
                }
            }
        }
    }
}