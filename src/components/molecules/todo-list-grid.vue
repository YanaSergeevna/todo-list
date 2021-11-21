<template>
    <div v-swiper:mySwiper="swiperOptions" class="m-month-container column-swiper">
        <div class="swiper-wrapper" >
            <m-list-item
                v-for="(day, index) in daysObj"
                :key="'Day'+ index"
                :day="day"
                :indexDay="index"
                :hasToday="hasToday"
                :selectedMonth="selectedMonth"
                :showResolved="showResolved"
                class="m-day-item swiper-slide"
            >
            </m-list-item>
        </div>
        <a-slider-navigation 
            class="column-slider-navigation"
            @showResolved="showResolvedItem"
        ></a-slider-navigation>
    </div>
</template>
<script>
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import ToDoListItem from "../atoms/todo-list-item.vue";
    import ToDoSliderNavigation from "../atoms/todo-slider-navigation.vue";

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
            swiperOptions: {
                slidesPerView: 1,
                slidesPerGroup:1,
                allowTouchMove: false,
                navigation: {
                    nextEl: '.column-swiper-button-next',
                    prevEl: '.column-swiper-button-prev'
                },
                breakpoints: {
                    1440: {
                        slidesPerView: 4,
                        slidesPerGroup:4,
                    },
                    992: {
                        slidesPerView: 3,
                        slidesPerGroup:3,
                    },
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup:2,
                    }
                }
            }
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
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        components: {
            "m-list-item": ToDoListItem,
            'a-slider-navigation': ToDoSliderNavigation,
            Swiper,
            SwiperSlide
        },
        directives: {
            swiper: directive
        }
  };
</script>
<style scoped lang="scss">
   .column-slider-navigation {
       position: relative;
       display: flex;
       justify-content: space-between;
   }
   .swiper-wrapper .m-day-item:last-child {
       &::after {
           display: none;
       }
   }
   .m-month-container {
       max-width: 100%;
   }
</style>
