<template>
<transition name="slide-fade">
    <div 
        :class="[
            'm-todo-elem',
            task.done ? 'active' : '' 
        ]"
        v-show="task.done">
        <label class="m-todo-elem__circle active"
            @click="checkThisTask">
        </label>
        <TextareaAutosize
            :min-height="20"
            class="form-field field" 
            rows="1" 
            v-model="task.name"
            disabled="disabled"
        />
        <div class="todo-elem-navigation">
            <div class="remove-elem-btn" @click="removeItem">
                <img src="../../assets/close.svg" alt="">
            </div>
        </div>
    </div>
</transition>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
        name: 'todo-resolved-item',
        props: {
            task: {
                typeof: Object
            },
            index: {
                typeof: Number
            }
        },
        data: () => ({
            priorityColor: '#cecece',
            priority: '',
            show: true
        }),
        mounted:function(){
        },
        methods: {
            ...mapMutations(["removeTask", "updateTask", "checkTask"]),
            checkThisTask(e) {
                let elem = e.target,
                    checkedTask = {
                        id: this.task.id,
                        done: false
                    }
                elem.classList.remove('active')
                
                this.checkTask(checkedTask)
            },
            removeItem() {
                this.removeTask(this.task.id)
            }

        }
     
    }
</script>
<style scoped lang="scss">
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
    textarea {
        text-decoration: line-through;
    }
    
        
</style>
