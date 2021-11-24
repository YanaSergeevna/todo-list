<template>
  <li class="m-todo-elem">
        <label class="m-todo-elem__circle"></label>
        <TextareaAutosize
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
        }
    }
  }
</script>
<style scoped lang="scss">
    .m-todo-elem.a-create-elem {
        margin: 0;
    } 
</style>
