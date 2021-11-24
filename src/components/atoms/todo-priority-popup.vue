<template>
    <ul class="a-priority-popup">
        <li 
            v-for="(item, index) in priorities" 
            :key="'Priority'+index"
            @click="choisePriority(id, item.priority)"
            :class="['a-priority-item', item.priority]"
        >
        {{item.name}}
        </li>
    </ul>
</template>
<script>
  export default {
    name: 'todo-add-priority',
    props: {
        id:{
            type: Number
        },
        task: {
            type: Object
        }
    },
    data: () => ({
        priorities: [
            {
                name: '!!!',
                color: '#F6412D',
                priority: 'hight'
            },
            {
                name: '!!',
                color: '#FF9800',
                priority: 'medium'
            },
            {
                name: '!!!',
                color: '#FFEC19',
                priority: 'low'
            },
            {
                name: '',
                color: '#cecece',
                priority: 'normal'
            }
        ]

    }),
    mounted:function(){},
    methods: {
        choisePriority(id, status) {
            this.$emit('choisePriority', id, status)
        }
    }
}
</script>
<style scoped lang="scss">
   .a-priority-item {
       position: relative;
       display: flex;
       justify-content: center;
       list-style-type: none;
       font-size: 16px; 
       cursor: pointer;
       width: 20px;
       height: 28px;
       &:after {
           content: "";
           position: absolute;
           top: 70%;    
           left: 50%;
           transform: translate(-50%, -50%);
           border: 20px solid transparent;
           z-index: -1;
       }
    } 
    .a-priority-item.hight:after {
        border-top: 20px solid rgb(246, 65, 45);
    }
    .a-priority-item.medium:after {
        border-top: 20px solid rgb(255, 152, 0);
    }
    .a-priority-item.low:after  {
        border-top: 20px solid rgb(255, 236, 25);
    }
    .a-priority-item.normal:after {
        border-top: 20px solid #cecece;
    }
    .a-priority-popup {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: transparent;
        padding: 0 10px 0;
        z-index: 5;
        overflow: hidden;
    }
    .slide-enter-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: ease-in;
        -webkit-transition-timing-function: ease-in;
        -o-transition-timing-function: ease-in;
        transition-timing-function: ease-in;
    }

    .slide-leave-active {
        -moz-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        transition-duration: 0.3s;
        -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .slide-enter-to, .slide-leave {
        max-height: 100px;
        overflow: hidden;
    }

    .slide-enter, .slide-leave-to {
        overflow: hidden;
        max-height: 0;
    }
</style>
