import React, { useEffect } from 'react';
import { Layout, Row, Col, Card, Avatar, Icon, Typography,
         Button, Divider, Input} from 'antd';
import './Style.css'
import cartPlus from '../../image/shopping-cart-2.svg';
import cart from '../../image/cart-1.svg';
import { connect } from 'react-redux';
import { getProduct } from '../../public/redux/actions/product';

const { Content } = Layout;
const { Meta } = Card;
const { Text } = Typography;
const { Search } = Input;
const ButtonGroup = Button.Group;

const CartLayout = (props) => {
    useEffect(() =>{
      props.dispatch(getProduct())
    },[])

    return (
      <Layout>
        <Content className="gutter-example" style={{background: 'white'}}>
          <Row gutter={[16, 16]} >
            <Col xs={16}>
              <div className='cart'>
                <Search
                  className="search"
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                />
              </div>
              {props.dataProducts.map ((item, index)=> {
                return(
                  <Col key={index} className="gutter-row" xs={8}>
                    <Card
                      style={{display:'inline-block'}} 
                      cover={
                        <img
                          alt="image-product"
                          src= {item.image_product}
                        />
                      }
                      actions={[
                        <span style={{color: 'black'}}>Stok : {item.quantity_product}pcs </span>,
                        <Avatar style={{cursor: 'pointer'}} shape="square" src={cartPlus} title='Tambah ke keranjang' />
                      ]}
                    >
                      <Meta
                        title= {item.name_product}
                        description= {item.desc_product}
                      />
                      <br/><span><b> Rp. {item.price_product}</b></span>
                    </Card>
                  </Col>
                );
              })}
            </Col>
            <Col xs={8}>
              <Card
                actions={[
                  <span style={{color: 'black'}}>Total  :  </span>,
                ]}
              >
                <div className='cart'>
                  <Avatar size='large' src={cart} style={{marginRight: '5px'}}/>
                  <Text size={12}><b> Kerajang Belanjaan </b></Text>
                </div>
                <Divider style={{margin:'7px'}}/>
                <Row gutter={[16, 16]} >
                  <Col xs={24}>
                    <Card style={{ width: 300, border: 0, padding: 0}}>
                      <Meta
                        avatar={
                          <Avatar src="https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg" />
                        }
                        title="Nasi Ayam Rica-Rica"
                        description={
                          <div>
                            <span> 1pcs x 15.000 = 15.000</span>
                            <ButtonGroup style={{marginTop: '5px'}}>
                              <Button size="small"><Icon type="minus" key="minus" title='Kurang'/></Button>
                              <Button size="small"><span style={{color: 'black'}}> 1 </span></Button>
                              <Button size="small"><Icon type="plus" key="plus" title='Tambah'/></Button>
                            </ButtonGroup>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

const mapStateToProps = state => {
  return {
    dataProducts : state.product.productList
  }
}
export default connect(mapStateToProps)(CartLayout);