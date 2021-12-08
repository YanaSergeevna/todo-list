<template>
  <li class="m-todo-elem">
        <label class="m-todo-elem__circle"></label>
        <TextareaAutosize
        :class="['field'+indexDay]" 
        rows="1" 
        v-model="issueContent" 
        @blur.native="passValue"
        />
  </li>
</template>
<script>
import {mapMutations} from 'vuex';
  
export default {
    name: 'todo-elem',
    props: {
        indexDay: {
            type: Number
        },
        dateIso: {
            type: String
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
        ...mapMutations(["createTask"]),
        passValue() {
            let newValue = this.issueContent.trim(),
                newObj= { 
                    id: new Date().valueOf(),
                    name: newValue, 
                    date: this.dateIso, 
                    done: false, 
                    priority: "normal" 
                }
            if(this.issueContent == '') {
                this.$emit('showCreateElem', false)
            } else {
                this.createTask(newObj)
                this.$emit('showCreateElem', false)
                this.tasks
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
