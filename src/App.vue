<template>
  <div id="app">
    <p-to-do />
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue'

export default {
  name: 'app',
  components: {
    "p-to-do": ToDo
  }
}
</script>

<style lang="scss">
</style>
