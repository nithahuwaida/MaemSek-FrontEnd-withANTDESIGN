import React from 'react';
import { Layout} from 'antd';

const { Content } = Layout;

class CartLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Content>
          Content Cart
        </Content>
      </Layout>
    );
  }
}

export default CartLayout;