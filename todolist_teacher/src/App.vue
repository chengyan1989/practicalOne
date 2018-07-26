<template>
  <div id="app">
      <Input/>
      <List/>
  </div>
</template>

<script>
import Input from "./components/input";
import List from "./components/list";
export default {
    name: 'App',
    components: {
      Input,
      List
    }
}
</script>

<style>

</style>
