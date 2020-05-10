// 入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import storageUtil from './utils/storageUtil'
import memoryUtils from './utils/memoryUtils'

// 刷新页面，为什么要在 index入口文件中将 localStorage 中的 user 保存到内存中？而不是别的页面？因为一刷新页面首先读取的就是入口文件
// 因为页面刷新的时候，在登录页面提交表单的时候，将保存到内存中的 user 就不存在了，所以要将保存到 localStorage 中的 user 在刷新的时候在保存到 内存中
const user = storageUtil.getUser()
memoryUtils.user = user


// 将 App 组件标签渲染到 index 页面上 id 为 root 的 div 上
ReactDOM.render(<App/>,document.getElementById("root"))