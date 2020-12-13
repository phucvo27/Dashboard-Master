import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

const { SubMenu } = Menu;
const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
    >
      <Menu.Item key="home" icon={<FeatherIcon icon="home" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>
      <SubMenu key="product" icon={!topMenu && <FeatherIcon icon="target" />} title="Sản Phẩm">
        <Menu.Item key="view">
          <NavLink onClick={toggleCollapsed} to={`${path}/products`}>
            Sản Phẩm
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="category">
          <NavLink onClick={toggleCollapsed} to={`${path}/products/category`}>
            Category
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="orders" icon={<FeatherIcon icon="credit-card" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/orders`}>
          Đơn Hàng
        </NavLink>
      </Menu.Item>
      <SubMenu key="promotions" icon={!topMenu && <FeatherIcon icon="gift" />} title="Khuyến Mãi">
        <Menu.Item key="flashSale">
          <NavLink onClick={toggleCollapsed} to={`${path}/products`}>
            Flash Sale
          </NavLink>
        </Menu.Item>
        
        <Menu.Item key="coupon">
          <NavLink onClick={toggleCollapsed} to={`${path}/products/category`}>
            Coupon
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="chat" icon={<FeatherIcon icon="message-circle" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/chat/private`}>
          Chat
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
