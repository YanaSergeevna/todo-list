<template>
  <li class="a-todo-elem">
        <label class="a-todo-elem__circle"></label>
        <TextareaAutosize
        :min-height="30"
        :max-height="350"
        :class="[
                'field'+indexDay,
                'js-autoresize',
                filledField ? 'filled-field' : ''
            ]" 
        rows="1" 
        v-model="issueContent" 
        @blur.native="checkTextarea"
        @change.native="passValue"
        />
        <a-add-priority
            @choisePriority="addedPriority"
        />
      <div class="a-todo-elem__settings"></div>
  </li>
</template>
<script>
import AddPriority from "./todo-add-priority.vue";
export default {
    name: 'todo-elem',
    props: {
        focusField: {
            typeof: Boolean
        },
        indexDay: {
            typeof: Number
        }
    },
    data: () => ({
        issueContent: '',
        filledField: false,
    }),
    mounted:function(){
        document.querySelector('.field'+this.indexDay).focus()
    },
    methods: {
        checkTextarea(e) {
            if(this.issueContent != '') {
                this.filledField = true;
            } else {
                this.filledField = false;
                this.$emit("createItemShow", false);
            }
        },
        passValue(evt) {
            this.$emit("added-value", this.issueContent);
            this.issueContent = '';
            evt.path[0].style.height = "auto";
        },
        addedPriority(color, index) {
            this.priorityColor = color
            switch (index) {
            case 0:
                    this.priority = 'hight-priority'
                break;
            case 1:
                    this.priority = 'medium-priority'
                break;
            case 2:
                this.priority = 'low-priority'
                break;
            default:
                this.priority = ''
                break;
            }
        
        }
    },
    components: {
        'a-add-priority': AddPriority
    }
  }
</script>
<style scoped lang="scss">
    .a-todo-elem {
        position: relative;
        list-style-type: none;
        display: flex;
        justify-content: flex-start;
    }
    .a-todo-elem__circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        flex-shrink: 0;
        border: 2px solid #cecece;
        margin: 5px 10px 0 0;
    }
    textarea {
        border: none;
        padding: 0;
        height: auto;
        width: 100%;
        font-size: 14px;
        resize: none;
        overflow: hidden;
        padding: 5px 0;
        border-bottom: 1px solid transparent;
        &:focus {
            outline: none;
            border-bottom: 1px solid #F4BC9F;
        }
    }
    .filled-field {
        border-bottom: 1px solid #F4BC9F;
    }
    .a-todo-elem.active .field {
        border-bottom: 1px solid #F4BC9F;
    }
        
</style>
