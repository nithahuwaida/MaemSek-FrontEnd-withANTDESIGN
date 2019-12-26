import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Statistic, Row, Col, Icon, Layout, Table, Input, Button} from 'antd';
import Highlighter from 'react-highlight-words';
import { Chart } from 'primereact/components/chart/Chart';
import { getInformation } from '../../public/redux/actions/information';

const { Content } = Layout;

const DashboardLayout = () =>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const indexColumns = searchedColumn.input;
    const indexSearchText = searchText.searchText;
    const dispatch = useDispatch();
    const {infoList, isLoading, infoValueGrafik, infoLabelGrafik} = useSelector(state => state.info);

    const fetchInfo = async () => {
        await dispatch(getInformation())
        .then(() => {})
        .catch(error => {
            console.log(error);
        })
      }  
      useEffect(() => {
        const timeOut = setTimeout(() => {
            fetchInfo()
        }, 0);
    
        return () => clearTimeout(timeOut);
      }, []);
      
    const data = {
        labels: infoLabelGrafik,
        datasets: [
            {
                label: 'Data penjualan 2019',
                data: infoValueGrafik,
                fill: true,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            }
        ]   
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Cari
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        render: text =>
        indexColumns === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[indexSearchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
      });
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        const input= dataIndex;
        setSearchText({
          searchText: selectedKeys[0]
        });
        setSearchedColumn({
          input 
        });
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        setSearchText({ searchText: '' });
      };
    
      const columnsTransaction = [
        {
          title: 'No Transaksi',
          dataIndex: 'id_transaction',
          key: 'id_transaction',
          ...getColumnSearchProps('id_transaction'),
        },
        {
            title: 'Total Transaksi',
            dataIndex: 'total_transaction',
            key: 'total_transaction',
            ...getColumnSearchProps('total_transaction'),
        },
        {
            title: 'Admin',
            dataIndex: 'user.fullname',
            key: 'user.fullname',
            ...getColumnSearchProps('user.fullname'),
          },
      ];
      const columnsProduct = [
        {
          title: 'Nama Produk',
          dataIndex: 'product.name_product',
          key: 'product.name_product',
          ...getColumnSearchProps('product.name_product'),
      },
      {
          title: 'Jumlah Terjual',
          dataIndex: 'jumlah_terjual',
          key: 'jumlah_terjual',
          ...getColumnSearchProps('jumlah_terjual'),
        },
      ];

    return (
        <Layout>
            <Content className="gutter-example" style={{background: 'white'}}>
                <div style={{ background: '#ECECEC', padding: '10px' }}>
                    <Row >
                        <Col span={6} className='statistic-info' style={{backgroundColor:'#a9a9e2'}}>
                            <Statistic
                                title="Jumlah Transaksi"
                                value={infoList.dataTransactionCount}
                                valueStyle={{ color: 'white'}}
                                prefix={<Icon type="shopping-cart" />}
                                suffix="transaksi"
                            />
                        </Col>
                        <Col span={6} className='statistic-info' style={{backgroundColor:'#4de255'}}>
                            <Statistic
                                title="Produk"
                                value={infoList.dataProductCount}
                                valueStyle={{ color: 'white'}}
                                prefix={<Icon type="inbox" />}
                                suffix="jenis"
                            />
                        </Col>
                        <Col span={6} className='statistic-info' style={{backgroundColor:'#ead242'}}>
                            <Statistic
                                title="Kategori"
                                value={infoList.dataCategoryCount}
                                valueStyle={{ color: 'white'}}
                                prefix={<Icon type="gold" />}
                                suffix="jenis"
                            />
                        </Col>
                        <Col span={6} className='statistic-info' style={{backgroundColor:'#e08982'}}>
                            <Statistic
                                title="Admin"
                                value={infoList.dataUserCount}
                                valueStyle={{ color: 'white'}}
                                prefix={<Icon type="user" />}
                                suffix="orang"
                            />
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className="content-section implementation">
                        <h3 className='title-grafik'>Grafik Penjualan 2019</h3>
                        <Chart 
                          type="line" 
                          data={data}
                          className = 'chart'
                        />
                    </div>
                </div>
                <div>
                  <Row >
                    <Col span={12}>
                      <h3 style={{marginLeft:10}}>Data Transaksi</h3>
                      <Table 
                        style={{margin:10}}
                        rowKey={record => record.id}
                        columns={columnsTransaction}
                        dataSource={infoList.getTransactionAll}
                        loading={isLoading}
                        size={"small"}
                        />
                    </Col>
                    <Col span={12}>
                      <h3 style={{marginLeft:10}}>Data Produk Terlaris</h3>
                      <Table 
                        style={{margin:10}}
                        rowKey={record => record.product_id}
                        columns={columnsProduct}
                        dataSource={infoList.sumProduct}
                        loading={isLoading}
                        size={"small"}
                        />
                    </Col>
                  </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default DashboardLayout;        