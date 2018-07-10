import { getProductList } from "../../api/index.js"; //购物车列表数据请求地址
const state = {
    list: [],
    priceAll: 0,
    ischeckedAll: false
}
const mutations = {
    //渲染所有数据
    upListData: (state, { list }) => {
        state.list = list
    },
    //改变商品数量，加加，减减
    changeNum: (state, { ind, type }) => {
        state.list.forEach((item, index) => {
            if (ind == index) {
                if (type == "+") {
                    item.count++;
                } else {
                    if (item.count == 0) {
                        return
                    }
                    item.count--;
                }
            }
        })
    },
    //改变每个商品的单选框
    checkedItem: (state, { ind }) => {
        state.list.forEach((item, index) => {
            if (ind == index) {
                item.checked = !item.checked;
            }
        })
    },
    //计算总价
    totalPic: (state) => {
        let price = 0;
        state.list.forEach((item, index) => {
            if (item.checked == true && item.count > 0) {
                console.log(item);
                price += item.pic * item.count
            }
        })
        state.priceAll = price;

    },
    checkedAll: (state) => {
        state.ischeckedAll = !state.ischeckedAll
        state.list.forEach(item => {
            item.checked = state.ischeckedAll
        })
    }
}
const actions = {
    //请求数据
    getProductList(context) {
        getProductList().then(res => {
            res.json().then(body => {
                body.data.list.forEach((item, index) => {
                    item.count = 0;
                    item.checked = false;
                })
                context.commit("upListData", { list: body.data.list });
                context.commit("totalPic");
            })
        })
    },
    //加加，减减,计算总价
    changeNum(context, payload) {
        context.commit("changeNum", payload);
        context.commit("totalPic");
    },
    //每个商品的单选框
    checkedItem(context, payload) {
        context.commit("checkedItem", payload);
        context.commit("totalPic");
    },
    //全选
    checkedAll(context) {
        context.commit("checkedAll");
        context.commit("totalPic");
    }

}
export default {
    state,
    mutations,
    actions
}