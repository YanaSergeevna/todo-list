<template>
        <header>
            <div class="header container">
                <h1 class="a-todo-title">Planner</h1>
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
                    <a-date-picker  v-show="false" />
                    <button class="a-mount-button prev" @click="getMounth('prev')"><</button>
                    <p class="a-month-title">
                        {{months[selectedMonth]}}&nbsp;{{activeYear}}
                    </p>
                    <button class="a-mount-button next" @click="getMounth('next')">></button>
                </div>
            </div>  
        </header>
</template>

<script>
    import TodoDatePicker from "../atoms/todo-date-picker.vue"   
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
                activeYear: new Date().getFullYear(),
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
            }
        },
        computed: {
        },
        components: {
            "a-date-picker": TodoDatePicker
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
    }
    .m-calendar-top-line {
        display: flex;
        align-items: center;
    }
</style>
