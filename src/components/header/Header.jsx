/**
 * 头部的组件
 */

import React, { Component } from "react";
import "./Header.less";
export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
					<span>欢迎，admin</span>
					<a href="javascript:">退出</a>
				</div>
				<div className="header-bottom"></div>
      </div>
    );
  }
}
