/**
 * 左侧导航的组件
 */

import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import './LeftNav.less'
import logo from './../../assets/images/logo.jpg'
import menuList from './../../config/menuConfig.js'
const { SubMenu } = Menu



class LeftNav extends Component {

  /* 根据 menu 的数据数组生成对应的标签数组，使用 map 和 reduce 俩个方法都可以实现*/
  // 使用 map 和 递归调用
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const path = this.props.location.pathname
        // 查找一个与当前请求路径匹配的子item
        const cItem = item.children.find(cItem => cItem.key === path)
        // 如果存在，说明当前item的子列表需要打开
        if(cItem) {
          this.openKey = item.key
        }
        

        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  // 使用 reduce 和 递归调用
  // getMenuNodes = (menuList) => {
  //   return menuList.reduce((pre, item) => {
  //     // 向 pre 中添加 <Menu.Item>
  //     if (!item.children) {
  //       pre.push((
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       ))
  //     } else {
  //       // 向 pre 中添加 <SubMenu>
  //       pre.push((
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes(item.children)}
  //         </SubMenu>
  //       ))
  //     }
  //     return pre
  //   }, [])
  // }

  // 这个生命周期在第一次 render() 之前执行一次，为第一个 render() 准备数据(必须是同步的，异步没有任何意义)
  componentWillMount() {
    this.getMenuNodes(menuList)
  }

  render() {
    // 在这里执行这个函数也是可以的，但是每次数据更新就会刷新 render 函数，为了优化性能，不能写在这里
    // this.getMenuNodes(menuList)

    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    
    // 得到需要打开菜单项的key，但是这里是没法直接拿到的，因为这个 openKey 是在执行 getMenuNodes 函数中保存的，所以要拿 openKey 的时候先要执行一下 getMenuNodes 函数，所以在 componentWillMount 生命周期里面先执行一下 getMenuNodes 函数
    const openKey = this.openKey
    
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="" />
          <h1>无敌后台</h1>
        </Link>

        <Menu
          defaultOpenKeys={[openKey]}
          selectedKeys={[path]}
          mode="inline"
          theme="dark"
        > 
          {/* 通过数据的方式渲染左侧导航栏 */}
          {
            this.getMenuNodes(menuList)
          }

          {/* 通过这样的方式也可以，但是这样显得就有点乱了，所以把下面这些代码封装到一个函数里面，通过函数来返回就好了，如上面的 this.getMenuNodes(menuList) */}
          {/* {
            menuList.map(item => {
              if (!item.children) {
                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.key}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
              } else {
                return (
                  <SubMenu
                    key={item.key}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </span>
                    }
                  >
                    {this.getMenuNodes(item.children)}
                  </SubMenu>
                )
              }
            })
          } */}


          {/* 这样写也可以，但不是很好，因为写死了，以后如果还有后续功能添加就不是很好添加了，所以这里可以用到循环遍历，把里面需要的数据写成一个数组，然后循环遍历即可，这样当后续添加功能的时候，这里就不用了修改了，直接修改数据就可以了 */}
          {/* <Menu.Item key="/home">
            <Link to="/home">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
              <Link to="/category">
                <Icon type="mail" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/product">
              <Link to="/product">
                <Icon type="mail" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user">
            <Link to="/user">
              <Icon type="pie-chart" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/role">
            <Link to="/role">
              <Icon type="pie-chart" />
              <span>角色管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/charts"
            title={
              <span>
                <Icon type="mail" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="/charts/bar">
              <Link to="/charts/bar">
                <Icon type="mail" />
                <span>柱状图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/charts/line">
              <Link to="/charts/line">
                <Icon type="mail" />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/charts/pie">
              <Link to="/charts/pie">
                <Icon type="mail" />
                <span>饼图</span>
              </Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}


export default withRouter(LeftNav)