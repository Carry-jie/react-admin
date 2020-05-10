import React, { Component } from "react";
import "./login.less";
import logo from "./../../assets/images/logo.jpg";
import { Form, Icon, Input, Button, message } from "antd";

import { reqLogin } from './../../api/index'
import memoryUtils from './../../utils/memoryUtils.js'
import storageUtil from './../../utils/storageUtil.js'
import { Redirect } from "react-router-dom";

// 可以先将 From.Item 取出来，然后 Antd 中的 标签  <Form.Item> 就可以写成 <Item> 了
// const Item = Form.Item // 注意 const Item = From.item 不能写在 import 之前

class Login extends Component {

  handleSubmit = (e) => {
    // 阻止事件的默认行为
    e.preventDefault()
    // 得到 form 对象
    const { form } = this.props
    // validateFields 对所有表单字段进行校验
    form.validateFields(async (err, values) => {
      if (!err) { // 如果没有错误就是校验成功了
        // 登录请求
        const {username, password} = values

        // 因为每一次调用接口请求函数都有可能出错，所以每一次在调用接口函数的时候都需要有一个 catch 来捕获请求函数出错，这样写有点繁琐，所以在 ajax 统一来处理这个错误
        // try {  // 这个捕获错误的信息在 ajax 中已经处理掉了，所以这里就可以不用写了
        let result = await reqLogin(username, password)
        if(result.status === 0) { // 登录成功
          // 提示登录成功
          message.success("登录成功")

          // 因为登录成功以后，user 要在管理页面显示，所以把 user 保存到内存中
          const user = result.data
          memoryUtils.user = user

          // 因为保存到内存中，一刷新页面数据就不存在了，所以需要保存到 localStorage 中
          storageUtil.saveUser(user)

          // 跳转到管理界面，因为登录页面跳转到管理界面的时候就不需要再回退到登录页面了，所以用 replace，而不是 push
          // this.props.history.push('/')
          this.props.history.replace('/')
        } else { // 登录失败 
          // 提示错误信息
          message.error(result.msg)
        }
        // } catch(error) { // 这个捕获错误的信息在 ajax 中已经处理掉了
        //   alert('请求出错了:'+error.message)
        // } 
      } else {
        console.log('校验失败!!!')
      }
    })

  }


  // 对密码自定义验证
  validatorPwd = (rule, value, callback) => {
    // callback() // 函数里面什么都不传递，表示验证通过
    // callback('xxx') // 函数里面传递参数，表示验证失败，参数就是指定要提示的文本
    if (!value) {
      callback("密码必须输入")
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.text(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }

  }

  render() {

    // 如果用户登录了，是不允许通过浏览器的 url地址去跳转到 登录页面的，所以在这个登录页面 DOM 元素渲染之前，判断内存中是否有 user，因为只要是用户登录了就会将 user 保存到内存和localStorage中，就算刷新页面，内存中的user不存在了，但是在入口 index文件中也会将 localStorage 保存的user保存到内存中，意思只要用户登录了，内存中就一定有 user，所以直接判断是否有user就可以来判断用户是否登录了
    const user = memoryUtils.user
    if(user && user._id){
      return <Redirect to='/'/>
    }


    // 得到具有强大功能的 form 对象
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <header className="login-header">
          {/* 在react中，img 标签中的 src 属性不能直接引入图片，不支持这种语法 */}
          {/* <img src="./image/logo.png"/> */}
          {/* 正确语法是先通过 ES6 中的 import 加载对应的图片，然后动态绑定到 img 标签上*/}
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className="login-content">
          <h2>用户登录</h2>
          {/* onSubmit 事件会在表单中的确认按钮被点击时触发 */}
          <Form onSubmit={this.handleSubmit} className="login-form">

            {/* 用户名 */}
            <Form.Item>
              {/* getFieldDecorator('标识符'，{配置对象})(要被包装的组件) 是一个高阶函数，第一个参数是 标识名称，第二个参数是配置对象，可以不写 */}
              {getFieldDecorator('username', { // 配置对象
                // 这种验证的方式称为声明式验证：直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true, whitespace: true, message: '用户名必须输入' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ],
              })(
                // prefix属性 是用来设置 Input 前面的前缀图标，值可以是一个组件名称
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
              ,
            </Form.Item>

            {/* 密码 */}
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    // 使用 validator 就可以自定义验证了
                    validator: this.validatePwd
                  }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="密码"
                />
              )}

              ,
            </Form.Item>

            {/* 登录 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

/**
 * Form.create() 返回的是一个函数，这个函数接收一个组件
 * Form.create()(Login) 返回的是一个新的组件
 */

/**
 * 包装 Form 组件生成一个新的组件:Form(Login) ---> 这是组件名称 
 * 新组建会向 Form 组件传递一个强大的对象: form
 */
const WrapLogin = Form.create()(Login) // 只要对 Login 组件进行一下包装，Login组件里面获取到 form 对象了
export default WrapLogin
/**
 * 1. 前台表单验证
 * 2. 收集表单输入数据
 */