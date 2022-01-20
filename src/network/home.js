import { request } from "./request";

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()

//把一个数组的数据添加加到另外一个数组里面
// let totalNums = []

// const nums1 = [20, 11, 222]
// const num2 = [111, 22, 33]

// //方法一:
// for (let n of nums1) {
//     totalNums.push(n)
// }

// //方法二:
// totalNums.push(...nums1)