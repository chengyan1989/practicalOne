<template>
    <div class="letter" @click.stop="spanClick">
            <span v-for="(val,ind) in letter" :key="ind">{{val}}</span>   
    </div>   
</template>
<script>
export default {
    props:{
        letter:"" ,//26个字母
        changeLetter:""
    },
    methods: {
        spanClick(e){
            let keyword=e.target.innerHTML;
            this.changeLetter(keyword);
        },
        // touchStart(e){
        //     //一个字母的高度是20像素
        //     this.height=window.innerWidth / 750 * 100*0.4;
        //     //整个字母列表距离顶部的距离:就是视口的高度减去所有字母的高度除以2 123.5
        //     this.offsetTop = (window.innerHeight - this.height*this.letter.length)/2;
        // },
        // touchMove(e){
        //     let touch=e.touches[0];
        //     let index=parseInt((touch.pageY-this.offsetTop)/20);
        //     if(index<0){
        //         index=0;
        //     }else if(index>this.letter.length-1){
        //         index=this.letter.length-1;
        //     }
        //     console.log(this.letter[index]);
        //      this.changeLetter(this.letter[index])
        // }
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_letter.scss";
</style>
 

