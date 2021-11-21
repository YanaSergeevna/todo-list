<template>
        <div class="o-todo-wrapper"  style="background-image: url(../src/assets/bg.jpg)">
            <h1 class="a-todo-title">Planner</h1>
            <div class="container o-todo-month">
                <m-list-grid
                    :daysObj="daysObj"
                    :hasToday="hasToday"
                    :selectedMonth="selectedMonth"
                ></m-list-grid>
                <div class="m-calendar-top-line" id="month-desk">
                    <select class="js-month-select" v-show="false" v-model="selectedMonth">
                        <option v-for="(month, index) in months" 
                                :value="index" 
                                :key="index"
                        >   
                            {{month}}
                        </option>
                    </select>
                    <input type="number" value="" min="0" max="9999" size="4" v-model="activeYear" v-show="false">
                    <button class="a-mount-button prev" @click="getMounth('prev')" v-if="!hasToday"><</button>
                    <h2 class="a-month-title">
                        {{months[selectedMonth]}}&nbsp;{{activeYear}}
                    </h2>
                    <button class="a-mount-button next" @click="getMounth('next')">></button>
                </div>          
            </div>
        </div>
</template>

<script>
    import ToDoListGrid from "./molecules/todo-list-grid.vue";

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

                this.selectedMonth = lastDate.getMonth();
                this.daysObj = [];
                this.hasToday =  false;

                for(var  i = 1; i <= lastDay; i++) {
                    let weekDayIndex = new Date(year,month, i-1).getDay();
                    if (i == new Date().getDate() && lastDate.getFullYear() == new Date().getFullYear() && lastDate.getMonth() == new Date().getMonth()) {
                        this.daysObj = [];
                        this.hasToday = true;

                    }
                    let daysObj = {
                        day: i,
                        weekDay: weekDayIndex
                    }
                    this.daysObj.push(daysObj)
                }

                this.activeYear = lastDate.getFullYear();
            },

            getMounth(direction) {
                let select = document.querySelector('.js-month-select'),
                    monthSelectedIndex = select.selectedIndex,
                    yearValue = document.querySelector('#month-desk input').value;

                if(direction == 'prev') {
                    if (monthSelectedIndex != 0) {
                         select.selectedIndex = monthSelectedIndex - 1
                    } else {
                        select.selectedIndex = 11   ;
                        yearValue = Number(yearValue) - 1;
                    }
                } else if (direction == 'next') {
                    if (monthSelectedIndex != 11) {
                        select.selectedIndex = monthSelectedIndex + 1 
                    } else {
                        select.selectedIndex = 0;
                        yearValue = Number(yearValue) + 1
                    }
                }
                this.activeYear = yearValue;
                this.calendar(yearValue, parseFloat(document.querySelector('#month-desk select').options[document.querySelector('#month-desk select').selectedIndex].value));
            },
        },
        computed: {
        },
        components: {
            "m-list-grid": ToDoListGrid
        }
    }
</script>


<style lang="scss" scoped>
    .o-todo-wrapper {
        position: relative;
        width: 100%;
        height: calc(100vh);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top;
        background-attachment: fixed;
        h1 {
            position: absolute;
            left: 20px;
            top: 30px;
            font-family: 'Courgette', cursive;
            z-index: 3;
        }
    }
    .o-todo-month {
        position: relative;
        display: flex;
        flex-direction: column;
        z-index: 3;
    }
    .a-month-title {
        font-family: 'Courgette', cursive;
        text-align: start;
    }
    .a-todo-title {
        text-align: center;
        font-size: 40px;
    }
    .m-calendar-top-line {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 40px 0;
        flex: 1;
    }
    .a-mount-button {
        position: relative;
        color: transparent;
        width: 40px;
        height: 40px;
        border: none;
        margin: 0 5px;
        background: transparent;
        box-shadow: none;
        &:after {
            content: "";
            position: absolute;
            width: 12px;
            height: 12px;
            border-bottom: 3px solid #000000;
            border-left: 3px solid #000000;
            transform: rotate(45deg);
            transition: border-color .2s ease;
        }
        &.prev:after {
            top: 8px;
            left: 16px;
            transform: rotate(45deg)
        }
        &.next:after {
            top: 8px;
            right: 14px;
            transform: rotate(-135deg)
        }
        &:hover {
            &:after {
                opacity: .5;
            }
        }
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
