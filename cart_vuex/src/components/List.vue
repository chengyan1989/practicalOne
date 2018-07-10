<template>
  <div class="list">
	  <ul class="productlist">
		  <li v-for="(item,index) in list" :key="index">
			  <div class="input">
				  <input type="checkbox" :checked="item.checked"
				  @change="checkedItem({ind:index})">
			  </div>
			  <div class="img">
				  <img :src="item.img" alt="">
			  </div>
			  <div class="content">
				  <h1>{{item.tit}}</h1>
				  <div class="picnum">
					  <h2>￥{{item.pic}}</h2>
					  <h3>
						  <span @click="changeNum({ind:index,type:'+'})">+</span>
						  <b>{{item.count}}</b>
						  <span @click="changeNum({ind:index,type:'-'})">-</span>
					  </h3>
				  </div>
			  </div>
		  </li>
	  </ul>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  name: 'list',
  computed:{
		...mapState({
		list:state=>state.list.list
  		})
  },
  methods:{
	  ...mapActions({
		  changeNum:"changeNum",
		  checkedItem:"checkedItem"
	  })
  },
  mounted(){
	  this.$store.dispatch("getProductList");
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/list.scss";
</style>

