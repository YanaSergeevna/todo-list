<template>
    <div>
        <div class="list-item-header__today" v-if="checkTodayDay()">
          Today
        </div>
        <div class="list-item-header__day" v-else>
          {{weekDay}}<span class="date">{{date}}.{{getActualMonth()}}</span>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'todo-item-header',
    data: () => ({
        weekDays: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        date: '',
        weekDay: ''
    }),
    props: {
        dateIso: {
          type: Array
        },
        hasToday: {
          type: Number
        },
        selectedMonth: {
          type: Number
        },
        indexDay: {
          type: Number
        }
    },
    mounted:function(){
      this.dateProcessing()
    },
    methods: {
        dateProcessing() {
            let day = new Date(this.dateIso);
            day = new Date(day.getTime() - 86400000);
            this.date = day.getDate();
            this.weekDay = this.weekDays[day.getDay()]
        },
        getActualMonth() {
            let actualMonth = this.selectedMonth + 1;
            if(actualMonth < 10) {
                return `0${actualMonth}`
            } else {
                return actualMonth
            }
        }, 
        checkTodayDay() {
          let day = new Date(this.dateIso),
              today = new Date();
              day = new Date(day.getTime() - 86400000);
           if(day.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
             return true
           }
        }       
    },
    watch: {
      dateIso: function() {
         this.dateProcessing()
      },
    }
}
</script>
<style scoped lang="scss"> 
    .list-item-header__today,
    .list-item-header__day {
      color: #ffffff;
    }
    .list-item-header {
      text-align: center;
      font-weight: 700;
      margin-bottom: 15px;
      &__day {
        display: flex;
        justify-content: center;
        .date {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 14px;
          color: #F4BC9F;
          &:after {
            content: "";
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #F4BC9F;
          }
        } 
      }
    }
</style>
