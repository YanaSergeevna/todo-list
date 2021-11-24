<template>
    <div class="container o-todo-month">
        <!-- 
    <div v-swiper:mySwiper="swiperOptions" class="m-month-container column-swiper">
        
        <div class="swiper-wrapper" >
            <m-list-item
                v-for="(date, index) in daysObj"
                :key="'Day'+ index"
                :dateIso="date"
                :indexDay="index"
                :hasToday="hasToday"
                :selectedMonth="selectedMonth"
                :showResolved="showResolved"
                class="m-day-item swiper-slide"
            >
            </m-list-item>
        
        <a-slider-navigation 
            class="column-slider-navigation"
            @showResolved="showResolvedItem"
        ></a-slider-navigation>
        </div>
    </div>
        -->
        <div class="m-month-grid">
            <m-list-item
                v-for="(date, index) in daysObj"
                :key="'Day'+ index"
                :dateIso="date"
                :indexDay="index"
                :hasToday="hasToday"
                :selectedMonth="selectedMonth"
                :showResolved="showResolved"
                class="m-day-item"
            />
        </div>
        
        <a-navigation
            @showResolved="showResolvedItem"
        ></a-navigation>
        <!-- 
        <a-slider-navigation 
            class="column-slider-navigation"
            @showResolved="showResolvedItem"
        ></a-slider-navigation>
        -->
    </div>
    
</template>
<script>
    
    //import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import ToDoListItem from "../atoms/todo-list-item.vue";
    import ToDoNavigation from "../atoms/todo-navigation.vue";
    //import ToDoSliderNavigation from "../atoms/todo-slider-navigation.vue";

    

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
            showResolved: false,
            //todos: [],
            //tasksbyDate: [],
            // swiperOptions: {
            //     slidesPerView: 1,
            //     slidesPerGroup:1,
            //     allowTouchMove: false,
            //     navigation: {
            //         nextEl: '.column-swiper-button-next',
            //         prevEl: '.column-swiper-button-prev'
            //     },
            //     breakpoints: {
            //         1440: {
            //             slidesPerView: 4,
            //             slidesPerGroup:4,
            //         },
            //         992: {
            //             slidesPerView: 3,
            //             slidesPerGroup:3,
            //         },
            //         640: {
            //             slidesPerView: 2,
            //             slidesPerGroup:2,
            //         }
            //     }
            // }
        }),
        mounted() {
        },
        methods: {
            showResolvedItem() {
                if( !this.showResolved) {
                    this.showResolved = true
                } else {
                    this.showResolved = false
                }
            },
            // dataProcessing(data) {
            //     let days = this.daysObj,
            //         tasks = [],
            //         monthDay = "";
            //     for(var  i = 1; i < days.length; i++) {
            //         monthDay = ((days[i])[0]).slice(0, 10);
            //         tasks = data.filter( day => ((day.date).slice(0, 10)) === monthDay);
            //         this.tasksbyDate.push(tasks)
            //     }
            // }
        },
        computed: {
            //swiper() {
                //return this.$refs.mySwiper.$swiper
            //}
        },
        components: {
            "m-list-item": ToDoListItem,
            'a-navigation': ToDoNavigation,
            //Swiper,
            //SwiperSlide
        },
        directives: {
            //swiper: directive
        }
  };
</script>
<style scoped lang="scss">
    .m-month-container {
        max-width: 100%;
    }
    .o-todo-month {
        flex: 1;
        overflow: hidden;
    }
    .m-month-grid {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        overflow: hidden;
        overflow: auto;
    }
</style>
