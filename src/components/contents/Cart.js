import React, { useEffect, useState} from 'react';
import { Layout, Row, Col, Card, Avatar, Typography, Icon, notification,
         Button, Divider, Input, Result, Select, InputNumber} from 'antd';
import NumberFormat from 'react-number-format';
import './Style.css'
import cartPlus from '../../image/shopping-cart-2.svg';
import cart from '../../image/cart-1.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../helpers/Helpers';
import { addItemInOrder, removeItemInOrder, getProductInOrder,
         quantityChange, checkoutOrder} from '../../public/redux/actions/order';

const { Content } = Layout;
const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

const CartLayout = () => {
  const initialFromState = {
    search : "",
    sort : "",
  }
  const [input, setInput] = useState(initialFromState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { detailOrder, productListCart, total_price} = useSelector(
    state => state.order
  );

  const fetchDataProduct = async () => {
    await dispatch(getProductInOrder())
    .then(() => {})
    .catch(error => {
      console.log(error);
    })
  }  
  useEffect(() => {
    fetchDataProduct()
  },[])
  
  const handleChange = name => event => {
    setInput({ 
      ...input,
      [name]: typeof event != "string" ? event.target.value : event,
    });
  };
  
  let sortedProduct = productListCart.sort((a, b) => {
    const isReversed = (input.sort === 'desc') ? 1 : -1;
    return isReversed * a.name_product.localeCompare(b.name_product);
  });

  let searchProduct = sortedProduct.filter((item) => {
    const checkStatus = item.name_product.toLowerCase().indexOf(input.search.toLowerCase()) !== -1;
    if(checkStatus === true){
      return (
        item.name_product.toLowerCase().indexOf(input.search.toLowerCase()) !== -1
        )
    }else{
      return 0
    }
  })

  const handleSelectedProduct = async product => {
    if (!product.isselected){await dispatch(addItemInOrder(product));}
    else {await dispatch(removeItemInOrder(product));}
  };
  const handleQuantityChange = id => async value => {
    await dispatch(quantityChange({ id, order_qty: value }));
  };

  const submitCheckoutOrder = async () => {
    const user_id = getUserId();
    setLoading(true)
    const submitCheckoutOrder = await dispatch(checkoutOrder({
        user_id: user_id,
        total_price: total_price,
        detail_order: detailOrder
      })
    ).then(submitCheckoutOrder =>{
      setLoading(false)
      if (submitCheckoutOrder.value.data.status === 'success') {
        notification.success({
          message: "Berhasil",
          description: `Transaksi Berhasil`
        });
      } else {
        notification.error({
          message: "Gagal",
          description: `Transaksi gagal, Silakan coba lagi.`
        });
      }
    }).catch((error) =>{
      setLoading(false)
      notification.error({
        message: "Gagal",
        description: `Transaksi gagal, Silakan coba lagi.`
      });
    })
  };

    return (
      <Layout>
        <Content className="gutter-example" style={{background: 'white'}}>
          <Row gutter={[16, 16]} >
            <Col xs={16}>
              <div className='cart'>
                <Icon type='search' className='icon-search'/>
                <Input
                  placeholder={`Cari nama produk...`}
                  value={input.search}
                  onChange={handleChange("search")}
                  className= 'search'
                />
                <span className='text-sort'>Sort By</span>
                <Select 
                  className='select-sort'
                  defaultValue='Urutkan nama produk..'
                  onChange={handleChange("sort")}>
                  <Option value="asc">nama produk (A-Z)</Option>
                  <Option value="desc">nama produk (Z-A)</Option>
                </Select>
              </div>
              { searchProduct.length !== 0 ? (searchProduct.map ((item, index)=> {
                return(
                  <Col key={index} className="gutter-row" xs={8}>
                    <Card
                      style={{display:'inline-block'}} 
                      cover={
                        <img
                          src= {item.image_product}
                          alt={item.name_product}
                        />
                      }
                      actions =
                      { item.quantity_product !== 0 ?
                        item.isselected === false ? 
                            [
                              <span style={{color: 'black'}}>Stok : {item.quantity_product} pcs </span>,
                              <Avatar 
                                onClick={() => handleSelectedProduct(item)}
                                style={{cursor: 'pointer'}}
                                className='add-cart'
                                shape="square" 
                                src={cartPlus} 
                                title='Tambah ke keranjang' />
                            ]
                      :
                      [
                        <span style={{color: 'black'}}>Stok : {item.quantity_product} pcs </span>,
                        <Icon style={{fontSize:30}} type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                      ]
                      :
                      [
                        <span style={{color: 'black'}}>Stok : {item.quantity_product} pcs </span>,
                        <span style={{color: 'red'}}>Stok Habis</span>
                      ]
                    }
                    >
                      <Meta
                        title= {item.name_product}
                        description= {item.desc_product}
                        className='meta-card'
                      />
                      <NumberFormat
                        value={item.price_product}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp"}
                        className='number-format'
                      />
                    </Card>
                  </Col>
                );
              }))
              : (
                <Result
                  status="404"
                  title="Gagal"
                  subTitle="Maaf, Data tidak ditemukan"
                />
              )}
            </Col>
            <Col xs={8}>
              <Card
                actions={[
                  <span 
                    style={{
                      color: 'white',
                      width: '100%',
                      background: 'rgb(24, 144, 255)',
                      padding: '10px',
                      display: 'block',
                      fontSize: 'large',
                    }}>
                    Total  :    
                    <NumberFormat
                      value={total_price}
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      prefix={"Rp"}
                      className='number-format-cart'
                    />  
                  </span>,
                ]}
              >
                <div className='cart'>
                  <Avatar size='large' src={cart} style={{marginRight: '5px'}}/>
                  <Text size={12}><b> Kerajang Belanjaan </b></Text>
                </div>
                <Divider style={{margin:'7px'}}/>
                <Row gutter={[16, 16]} >
                  <Col xs={24}>
                  {detailOrder.length!== 0 ? 
                  detailOrder.map ((item, index)=> {
                    return(
                    <Card key={index} className='card-cart' style={{border: 0, padding: 0, height:110}}>
                      <Button 
                        type='primary' 
                        shape='circle'
                        size='small'
                        icon='close'
                        title='cancel'
                        onClick={async () => await dispatch(removeItemInOrder(item))}
                        style={{float:'right'}}/>
                      <Meta
                        avatar={
                          <Avatar size={50} src={item.product_image} />
                        }
                        title={item.product_name}
                        description={
                          <div>
                              <InputNumber
                                min={1}
                                max={item.oldQuantity}
                                value={item.order_qty}
                                className='quantity-input'
                                onChange={handleQuantityChange(item.product_id)}
                              />
                              <span>pcs x {item.price_product} = {item.sub_total}</span>
                          </div>
                        }
                      />
                    </Card>
                  )})
                  : null
                }
                  </Col>
                </Row>
              </Card>
              {detailOrder.length!== 0 &&
                <Button 
                  className='button-checkout'
                  onClick={submitCheckoutOrder}
                  loading={loading}
                >
                  TRANSAKSI SELESAI
                </Button>
              }
            </Col>
          </Row>
        </Content>
      </Layout>
    );
}

export default (CartLayout);