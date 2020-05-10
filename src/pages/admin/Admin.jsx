import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import memoryUtils from "./../../utils/memoryUtils.js";
import { Layout } from "antd";
import Header from "./../../components/header/Header";
import LeftNav from "../../components/left-nav/LeftNav";

import Home from "./../home/Home";
import Category from "./../category/Category";
import Product from "./../product/Product";
import Role from "./../role/Role";
import User from "./../user/User";
import Bar from "./../charts/Bar";
import Line from "./../charts/Line";
import Pie from "./../charts/Pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends React.Component {
  render() {
    const user = memoryUtils.user;
    // 如果内存中没有保存 user，说明当前没有登录，所以自动在跳转到 登录页面去
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      //
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:20,backgroundColor:"#fff"}}>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#ccc" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
