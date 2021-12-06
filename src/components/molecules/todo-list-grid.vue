<template>
    <div class="container o-todo-month">
        <perfect-scrollbar id="scroll-container">
            <div class="m-month-grid" >
                <m-list-item
                    v-for="(date, index) in daysObj"
                    :key="'Day'+ index"
                    :id="'Day'+ index"
                    :dateIso="date"
                    :indexDay="index"
                    :hasToday="hasToday"
                    :selectedMonth="selectedMonth"
                    class="m-day-item"
                />
            </div>
        </perfect-scrollbar>
    </div>
    
</template>
<script>
    import ToDoListItem from "../atoms/todo-list-item.vue";

    export default {
        name: 'todo-list-grid',
        props: {
            daysObj: {
                type: Array
            },
            hasToday: {
                type: Boolean
            },
            selectedMonth: {
                type: Number
            }
        },
        data: () => ({
            showResolved: false
        }),
        mounted() {
        },
        methods: {
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
    }
    .m-month-grid {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>
