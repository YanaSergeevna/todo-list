<template>
  <li :class="{ active: createItemShow }">
      <div class="list-item-header" >
        <div class="list-item-header__today" v-if="hasToday && indexDay == 0">
          Today
        </div>
        <div class="list-item-header__day" v-else>
          {{weekDays[day.weekDay]}}<span class="date">{{day.day}}.{{selectedMonth + 1}}</span>
        </div>
      </div>
      <ul class="a-items-list">
        <draggable 
        v-model="tasks" 
        :options="{group:'people'}"
        @start="drag=true" 
        @end="drag=false"
        class="list-group"
        ghost-class="ghost"
        @click.native.self="createElem()"
        @add="afterDropItem"
        >
          <a-todo-elem 
                v-for="(task, index) in tasks" 
                :key="'task'+index"
                :task="task"
                :index="index"
                @changeTask="changeTask"
                @removeItem="removeItem"
                class="drag-item"
          />
          <li class="a-resolved-item" 
            v-if="showResolved">
            <a-todo-resolved-elem
            v-for="(resolve, index) in resolved"
            :key="'resolveTask'+index"
            :task="resolve"
            :index="index"
            @changeTask="changeTask"
            @removeItem="removeItem"
            />
          </li>
        </draggable>
        <a-create-todo-elem
            class="a-create-elem"
            v-if="createItemShow"
            @added-value="addedValue"
            :indexDay="indexDay"
            @createItemShow="blurElem"
            :class="[
              createItemFocus ? 'active' : ''
            ]"
          />
      </ul>
  </li>
</template>
<script>
  import ToDoElem from "./todo-elem.vue";
  import ToDoResolvedElem from "./todo-resolved-item.vue";
  import CreateTodoElem from "./create-todo-elem.vue";
  
  import draggable from 'vuedraggable'

  

  export default {
    name: 'todo-list-item',
    props: {
        day: {
          type: Object
        },
        hasToday: {
          type: Boolean
        },
        indexDay: {
          type: Number
        },
        selectedMonth: {
          type: Number
        },
        selectedMonth: {
          type: Number
        },
        showResolved: {
          type: Boolean
        }
    },
    data: () => ({
        weekDays: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        tasks: [],
        createItemShow: false,
        createItemFocus: false,
        resolved: []
    }),
    mounted:function(){
    },
    methods: {
      createElem() {
        this.createItemShow = true;
      },
      addedValue(value) {
        if(value != "") {
          this.tasks.push(value.trim())
        }
        if(this.tasks.length > 0) { 
          this.createItemFocus = true
        } else {
          this.createItemFocus = false
        }
      },
      blurElem() {
        this.createItemShow = false;
      },
      changeTask(value, index, status) {
        if(status == 'active') {
          this.tasks[index] = value.trim()
        } else {
          this.resolved[index]  = value.trim()
        }
      },  
      removeItem(index, status) {
        setTimeout(()=>{
          if(status == 'active') {
            this.resolved.push(this.tasks[index])
          } else {
            this.tasks.push(this.resolved[index])
          }
        },1000)
          // let resolvedTask = this.tasks.splice(index, 1)
          // this.resolved = this.resolved.concat(resolvedTask);
      },
      afterDropItem(event) {
        console.log(event)
      }
    },
    components: {
      'a-todo-elem': ToDoElem,
      'a-todo-resolved-elem': ToDoResolvedElem,
      'a-create-todo-elem': CreateTodoElem,
      draggable
    }
  }
</script>
<style scoped lang="scss">
    .m-day-item {
        position: relative;
        padding: 10px;
        list-style-type: none;
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          width: 2px;
          height: 90%;
          background: rgb(255,255,255);
          background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(244,188,159,1) 20%, rgba(244,188,159,1) 80%, rgba(255,255,255,1) 100%);
          transform: translate(0, -50%);
        }
    }
    .list-item-header {
      text-align: center;
      font-weight: 700;
      &__day {
        display: flex;
        justify-content: center;
        .date {
          position: absolute;
          top: 0;
          right: 10px;
          font-size: 14px;
          color: #F4BC9F;
          &:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #F4BC9F;
          }
        } 
      }
    }
    // .a-items-list {
    //   position: relative;
    //   &:before {
    //     content: "";
    //     position: absolute;
    //     top: calc(100% + 10px);
    //     left: 50%;
    //     width: 20px;
    //     height: 20px;
    //     background: url("/images/plus.svg") center/cover;
    //     z-index: 1;
    //     display: none;
    //   }
    // }
    .a-items-list {
      display: flex;
      flex-direction: column;
      height: calc(100% - 35px);
      .list-group {
        flex-grow: 1;
      }
    }
    .m-day-item.active {
      .list-group {
        flex-grow: inherit;
      }
    }
    .m-day-item:hover {
      .a-items-list {
        &:before {
          display: block;
        }
      }
    }
    .m-day-item.active {
      .a-items-list {
        &:before {
          display: none;
        }
      }
    }
    .a-resolved-item {
      list-style-type: none;
    }
    .drag-item {
        cursor: move;
        textarea {
          cursor: move;
        }
    }
</style>
