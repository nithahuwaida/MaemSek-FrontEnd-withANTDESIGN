import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Typography, Input } from 'antd';
import { getUserEmail } from '../helpers/Helpers';
import './Home.css';

import CartLayout from '../contents/Cart';
import ProductLayout from '../contents/Product';

const { Header, Sider, Content} = Layout;
const { Search } = Input;
const { Text } = Typography;
const { SubMenu} = Menu;

// function handleMenuClick(e) {
//   message.info('Click on menu item.');
//   console.log('click', e);
// }

const menu = (
  // <Menu onClick={handleMenuClick}>
  <Menu>
    <Menu.Item key="1">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
);

class SiderLayout extends React.Component {
  state = {
    collapsed: false,
  };
  // onCollapse = (collapsed) => {
  //   this.setState({ collapsed });
  // }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        
        <Layout className='layout-sider'>
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={this.state.collapsed}
            // onCollapse ={this.onCollapse}
            >
            <div className="div-logo">
              {/* <img scr={Logo} alt="logo"/> */}
              {/* <Icon type="line-chart" /> */}
              {/* <span>MaemSek</span> */}
            </div>
            <Menu 
              theme="dark" 
              mode="inline" 
              defaultSelectedKeys={['2']}
              defaultOpenKeys={['sub1']}>
              <Menu.Item key="1">
                <Icon type="line-chart" />
                <span>Dasboard</span>
                <Link to='/dasboard'/>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="shopping-cart" />
                <span>Cart</span>
                <Link to='/'/>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="database" />
                    <span>Master Data</span>
                  </span>
                }
              >
                <Menu.Item key="4">
                  <Icon type="inbox" />
                  <span>Product</span>
                  <Link to='/product'/>
                </Menu.Item>
                <Menu.Item key="5">
                  <Icon type="gold" />
                  <span>Category</span>
                  <Link to='/category'/>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="6">
                <Icon type="setting" />
                <span>Setting</span>
                <Link to='/setting'/>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div className='div-left'>
                <Icon
                  className="trigger-left"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </div>
              <div className='div-right'>
                <div className='div-left2'>
                  <Search
                  className="search"
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                />
                </div>
                <div className='div-right2'>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <div className="trigger-right">
                      <Icon type='user'/>
                      <Text> {getUserEmail()}</Text>
                    </div>
                  </Dropdown>
                </div>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Route exact path="/" component={CartLayout} />
              <Route path="/product" component={ProductLayout} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default SiderLayout;