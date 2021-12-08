<template>
    <li :class="[
            'm-todo-elem',
            task.done ? 'active' : '',
            task.priority 
        ]"
        :id="task.id"
        >
        <span class="priority-label"></span>
        <label class="m-todo-elem__circle" @click="checkThisTask">
        </label>
        <TextareaAutosize
            :min-height="20"
            class="form-field field" 
            rows="1" 
            v-model="task.name"
            @blur.native="rewriteTask"
            
        />
        <div class="todo-elem-navigation">
            <div class="remove-elem-btn" @click="removeItem">
                <img src="../../assets/close.svg" alt="">
            </div>
            <a-add-priority
                @showPriorityPopup="showPriorityPopup"
                @closePriorityPopup="priorityShow = false"
                :task="task"
            />
        </div>
        <transition name="slide"> 
            <a-priority-popup 
                v-if="priorityShow"
                :id="task.id"
                :date="task.date"
            />
        </transition>
    </li>
</template>
<script>
    import AddPriority from "../atoms/todo-add-priority.vue";
    import PriorityPopup from "../atoms/todo-priority-popup.vue";
    import {mapMutations} from 'vuex';

    export default {
        name: 'todo-elem',
        props: {
            task: Object
        },
        data: () => ({
            show: true,
            priorityShow: false
        }),
        mounted:function(){
        },
        methods: {
            ...mapMutations(["removeTask", "updateTask", "checkTask"]),
            
            removeItem() {
                this.removeTask(this.task.id)
            },
            rewriteTask() {
                let newValue = {
                    id: this.task.id,
                    value: this.task.name.trim()
                }
                if(newValue.value == '') {
                    this.removeItem(this.task.id)
                } else {
                    this.updateTask(newValue)
                }
            },
            checkThisTask(e) {
                let checkedTask = {
                    id: this.task.id,
                    done: true
                }
                this.checkTask(checkedTask)
                this.show = false
            },
            showPriorityPopup() {
                this.priorityShow ? this.priorityShow = false  : this.priorityShow = true
            }
        },
        components: {
            'a-add-priority': AddPriority,
            'a-priority-popup': PriorityPopup
        }
    }
</script>
<style scoped lang="scss">
    .filled-field {
        border-bottom: 1px solid #F4BC9F;
    }
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
    .priority-label
    .m-todo-elem {
        position: relative;
    }
        
    .m-todo-elem.hight,
    .m-todo-elem.medium,
    .m-todo-elem.low {
        .priority-label {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 15px;
            height: 100%;
            overflow: hidden;
            &::before {
                content: "";
                height: 56px;
                width: 56px;
                position: absolute;
                top: -14px;
                left: -54px;
                transform: rotate(-45deg);
            }
            &:after {
                content: "";
                position: absolute;
                width: 4px;
                height: 100%;
                top: 14px;
                left: 0;
            }
        }
    }
    .m-todo-elem.hight .priority-label:before,
    .m-todo-elem.hight .priority-label:after {
        background-color: rgb(246, 65, 45);
    }
    .m-todo-elem.medium .priority-label:before,
    .m-todo-elem.medium .priority-label:after  {
        background-color: rgb(255, 152, 0);
    }
    .m-todo-elem.low .priority-label:before,
    .m-todo-elem.low .priority-label:after {
        background-color: rgb(255, 236, 25);
    }
    .m-todo-elem.hight {
        .m-todo-elem__circle {
            border-color: rgb(246, 65, 45);
        }
    }

    .m-todo-elem.medium {
        .m-todo-elem__circle {
            border-color: rgb(255, 152, 0);
        }
    }

    .m-todo-elem.low {
        .m-todo-elem__circle {
            border-color: rgb(255, 236, 25);
        }
    }

    
</style>
