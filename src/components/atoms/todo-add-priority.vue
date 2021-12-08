<template>
    <div v-click-outside="closePriorityPopup"
            class="a-priority-popup-wrapper">
        <div class="a-marker-btn"
            @click="showPriorityPopup"
        >
            <img src="../../assets/pricetag.svg" alt="">
        </div>
    </div>
</template>
<script>

  export default {
    name: 'todo-add-priority',
    props: {
        priorityShow: {
            type: Boolean
        }
    },
    methods: {
        closePriorityPopup() {
            this.$emit('closePriorityPopup', true)
        },
        showPriorityPopup() {
            this.$emit('showPriorityPopup', true)
        }
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
<style scoped lang="scss">
   .a-priority-item {
       display: flex;
       align-items: center;
       justify-content: center;
       list-style-type: none;
       font-size: 16px;
       padding: 5px;
       cursor: pointer;
       span {
           display: block;
           width: 20px;
           margin-right: 5px;
           flex-shrink: 0;
            svg {
                max-width: 100%;
            }
       }
   }
   .a-marker-btn{
        width: 15px;
        height: 15px;
        cursor: pointer;
        background: #091e420a;
        margin: 5px;
        img {
            max-width: 100%;
        }
    }
    .a-priority-popup {
        position: absolute;
        top: 100%;
        right: 0;
        width: 200px;
        background: #ffffff;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        z-index: 5;
    }   
</style>
