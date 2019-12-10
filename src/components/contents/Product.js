import React from 'react';
import { Layout} from 'antd';

const { Content } = Layout;

class ProductLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Content>
          Content Product
        </Content>
      </Layout>
    );
  }
}

export default ProductLayout;