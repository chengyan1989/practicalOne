//获取首页数据，轮播，本周，人气，列表
export let getData = () => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://mock.jasonandjay.com/mock/5b600fe57a32f77e39e46b1a/example/myshop',
            success: (res) => {
                resolve(res.data);
            },
            fail: (error) => {
                reject(error);
            }
        })
    })
}
//获取本周，人气详情数据
export let getTitData=()=>{
    return new Promise((resolve,reject)=>{
        wx.request({
            url: `https://mock.jasonandjay.com/mock/5b600fe57a32f77e39e46b1a/example/weekHot`,
            success:(res)=>{
                resolve(res.data);
            },fail:(error)=>{
                reject(error);
            }
        })
    })
}