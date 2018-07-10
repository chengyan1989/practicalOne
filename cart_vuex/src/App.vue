<template>
  <div id="app">
    <List/>
    <footer>
      <p><input type="checkbox" :checked="ischeckedAll" @click="checkedAll">全选</p>
      <p>总计：{{priceAll}}</p>
    </footer>
  </div>
</template>

<script>
import List from './components/List'
import {mapState,mapActions} from "vuex";
export default {
  name: 'App',
  components: {
    List
  },
  computed:{
    ...mapState({
      priceAll:state=>state.list.priceAll,
      ischeckedAll:state=>state.list.ischeckedAll
    })
  },
  methods:{
    ...mapActions({
      checkedAll:"checkedAll"
    })
  }
}
</script>
<style lang="scss" scoped>
@import "./scss/app.scss";
</style>

