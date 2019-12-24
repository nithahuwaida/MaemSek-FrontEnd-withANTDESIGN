import React from 'react';
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown, Typography} from 'antd';
import { getUserEmail } from '../helpers/Helpers';
import './Home.css';

import DashboardLayout from '../contents/Dashboard';
import CartLayout from '../contents/Cart';
import ProductLayout from '../contents/Product';
import CategoryLayout from '../contents/Category';
import SettingLayout from '../contents/Setting';

const { Header, Sider, Content} = Layout;
const { Text } = Typography;
const { SubMenu} = Menu;

class SiderLayout extends React.Component {
  state = {
    collapsed: true,
  };
    
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.removeItem('token-jwt');
    localStorage.removeItem('user-email');
    localStorage.removeItem('user-id');
    this.props.history.push('/login')
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout}>
          <Icon type="logout"/>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Router>
        <Layout className='layout-sider'>
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={this.state.collapsed}
            >
            <div className="div-logo">
              {/* <img scr={Logo} alt="logo"/> */}
              {/* <Icon type="line-chart" /> */}
              {/* <span>MaemSek</span> */}
            </div>
            <Menu 
              theme="dark" 
              mode="inline" 
              // defaultSelectedKeys={['2']}
              // defaultOpenKeys={['sub1']}
              defaultOpenKeys={[this.props.location.pathname]}
              defaultSelectedKeys={[this.props.location.pathname]}
              >
              <Menu.Item key='/dashboard'>
                <Icon type="line-chart" />
                <span>Dashboard</span>
                <Link to='/dashboard'/>
              </Menu.Item>
              <Menu.Item key='/'>
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
                <Menu.Item key='/product'>
                  <Icon type="inbox" />
                  <span>Product</span>
                  <Link to='/product'/>
                </Menu.Item>
                <Menu.Item key='/category'>
                  <Icon type="gold" />
                  <span>Category</span>
                  <Link to='/category'/>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key='/setting'>
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
                  <Text className='title-home'>MaemSek</Text>
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
              <Route path="/dashboard" component={DashboardLayout} />
              <Route exact path="/" component={CartLayout} />
              <Route path="/product" component={ProductLayout} />
              <Route path="/category" component={CategoryLayout} />
              <Route path="/setting" component={SettingLayout} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(SiderLayout);