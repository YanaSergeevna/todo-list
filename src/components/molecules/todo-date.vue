<template>
        <div>
            <div class="m-calendar-top-line" id="month-desk">
                <select class="js-month-select" v-model="selectedMonth">
                    <option v-for="(month, index) in months" 
                            :value="index" 
                            :key="index"
                    >   
                        {{month}}
                    </option>
                </select>
                <input type="number" value="" min="0" max="9999" size="4" v-model="activeYear" >
                <button class="a-mount-button prev" @click="getMounth('prev')" v-if="!hasToday"><</button>
                <h2 class="a-month-title">
                    {{months[selectedMonth]}}&nbsp;{{activeYear}}
                </h2>
                <button class="a-mount-button next" @click="getMounth('next')">></button>
            </div>      
        </div>
</template>

<script>
    export default {
        name: "todo-date",
        props: {
            calendar: {
                typeof: Function
            }
        },
        data() {
            return {
                months: ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"],
                selectedMonth: null,
                activeYear: new Date().getFullYear(),
                hasToday: false
            }
        },
        methods: {
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
        }
    }
</script>


<style lang="scss" scoped>
    .m-month-container {
        position: relative;
        height: 100%;
        margin-top: 30px;
        padding: 30px 30px 60px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
         background: #ffffff;
    }
</style>
