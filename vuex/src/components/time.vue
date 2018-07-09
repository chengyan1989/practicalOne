<template>
    <div>
        <div>{{time}}</div>
        <button @click="uptime">修改时间</button>
    </div>
    
</template>
<script>
export default {
    computed: {
       time(){
           return this.$store.state.time.time
       } 
    },
    methods: {
        uptime(){ 
        //    this.$store.commit({//触发同步的
        //        type:"upTime",
        //        time:"今天"
        //    })
         this.$store.dispatch({
                type: 'upTime',
                time: new Date().toString()
            })
        },
        
    }
}
</script>