<template>
  <li class="a-todo-elem">
        <label class="a-todo-elem__circle"></label>
        <TextareaAutosize
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
        }
    },
    components: {
        'a-add-priority': AddPriority
    }
  }
</script>
<style scoped lang="scss">     
</style>
