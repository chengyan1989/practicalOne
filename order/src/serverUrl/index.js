/*
 **  数据请求接口地址
 */

//获取首页热门地址
export let hotCity = () => {
    return fetch("https://www.easy-mock.com/mock/5b07e9e47bebfe1c7e53d33e/example_copy/hotcity")
};
//获取所有城市列表
export let allCity = () => {
    return fetch('https://elm.cangdu.org/v1/cities?type=group')
}