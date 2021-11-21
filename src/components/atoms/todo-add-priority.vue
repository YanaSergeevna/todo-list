<template>
  <div v-click-outside="closePriorityPopup"
        class="a-priority-popup-wrapper">
        <div class="a-info-btn"
            @click="openPriorityPopup"
        >
            <svg fill="#4040ff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 C 18.628906 24 24 18.628906 24 12 C 24 5.371094 18.628906 0 12 0 Z M 12 2 C 17.523438 2 22 6.476563 22 12 C 22 17.523438 17.523438 22 12 22 C 6.476563 22 2 17.523438 2 12 C 2 6.476563 6.476563 2 12 2 Z M 12 5.8125 C 11.816406 5.8125 11.664063 5.808594 11.5 5.84375 C 11.335938 5.878906 11.183594 5.96875 11.0625 6.0625 C 10.941406 6.15625 10.851563 6.285156 10.78125 6.4375 C 10.710938 6.589844 10.6875 6.769531 10.6875 7 C 10.6875 7.226563 10.710938 7.40625 10.78125 7.5625 C 10.851563 7.71875 10.941406 7.84375 11.0625 7.9375 C 11.183594 8.03125 11.335938 8.085938 11.5 8.125 C 11.664063 8.164063 11.816406 8.1875 12 8.1875 C 12.179688 8.1875 12.371094 8.164063 12.53125 8.125 C 12.691406 8.085938 12.816406 8.03125 12.9375 7.9375 C 13.058594 7.84375 13.148438 7.71875 13.21875 7.5625 C 13.289063 7.410156 13.34375 7.226563 13.34375 7 C 13.34375 6.769531 13.289063 6.589844 13.21875 6.4375 C 13.148438 6.285156 13.058594 6.15625 12.9375 6.0625 C 12.816406 5.96875 12.691406 5.878906 12.53125 5.84375 C 12.371094 5.808594 12.179688 5.8125 12 5.8125 Z M 10.78125 9.15625 L 10.78125 18.125 L 13.21875 18.125 L 13.21875 9.15625 Z"/></svg>
        </div>
      <ul v-if="priorityShow" class="a-priority-popup">
            <li 
                class="a-priority-item" 
                v-for="(item, index) in priorities" 
                :key="'Priority'+index"
                @click="choisePriority(item, index)"
            >
            <span class="a-priority-flag">
                <svg data-name="Layer 2" id="Layer_2" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                    <path :fill="item.color" d="M3.2,34.75A1.25,1.25,0,0,1,2,33.5V2.32a1.25,1.25,0,0,1,2.5,0V33.5A1.25,1.25,0,0,1,3.2,34.75Z"/>
                    <path :fill="item.color" d="M27.05,27.94c-2.91,0-5.91-.55-7.28-3.84-.83-2-9.14-2.24-16.39-1.24A1.25,1.25,0,0,1,3,20.38c4-.55,17.07-2,19,2.76,1,2.36,3.34,2.41,7.11,2.22l1.36-.05V8.3l-1.21.06c-3.83.23-7.79.46-9.57-3.8-.82-2-9.14-2.24-16.39-1.25A1.25,1.25,0,1,1,3,.84c4-.55,17.07-2,19,2.76,1,2.51,3.16,2.5,7.11,2.27.85,0,1.72-.1,2.59-.11a1.21,1.21,0,0,1,.9.36A1.22,1.22,0,0,1,33,7V26.55a1.25,1.25,0,0,1-.38.89,1.31,1.31,0,0,1-.9.36c-.76,0-1.59,0-2.46.06C28.59,27.9,27.82,27.94,27.05,27.94Z"/>
                </svg>
            </span>
            {{item.name}}
          </li>
      </ul>
  </div>
</template>
<script>

  export default {
    name: 'todo-add-priority',
    props: {
        showPriorityBtn: {
            type: Boolean
        }
    },
    data: () => ({
        priorityShow: false,
        priorities: [
            {
                name: 'Priority 1',
                color: '#F6412D'
            },
            {
                name: 'Priority 2',
                color: '#FF9800'
            },
            {
                name: 'Priority 3',
                color: '#FFEC19'
            },
            {
                name: 'Priority 4',
                color: '#cecece'
            }
        ]

    }),
    mounted:function(){
        
    },
    methods: {
        choisePriority(item, index) {
            this.$emit('choisePriority', item.color, index);
            this.openPriorityPopup()
        },
        openPriorityPopup() {
            this.priorityShow ? this.priorityShow = false  : this.priorityShow = true
        },
        closePriorityPopup (event) {
            this.priorityShow = false;
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
   .a-priority-popup-wrapper {
        position: absolute;
        top: 0;
        right: 0;
   }
   .a-info-btn {
        cursor: pointer;
        svg {
            width: 15px;
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
