<template>
  <li>
      <a-todo-item-header 
        class="list-item-header"
        :hasToday="hasToday"
        :dateIso="dateIso"
        :selectedMonth="selectedMonth"
        :indexDay="indexDay"
      />
      <perfect-scrollbar>
        <div class="a-items-lists">

          <draggable
            :options="{group:'people'}"
            @start="drag=true" 
            @end="drag=false"
            class="list-group"
            @add="onAdd"
          >
            <transition-group name="list" 
              tag="ul" 
              :data-date="dateIso"
            >
              <m-todo-elem 
                v-for="task in tasksbyDate"
                :task="task"
                :key="task.id"
                class="drag-item list-item"
              />
            </transition-group>
          </draggable>

          <transition> 
            <ul>
              <li class="a-resolved-item" 
                v-if="showResolved">
                <m-todo-resolved-elem
                v-for="(task, index) in resolvedTaskByDate"
                :key="'resolveTask'+index"
                :task="task"
                />
              </li>
            </ul>
          </transition>

          <m-create-todo-elem
              v-if="createItemShow"
              class="a-create-elem"
              :indexDay="indexDay"
              :dateIso="dateIso[0]"
              @showCreateElem="showCreateElem"
            />
        </div>
      </perfect-scrollbar>
      <a-todo-item-nav 
        @showCreateElem="showCreateElem"
        @switchShow="switchShow"
      />
  </li>
</template>
<script>
  import ToDoItemHeader from "../atoms/todo-item-header.vue";
  import ToDoItemNav from "../atoms/todo-item-nav.vue";
  import ToDoElem from "./todo-elem.vue";
  import ToDoResolvedElem from "./todo-resolved-item.vue";
  import CreateTodoElem from "./create-todo-elem.vue";

  import { mapGetters, mapMutations, mapState} from 'vuex';
  import draggable from 'vuedraggable'

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
        createItemShow: false,
        tasksbyDate: [],
        resolvedTaskByDate: [],
        showResolved: false
    }),
    computed: {
      ...mapGetters(["allTasks", "resolvedTasks"])
    },
    mounted:function(){
      this.dataProcessing(this.allTasks, false)
      this.dataProcessing(this.resolvedTasks, true)
    },
    methods: {
      ...mapMutations(["changeDate"]),
      showCreateElem(status) {
        this.createItemShow = status;
      },
      switchShow() {
        if(this.showResolved) {
          this.showResolved = false
        } else {
          this.showResolved = true
        }
      },
      dataProcessing(data, done) {
        let monthDay = ((this.dateIso)[0]).slice(0, 10),
            tasks = '';
          tasks = data.filter( day => ((day.date).slice(0, 10)) === monthDay);
          done? this.resolvedTaskByDate = tasks: this.tasksbyDate = tasks;
      },
      onAdd(evt) {
        let newDateObj = {
          date: (evt.to).getAttribute("data-date"),
          id: parseInt((evt.item).getAttribute("id"))
        }
        this.changeDate(newDateObj)
      }
    },
    components: {
      'm-todo-elem': ToDoElem,
      'm-todo-resolved-elem': ToDoResolvedElem,
      'm-create-todo-elem': CreateTodoElem,
      'a-todo-item-header': ToDoItemHeader,
      'a-todo-item-nav':ToDoItemNav,
      draggable
    },
    watch: {
      dateIso: function() {
         this.dataProcessing(this.allTasks, false)
         this.dataProcessing(this.resolvedTasks, true)
      },
      allTasks: function() {
        this.dataProcessing(this.allTasks, false)
      },
      resolvedTasks: function() {
        this.dataProcessing(this.resolvedTasks, true)
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
        min-width: 300px;
        flex-shrink: 0;
        margin: 15px;
    }
    .a-items-lists {
      display: flex;
      flex-direction: column;
      height: 90%;
      padding: 0;
      margin: 0;
      margin-bottom: 20px;
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
      .a-items-lists {
        &:before {
          display: block;
        }
      }
    }
    .m-day-item.active {
      .a-items-lists {
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
    .ps {
      max-height: 70vh;
    }
    .ps.ps--active-y  {
      padding-right: 16px;
    }
</style>
