<template>
<transition name="slide-fade">
    <li :class="['a-todo-elem', priority ]" 
        v-show="show" >
        <label class="a-todo-elem__circle"
            @click="checkItem">
        </label>
        <span class="priorityLabel">{{priorityLabel}}</span>
        <TextareaAutosize
            :min-height="30"
            :max-height="350"
            class="form-field field" 
            rows="1" 
            v-model="task"
            @blur.native="saveValue()"
        />
        <a-add-priority
            @choisePriority="addedPriority"
            :showPriorityBtn="showPriorityBtn"
        />
    </li>
</transition>
</template>
<script>
    import AddPriority from "./todo-add-priority.vue";
    export default {
        name: 'todo-elem',
        props: {
            task: {
                typeof: String
            },
            index: {
                typeof: Number
            }
        },
        data: () => ({
            issueContent: '',
            filledField: false,
            elemShow: true,
            resolved: [],
            show: true,
            showPriorityBtn: true,
            priorityColor: '#cecece',
            priority: null,
            priorityLabel: null
        }),
        mounted:function(){
        },
        methods: {
            checkItem(e) {
                let elem = e.target;
                elem.classList.add('active')
                setTimeout(()=>{
                    this.show = false;
                },1000)
                this.$emit('removeItem', this.index, 'active')
            },
            saveValue() {
                if(this.task != "") {
                    this.$emit('changeTask', this.task, this.index, 'active')
                } else {
                    this.show = false
                }
                this.showPriorityBtn = false; 
                
            },
            addedPriority(color, index) {
                this.priorityColor = color
                switch (index) {
                case 0:
                      this.priority = 'hight-priority'
                      this.priorityLabel = "!!!"
                    break;
                case 1:
                      this.priority = 'medium-priority'
                      this.priorityLabel = "!!"
                    break;
                case 2:
                    this.priority = 'low-priority'
                    this.priorityLabel = "!"
                    break;
                default:
                    this.priority = ''
                    break;
                }
            
            }


        },
        components: {
            'a-add-priority': AddPriority
        }
     
    }
</script>
<style scoped lang="scss">
    .a-todo-elem {
        position: relative;
        list-style-type: none;
        display: flex;
        justify-content: flex-start;
    }
    .a-todo-elem__circle {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
        border: 2px solid #cecece;
        margin: 5px 10px 0 0;
        cursor: pointer;
        &.active {
            border-color: green;
            &:after {
                content: "";
                position: absolute;
                top: 3px;
                left: 3px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: green;
            }
        }
    }
    .hight-priority {
        .a-todo-elem__circle {
            border-color: #F6412D;
            &.active {
                &:after {
                    background: #F6412D;
                }
            }
        }
    }
    .medium-priority {
        .a-todo-elem__circle {
            border-color: #FF9800;
            &.active {
                &:after {
                    background: #FF9800;
                }
            }
        }
    }
    .low-priority {
        .a-todo-elem__circle {
            border-color: #FFEC19;
            &.active {
                &:after {
                    background: #FFEC19;
                }
            }
        }
    }
    .a-todo-elem__circle.active + .form-field {
        opacity: .5;
    }
    textarea {
        border: none;
        padding: 0;
        height: auto;
        width: 100%;
        font-size: 14px;
        resize: none;
        overflow: hidden;
        padding: 5px 20px 5px 0;
        border-bottom: 1px solid #F4BC9F;
        cursor: move;
        &:focus {
            outline: none;
        }
    }
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
    .a-todo-elem.hight textarea {
        &:before {
            content: "!!!";
            color: #F6412D;

        }
    }
    .priorityLabel {
        margin-right: 5px;
    }
    .hight-priority {
        .priorityLabel {
            color: #F6412D;
        }
    }
    .medium-priority {
        .priorityLabel {
            color: #FF9800;
        }
    }
    .low-priority {
        .priorityLabel {
            color: #FFEC19;
        }
    }
</style>
