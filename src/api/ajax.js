/**
 * 能发送异步 ajax 请求的函数模块
 * 封装 axios 库
 * 函数的返回值是 promise 对象 
 * 
 * 优化：统一处理请求异常？
 *    在外层包一个自己创建的 promise 对象
 *    在请求出错时，不去 reject(error)，而是显示错误提示
 */
import {message} from 'antd'
import axios from 'axios'


export default function ajax(url,data={},type="GET") {
  return new Promise((resolve,response) => {
    let promise
    // 1. 执行异步 ajax 请求
    if(type==="GET") {
      promise = axios.get(url,{
        params:data
      }) 
    } else {
      promise = axios.post(url,data)
    }

    // 2. 如果成功了，调用 resolve(value)
    promise.then(response => {
      resolve(response.data)
    }).catch(error => { // 3. 如果失败了，不能调用reject(response)，而是提示异常信息
      // reject(response) // 如果调用 reject(response)，那么外面又得使用 try catch 来捕获异常，所以这里不能调用
      message.error('请求出错了:' + error)
    })  
  })
  // if(type==="GET") {
  //   return axios.get(url,{
  //     params:data
  //   }) 
  // } else {
  //   return axios.post(url,data)
  // }
}