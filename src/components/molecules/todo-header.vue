<template>
        <header>
            <div class="header container">
                <h1 class="a-todo-title" @click="reloadPage">Planner</h1>
                <div class="m-calendar-top-line" id="month-desk" v-click-outside="closeDatepicker">
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
            calendar: {
                Type: Function
            }
        },
        data() {
            return {
                months: ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"],
                calendarValue: new Date()
            }
        },
        mounted() {
            this.$nextTick(() => {
                let element = document.getElementById('todayDay'),
                    container = document.getElementById('scroll-container');
                container.scrollLeft = 0;
                let leftPos = element.getBoundingClientRect().left;
                container.scrollLeft = leftPos-40;
            })
        },
        methods: {
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
                        let id = `Day${day-1}`

                    this.$emit('calendar', year, month);
                     this.$nextTick(() => {
                        let element = document.getElementById(id),
                            container = document.getElementById('scroll-container');
                        container.scrollLeft = 0;
                        let leftPos = element.getBoundingClientRect().left;
                        container.scrollLeft = leftPos;
                    })
                })
            },
            reloadPage() {
                window.location.reload();
            }
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
        cursor: pointer;
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
        position: relative;
        margin: 0;
        cursor: pointer;
        padding-right: 20px;
        &:after {
            content: "";
            position: absolute;
            bottom: 7px;
            right: 0;
            width: 7px;
            height: 7px;
            border-left: 2px solid #ffffff;
            border-bottom: 2px solid #ffffff;
            transform: rotate(-45deg);
        }
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
