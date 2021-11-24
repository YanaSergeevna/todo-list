<template>
  <li>
      <div class="list-item-header" >
        <div class="list-item-header__today" v-if="hasToday && indexDay == 0">
          Today
        </div>
        <div class="list-item-header__day" v-else>
          {{weekDay}}<span class="date">{{date}}.{{getActualMonth}}</span>
        </div>
      </div>
      <ul class="a-items-list">
        <draggable
        :options="{group:'people'}"
        @start="drag=true" 
        @end="drag=false"
        class="list-group"
        ghost-class="ghost"
        component: m-todo-elem
        @add="onAdd"
        :data-date="dateIso"
        >
          <m-todo-elem 
                v-for="(task, index) in tasksbyDate"
                :task="task"
                :key="'task'+index"
                @checkThisTask="checkThisTask"
                @removeItem="removeItem"
                @rewriteTask="rewriteTask"
                class="drag-item"
          />
        </draggable>
          <li class="a-resolved-item" 
            v-if="showResolved">
            <m-todo-resolved-elem
            v-for="(task, index) in tasksbyDate"
            :key="'resolveTask'+index"
            :task="task"
            @checkThisTask="checkThisTask"
            @removeItem="removeItem"
            />
          </li>
        <m-create-todo-elem
            v-if="createItemShow"
            class="a-create-elem"
            @added-value="addedValue"
            :indexDay="indexDay"
            :class="[
              createItemFocus ? 'active' : ''
            ]"
          />
      </ul>
      <div class="todo-item-nav">
        <div class="a-add-task" @click="createElem">+ Add new task</div>
        <div class="a-show-resolved" @click="switchShow"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><path d="m494.8,241.4l-50.6-49.4c-50.1-48.9-116.9-75.8-188.2-75.8s-138.1,26.9-188.2,75.8l-50.6,49.4c-11.3,12.3-4.3,25.4 0,29.2l50.6,49.4c50.1,48.9 116.9,75.8 188.2,75.8s138.1-26.9 188.2-75.8l50.6-49.4c4-3.8 11.7-16.4 0-29.2zm-238.8,84.4c-38.5,0-69.8-31.3-69.8-69.8 0-38.5 31.3-69.8 69.8-69.8 38.5,0 69.8,31.3 69.8,69.8 0,38.5-31.3,69.8-69.8,69.8zm-195.3-69.8l35.7-34.8c27-26.4 59.8-45.2 95.7-55.4-28.2,20.1-46.6,53-46.6,90.1 0,37.1 18.4,70.1 46.6,90.1-35.9-10.2-68.7-29-95.7-55.3l-35.7-34.7zm355,34.8c-27,26.3-59.8,45.1-95.7,55.3 28.2-20.1 46.6-53 46.6-90.1 0-37.2-18.4-70.1-46.6-90.1 35.9,10.2 68.7,29 95.7,55.4l35.6,34.8-35.6,34.7z"/></g></svg></div>
      </div>
      
  </li>
</template>
<script>
  import 'regenerator-runtime/runtime'
  import axios from "axios";
  import ToDoElem from "../molecules/todo-elem.vue";
  import ToDoResolvedElem from "../molecules/todo-resolved-item.vue";
  import CreateTodoElem from "../molecules/create-todo-elem.vue";
  
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
        tasksbyDate: [],
        showResolved: false
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
    computed: {
        getActualMonth() {
          let actualMonth = this.selectedMonth + 1;
          if(actualMonth < 10) {
            return `0${actualMonth}`
          } else {
            return actualMonth
          }
        } 
    },
    methods: {
      createElem() {
        this.createItemShow = true;
      },
      async addedValue(value) {
        let date =  this.dateIso[0];
          try {
            const res = await axios.post(baseURL, { name: value, date: date, done: false, priority: "normal" });
            this.tasksbyDate = [...this.tasksbyDate, res.data];
          } catch(e){
          }
      },
      async rewriteTask(value, id) {
        let elemIndex = '';
        try {
          await axios.patch(`${baseURL}/${id}`, {
            name: value
          });
          for(let todo of this.tasksbyDate) {
            if (todo.id === id) {
              elemIndex = this.tasksbyDate.indexOf(todo);
              break
            }
          }
          this.tasksbyDate[elemIndex].name = value;
        } catch (e) {
          console.error(e);
        }
      },
      switchShow() {
        if(this.showResolved) {
          this.showResolved = false
        } else {
          this.showResolved = true
        }
      },
      async removeItem(id) {
        try {
          await axios.delete(`${baseURL}/${id}`);
          let removeElemIndex = '';
          for(let todo of this.tasksbyDate) {
            if (todo.id === id) {
              removeElemIndex =  this.tasksbyDate.indexOf(todo);
              break
            }
          }
          this.tasksbyDate.splice(removeElemIndex, 1);
        } catch (e) {
          console.error(e); 
        } 
      },
      async checkThisTask(id, status) {
        let value = ''
        if(status == "done") {
          value = {
            done: true
          }
        } else {
          value = {
            done: false
          }
        }
        try {
          await axios.patch(`${baseURL}/${id}`, value);

          this.tasksbyDate = this.tasksbyDate.map(todo => {
            if (todo.id === id) {
              status == "done" ? todo.done = true : todo.done = false
            }
            return todo;
          });
        } catch (e) {
          console.error(e);
        }
      },
      dataProcessing(data) {
        let day = new Date(this.dateIso),
            monthDay = ((this.dateIso)[0]).slice(0, 10),
            tasks = '';
        this.date = day.getDate()-1;
        this.weekDay = this.weekDays[day.getDay()];

        tasks = data.filter( day => ((day.date).slice(0, 10)) === monthDay);
        this.tasksbyDate = tasks;
      },
      async onAdd(evt) {
        let newDate = (evt.to).getAttribute("data-date"),
            id = (evt.item).getAttribute("id");
         try {
           await axios.patch(`${baseURL}/${id}`, {date: newDate});
         } catch (e) {
           console.error(e);
         }
      },
      async updateDate() {
         try {
            const res = await axios.get(baseURL);
            this.dataProcessing(res.data)
        } catch (e) {
            console.error(e);
        }
      }
    },
    components: {
      'm-todo-elem': ToDoElem,
      'm-todo-resolved-elem': ToDoResolvedElem,
      'm-create-todo-elem': CreateTodoElem,
      draggable
    },
    watch: {
      dateIso: function() {
        this.updateDate()
      }
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
      padding: 15px 0;
      margin: 0;
      .list-group {
        flex-grow: 1;
        height: 100%;
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
    .a-add-task {
      color: #F4BC9F;
      cursor: pointer;
    }
    .todo-item-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .a-show-resolved {
      display: flex;
      align-items: center;
      max-width: 25px;
      max-height: 20px;
      cursor: pointer;
      svg {
        width: 100%;
        transition: opacity .2s ease;
        path {
          fill: #F4BC9F;
        }
      }
    }
</style>
