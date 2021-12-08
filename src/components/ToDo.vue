<template>
        <div class="o-todo-wrapper"  style="background-image: url(../src/assets/bg.jpeg)">
            <m-header 
                :selectedMonth="selectedMonth"
                @calendar="calendar"
            />
            <o-list-grid
                :daysObj="daysObj"
                :hasToday="hasToday"
                :selectedMonth="selectedMonth"
            ></o-list-grid>       
        </div>
</template>

<script>
    import ToDoHeader from "./molecules/todo-header.vue";
    import ToDoListGrid from "./organisms/todo-list-grid.vue";

    export default {
        name: "todo-new",
        data() {
            return {
                months: ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"],
                selectedMonth: null,
                activeYear: new Date().getFullYear(),
                hasToday: false,
                daysObj: [],
            }
        },
        mounted () {
            this.calendar(new Date().getFullYear(),new Date().getMonth());
        },
        methods: {
            calendar(year, month) {
                let lastDay = new Date(year,month+1,0).getDate(),
                    lastDate = new Date(year,month,lastDay);

                this.selectedMonth = month;
                this.daysObj = [];
                this.hasToday =  false;

                for(var  i = 1; i <= lastDay; i++) {
                    let isoDay = (new Date(year, month, i).toISOString());
                    if (i == new Date().getDate() && lastDate.getFullYear() == new Date().getFullYear() && lastDate.getMonth() == new Date().getMonth()) {
                        this.daysObj = [];
                        this.hasToday = true;
                    }
                    let daysObj = [ isoDay ]
                    this.daysObj.push(daysObj)
                }

                this.activeYear = lastDate.getFullYear();
            },

            
        },
        components: {
            "m-header": ToDoHeader,
            "o-list-grid": ToDoListGrid,
        }
    }
</script>


<style lang="scss" scoped>
    .o-todo-wrapper {
        position: relative;
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        background-attachment: fixed;
        h1 {
            position: absolute;
            left: 20px;
            top: 0;
            font-family: 'Courgette', cursive;
            z-index: 3;
        }
    }
    .m-calendar-top-line {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 0;
        flex: 1;
    }
    .m-week-days {
        display: flex;
        justify-content: space-between;
        height: 100%;
        margin: 0;
        &__item {
            flex: 1;
            list-style: none;
            border: 1px solid #000000;
            border-right: 0;
            padding: 10px;
            &:last-child {
                border-right: 1px solid #000000;
            }
        }
    }
    .column-swiper {
        overflow: hidden;
    }
    .m-month-container {
        position: relative;
        height: 100%;
        margin-top: 30px;
        padding: 30px 30px 60px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        background: #ffffff;
    }
</style>
