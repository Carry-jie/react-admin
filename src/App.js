// 应用的根组件
import React, {
  Component
} from "react";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

export default class App extends Component {
  render() {
    return (
    <BrowserRouter>
      {/* 只匹配其中一个路由组件 */}
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
    )
  }
}