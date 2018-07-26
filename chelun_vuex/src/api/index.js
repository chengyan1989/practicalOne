//汽车品牌数据请求
export const getcarData = () => {
    return fetch("https://baojia.chelun.com/v2-car-getMasterBrandList.html")
};
//汽车列表点击请求右侧信息数据
export const carListclick = (id) => {
    return fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=' + id)
};
//汽车列表详情页请求数据
export const carDetail = (id) => {
    return fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" + id)
};
//汽车列表详情页面地址定位和询问价格请求数据
export const carquotationadd = () => {
    return fetch("https://baojia.chelun.com/location-client.html?")
}
export const carquotation = (id, addid) => {
    return fetch("https://baojia.chelun.com/v2-dealer-alllist.html?carId=" + id + "&cityId=" + addid)
};
//图片数据
export const getpic = (id) => {
    return fetch("https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" + id)
};
//图片详情所有图片数据
export const imgDetail = (picid, imgid, pageid) => {
    return fetch("https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=" + picid + "&ImageID=" + imgid + "&Page=" + pageid + "&PageSize=30&_1531054352382")
}