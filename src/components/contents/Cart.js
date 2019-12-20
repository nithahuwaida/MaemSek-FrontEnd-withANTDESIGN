import React, { useEffect, useState} from 'react';
import { Layout, Row, Col, Card, Avatar, Icon, Typography,
         Button, Divider, Input, Result} from 'antd';
import './Style.css'
import cartPlus from '../../image/shopping-cart-2.svg';
import cart from '../../image/cart-1.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../public/redux/actions/product';

const { Content } = Layout;
const { Meta } = Card;
const { Text } = Typography;
const ButtonGroup = Button.Group;

const CartLayout = () => {
  const initialFromState = {
    search : ""
  }
  const [input, setInput] = useState(initialFromState);
  const dispatch = useDispatch();
  
  const fetchDataProduct = async () => {
    await dispatch(getProduct())
    .then(res => {
        console.log('berhasil');
    }).catch(error => {
        console.log(error);
    })
  }  
  useEffect(() => {
    fetchDataProduct()
  },[])

  const { dataProduct } = useSelector(state => ({
    dataProduct : state.product.productList
  }));
  const handleSearch = name_product => event => {
    setInput({ 
      ...input,
      [name_product] : event.target.value
    });
  };
  
  let searchProduct = dataProduct.filter((item) => {
    // console.log('item', item)
    console.log('item2 -1', item.name_product.toLowerCase().indexOf(input.search.toLowerCase()) !== -1)
    const checkStatus = item.name_product.toLowerCase().indexOf(input.search.toLowerCase()) !== -1;
    console.log(checkStatus)
    if(checkStatus === true){
      return (
        item.name_product.toLowerCase().indexOf(input.search.toLowerCase()) !== -1
        )
    }else{
      return 0
    }
  })
    return (
      <Layout>
        <Content className="gutter-example" style={{background: 'white'}}>
          <Row gutter={[16, 16]} >
            <Col xs={16}>
              <div className='cart'>
                <Input
                  placeholder={`Cari nama Produk...`}
                  value={input.search}
                  onChange={handleSearch("search")}
                  className= 'search'
                />
              </div>
              { searchProduct !== 0 ? (searchProduct.map ((item, index)=> {
                console.log('searchProduct', searchProduct.length)
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
              }))
              : (
                console.log('searchProduct', searchProduct.length),
                <Result
                  status="404"
                  title="Gagal"
                  subTitle="Maaf, Data yang dicari tidak ditemukan"
                  // extra={<Button type="primary">Back Home</Button>}
                />
              )}
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
                          <Avatar size={70} src="https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg" />
                        }
                        title="Nasi Ayam Rica-Rica"
                        description={
                          <div>
                            <span> 1pcs x 15.000 = 15.000</span>
                            <ButtonGroup className='button-group-product'>
                              <Button size="small"><Icon type="minus" key="minus" title='Kurang'/></Button>
                              <Button size="small" className='button-qty'>
                                <span className='text-qty'> 1 </span>
                              </Button>
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

export default (CartLayout);