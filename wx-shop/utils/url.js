//获取地址列表
export let getAdd = () => {
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