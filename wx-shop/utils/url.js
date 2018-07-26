//获取地址列表
export let getAdd = () => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://www.easy-mock.com/mock/5b56d877008bc8159f336325/getmusic_copy/getmusic',
            success: (res) => {
                resolve(res.data);
            },
            fail: (error) => {
                reject(error);
            }
        })
    })
}