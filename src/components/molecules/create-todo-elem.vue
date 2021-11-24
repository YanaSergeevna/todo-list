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
        @blur.native="passValue"
        />
  </li>
</template>
<script>
export default {
    name: 'todo-elem',
    props: {
        indexDay: {
            type: Number
        }
    },
    data: () => ({
        issueContent: '',
        filledField: false,
    }),
    mounted() {
        document.querySelector('.field'+this.indexDay).focus()
    },
    methods: {
        passValue(evt) {
            let newValue = this.issueContent.trim()
            if(this.issueContent == '') {
                this.$emit('showCreateElem', false)
            } else {
                this.$emit("added-value", newValue);
                this.$emit('showCreateElem', false)
                this.issueContent = '';
            }
        }
    }
  }
</script>
<style scoped lang="scss">
    .m-todo-elem.a-create-elem {
        margin: 0;
    } 
</style>
