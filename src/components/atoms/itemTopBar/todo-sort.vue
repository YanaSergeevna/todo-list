<template>
    <div class="a-todo-sort" @click="sortTasks()">
        <div class="sort-icon" data-title="Sort by priority"><img src="../../../assets/sort.svg" alt=""></div>
    </div>
</template>
<script>

  export default {
    name: 'todo-sort',
    data: () => ({
    }),
    props: {
        tasksbyDate: {
          type: Array
        }
    },
    mounted:function(){
    },
    methods: {
        sortTasks() {
            this.tasksbyDate.sort( this.compare );
        },
        compare( a, b ) {
            if ( a.priority < b.priority ){
                return -1;
            }
            if ( a.priority > b.priority ){
                return 1;
            }
            return 0;
        }
    },
    watch: {
    }
}
</script>
<style scoped lang="scss">
    .a-todo-sort {
        display: flex;
        justify-content: flex-end;
        flex: 1;
    }
    .sort-icon {
        position: relative;
        width: 20px;
        cursor: pointer;
        img {
            max-width: 100%;
        }
    }
    .sort-icon:hover::after {
    content: attr(data-title);
    position: absolute;
    left: 0; 
    bottom: 100%;
    z-index: 1;
    background: rgba(255,255,230,0.9);
    font-family: Arial, sans-serif;
    font-size: 11px;
    padding: 5px 10px;
    border: 1px solid #333;
    width: max-content;
   }
</style>
