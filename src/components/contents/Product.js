import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Table, Input, Button, Icon, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import { getProduct } from '../../public/redux/actions/product';
import './Style.css';

const { Content } = Layout;
const { confirm } = Modal;

const ProductLayout = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const dispatch = useDispatch();
  const { dataProducts } = useSelector( state=>({
    dataProducts : state.product.productList
  }));
  // const { productList } = dataProducts;

  useEffect(() => {
    async function fetchDataProduct() {
      await dispatch(getProduct())
    }  
    fetchDataProduct()
  },[]);

  const indexColumns = searchedColumn.input;
  const indexSearchText = searchText.searchText;

  const deleteConfirm = () => {
    confirm({
      title: 'Do you want to delete these items?',
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={node => {
          //   searchInput = node;
          // }}
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
          Search
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
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => searchInput.select());
    //   }
    // },
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

    const columns = [
      {
        title: 'Foto Produk',
        dataIndex: 'image_product',
        key: 'image_product',
        render: (text, record) => (
          <img src={text} className='imageProduct-list' alt={record.name_product}/>
        ),
      },
      {
        title: 'Nama Produk',
        dataIndex: 'name_product',
        key: 'name_product',
        ...getColumnSearchProps('name_product'),
      },
      {
        title: 'Deskripsi',
        dataIndex: 'desc_product',
        key: 'desc_product',
        ...getColumnSearchProps('desc_product'),
      },
      {
        title: 'Kategori',
        dataIndex: 'category.name_category',
        key: 'category.name_category',
        ...getColumnSearchProps('category.name_category'),
      },
      {
        title: 'Harga',
        dataIndex: 'price_product',
        key: 'price_product',
        ...getColumnSearchProps('price_product'),
      },
      {
        title: 'Stok',
        dataIndex: 'quantity_product',
        key: 'quantity_product',
        ...getColumnSearchProps('quantity_product'),
      },
      {
        title: 'Action',
        dataIndex: "id",
        key: 'action',
        render: () =>
          <span>
            <Button type="primary" size="small" icon="edit" style={{marginRight:2}} ghost/>
            <Button type="danger" size="small" icon="delete" onClick={deleteConfirm} ghost/>
          </span>
      },
    ];
    return (
      <Layout>
        <Content className="gutter-example" style={{background: 'white'}}>
          <Button className='add-product' type='primary' icon="plus" >  Tambah Product</Button>
          <Table 
            rowKey={record => record.id}
            columns={columns} 
            dataSource={dataProducts}
            size={"small"} 
          />
        </Content>
      </Layout>
    )
}

export default ProductLayout;