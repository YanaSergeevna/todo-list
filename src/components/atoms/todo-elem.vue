<template>
<transition name="slide-fade">
    <li :class="['a-todo-elem', priority ]" 
        v-show="show" >
        <label class="a-todo-elem__circle"
            @click="checkItem">
        </label>
        <span class="priorityLabel" v-if="priority">{{priorityLabel}}</span>
        <TextareaAutosize
            :min-height="20"
            class="form-field field" 
            rows="1" 
            v-model="task.name"
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
            task: Object
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
            console.log(this.task)
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
                // if(this.task != "") {
                //     //this.$emit('changeTask', this.task, this.index, 'active')
                // } else {
                //     this.show = false
                // }
                // this.showPriorityBtn = false; 
                
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
    .priorityLabel {
        margin-right: 5px;
        padding: 5px 0;
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
