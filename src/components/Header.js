import React from 'react';
import { Menu, Icon } from 'antd';

function Header () {
    return (
      <Menu
        mode="horizontal"
      >
        <Menu.Item key="home">
          <a href="/">
            <Icon type="home" />Home
          </a>
        </Menu.Item>
        <Menu.Item key="user">
          <a href="#users">
            <Icon type="user" />Users
          </a>
        </Menu.Item>
        <Menu.Item key="post">
          <a href="#posts">
            <Icon type="form" />Posts
          </a>
        </Menu.Item>
        <Menu.Item key="album">
          <a href="#albums">
            <Icon type="book" />Albums
          </a>
        </Menu.Item>
      </Menu>
    );
}

export default Header;