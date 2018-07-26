export let getMusicList=()=>{
    return new Promise((resolve,reject)=>{
    wx.request({
        url: 'https://www.easy-mock.com/mock/5b07e9e47bebfe1c7e53d33e/example_copy/music',
        success: (res) => {
            resolve(res.data);
        },
        fail: (error) => {
            reject(error);
        }
    })
    })
}