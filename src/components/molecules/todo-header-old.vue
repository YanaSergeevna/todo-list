<template>
        <header>
            <div class="header container">
                <h1 class="a-todo-title">Planner</h1>
                <div class="m-calendar-top-line" id="month-desk" v-click-outside="closeDatepicker">
                    <!-- 
                    <select class="js-month-select" v-show="false" v-model="selectedMonth">
                        <option v-for="(month, index) in months" 
                                :value="index" 
                                :key="index"
                        >   
                            {{month}}
                        </option>
                    </select>
                    <input type="number" value="" min="0" max="9999" size="4" v-model="activeYear" v-show="false">
                    <button class="a-mount-button prev" @click="getMounth('prev')"><</button>
                    <p class="a-month-title" @click="openDatepicker">
                        {{months[selectedMonth]}}&nbsp;{{activeYear}}
                    </p>
                    <button class="a-mount-button next" @click="getMounth('next')">></button>
                     -->
                     <p class="a-month-title" @click="openDatepicker">
                        {{months[calendarValue.getMonth()]}}&nbsp;{{calendarValue.getFullYear()}}
                    </p>
                    <datepicker v-model="calendarValue" @selected="getDayFromCalendar" ref="datePicker" input-class="hide-input" ></datepicker>
                </div>
            </div>  
        </header>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'; 
    export default {
        name: "todo-header",
        props: {
            selectedMonth: {
                type: Number
            },
            calendar: {
                Type: Function
            }
        },
        data() {
            return {
                months: ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"],
                //activeYear: new Date().getFullYear(),
                calendarValue: new Date()
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
                        select.selectedIndex = 11;
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
                this.$emit('calendar', yearValue, parseFloat(select.options[select.selectedIndex].value));
            },
            openDatepicker() {
                this.$refs.datePicker.showCalendar();
            },
            closeDatepicker() {
                 this.$refs.datePicker.close();
            },
            getDayFromCalendar() {
                this.$nextTick(() => {
                    let year =  this.calendarValue.getFullYear(),
                        month = this.calendarValue.getMonth(),
                        day = this.calendarValue.getDate();                    
                    this.$emit('calendar', year, month);
                     this.$nextTick(() => {
                        let id = `Day${day-1}`,
                            element = document.getElementById(id),
                            container = document.getElementById('scroll-container');
                        container.scrollLeft = 0;
                        let leftPos = element.getBoundingClientRect().left;
                        container.scrollLeft = leftPos;
                    })
                })
            }
        },
        computed: {
        },
        components: {
            Datepicker
        },
        directives: {
            'click-outside': {
                bind: function (el, binding) {
                    el.addEventListener('click', e => e.stopPropagation());
                    document.body.addEventListener('click', binding.value);
                },
                unbind: function(el, binding) {
                    document.body.removeEventListener('click', binding.value);
                }
            }
        }
        
    }
</script>


<style lang="scss" scoped>
    .a-todo-title {
        font-family: 'Courgette', cursive;
        text-align: start;
        font-size: 25px;
        margin: 0;
    }
    header {
        background: #012644;
        height: fit-content;
    }
    .header {
        padding: 15px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        height: fit-content;
    }
    .a-mount-button {
        position: relative;
        color: transparent;
        width: 20px;
        height: 20px;
        border: none;
        margin: 0 5px;
        background: transparent;
        box-shadow: none;
        &:after {
            content: "";
            position: absolute;
            top: 4px;
            width: 8px;
            height: 8px;
            border-bottom: 2px solid #ffffff;
            border-left: 2px solid #ffffff;
            transition: border-color .2s ease;
        }
        &.prev:after {
            left: 0;
            transform: rotate(45deg);
        }
        &.next:after {
            right: 0;
            transform: rotate(-135deg);
        }
        &:hover {
            &:after {
                opacity: .5;
            }
        }
    }
    .a-month-title {
        margin: 0;
        cursor: pointer;
    }
    .m-calendar-top-line {
        display: flex;
        align-items: center;
    }
    .vdp-datepicker {
        input {
            display: none;
        }
    }
</style>
