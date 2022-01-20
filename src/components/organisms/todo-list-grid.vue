<template>
    <div class="container o-todo-month">
        <perfect-scrollbar id="scroll-container">
            <div class="m-month-grid" >
                <m-list-item
                    v-for="(date, index) in daysObj"
                    :key="'Day'+ index"
                    :id="['Day'+ index]"
                    :dateIso="date"
                    :indexDay="index"
                    :hasToday="hasToday"
                    :selectedMonth="selectedMonth"
                    :class="[
                        'm-day-item',
                        hasToday==index?'todayDay':''
                    ]"
                />
            </div>
        </perfect-scrollbar>
    </div>
    
</template>
<script>
    import ToDoListItem from "../molecules/todo-list-item.vue";
    import { mapMutations } from 'vuex';

    export default {
        name: 'todo-list-grid',
        props: {
            daysObj: {
                type: Array
            },
            hasToday: {
                type: Number
            },
            selectedMonth: {
                type: Number
            }
        },
        data: () => ({
            showResolved: false
        }),
        mounted:function(){
            this.filterActiveTasks()
        },
        methods: {
            ...mapMutations(["filterActiveTasks"])
        },
        components: {
            "m-list-item": ToDoListItem
        }
  };
</script>
<style scoped lang="scss">
    .m-month-container {
        max-width: 100%;
    }
    .o-todo-month {
        flex: 1;
        width: 100%;
        padding: 0 15px;
    }
    .m-month-grid {
        width: 100%;
        min-height: calc(100vh - 59px);
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>
