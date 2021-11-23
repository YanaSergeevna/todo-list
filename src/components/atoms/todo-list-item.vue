<template>
  <li :class="{ active: createItemShow }">
      <div class="list-item-header" >
        <div class="list-item-header__today" v-if="hasToday && indexDay == 0">
          Today
        </div>
        <div class="list-item-header__day" v-else>
          {{weekDay}}<span class="date">{{date}}.{{selectedMonth}}</span>
        </div>
      </div>
      <ul class="a-items-list">
        <draggable
        v-if="tasksbyDate.length > 0"
        v-model="tasksbyDate" 
        :options="{group:'people'}"
        @start="drag=true" 
        @end="drag=false"
        class="list-group"
        ghost-class="ghost"
        >

          <a-todo-elem 
                v-for="(task, index) in tasksbyDate"
                :task="task"
                :key="'task'+index"
                @changeTask="changeTask"
                @removeItem="removeItem"
                class="drag-item"
          />
          <!--
          
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
          -->
        </draggable>
        <!--
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
          -->
      </ul>
  </li>
</template>
<script>
  import 'regenerator-runtime/runtime'
  import axios from "axios";
  import ToDoElem from "./todo-elem.vue";
  import ToDoResolvedElem from "./todo-resolved-item.vue";
  import CreateTodoElem from "./create-todo-elem.vue";
  
  import draggable from 'vuedraggable'

  const baseURL = "http://localhost:3001/todos";

  export default {
    name: 'todo-list-item',
    props: {
        dateIso: {
          type: Array
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
        showResolved: {
          type: Boolean
        }
    },
    data: () => ({
        weekDays: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        date: '',
        weekDay: '',
        createItemShow: false,
        createItemFocus: false,
        resolved: [],
        tasksbyDate: []
    }),
    async created() {
        try {
            const res = await axios.get(baseURL);
            this.dataProcessing(res.data)
        } catch (e) {
            console.error(e);
        }
    },
    mounted:function(){
    },
    methods: {
      createElem() {
        this.createItemShow = true;
      },
      addedValue(value) {
        if(value != "") {
          //this.tasks.push(value.trim())
        }
        //if(this.tasks.length > 0) { 
          //this.createItemFocus = true
        //} else {
          //this.createItemFocus = false
        //}
      },
      blurElem() {
        this.createItemShow = false;
      },
      changeTask(value, index, status) {
        if(status == 'active') {
          //this.tasks[index] = value.trim()
        } else {
          this.resolved[index]  = value.trim()
        }
      },  
      removeItem(index, status) {
        setTimeout(()=>{
          if(status == 'active') {
            //this.resolved.push(this.tasks[index])
          } else {
            ///this.tasks.push(this.resolved[index])
          }
        },1000)
      },
      dataProcessing(data) {
        let day = new Date(this.dateIso),
            monthDay = ((this.dateIso)[0]).slice(0, 10),
            tasks = '';
        this.date = day.getDate();
        this.weekDay = this.weekDays[day.getDay()];

        tasks = data.filter( day => ((day.date).slice(0, 10)) === monthDay);
        if(tasks.length > 0) {
          this.tasksbyDate = tasks;
        }
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
        background: #6495ed90;
        width: calc(30% - 30px);
        flex-shrink: 0;
        margin: 15px;
    }
    .list-item-header {
      text-align: center;
      font-weight: 700;
      &__day {
        display: flex;
        justify-content: center;
        .date {
          position: absolute;
          top: 10px;
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
    .a-items-list {
      display: flex;
      flex-direction: column;
      height: 90%;
      padding: 0;
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
    .list-item-header__today,
    .list-item-header__day {
      color: #ffffff;
    }
</style>
