import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Table, Input, Button, Icon, Modal, notification} from 'antd';
import Highlighter from 'react-highlight-words';
import { getProduct, deleteProduct } from '../../public/redux/actions/product';
import { getCategory } from '../../public/redux/actions/category';
import './Style.css';

import AddProduct from '../page/AddProduct';
import EditProduct from '../page/EditProduct';

const { Content } = Layout;
const { confirm } = Modal;

const ProductLayout = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const dispatch = useDispatch();

  const { productState, categoryList } = useSelector(state => ({
    productState : state.product,
    categoryList : state.category.categoryList
  }));
  const { productList, isLoading } = productState;

  const fetchDataProduct = async () => {
    await dispatch(getProduct())
    .then(() => {})
    .catch(error => {
        console.log(error);
    })
  }  
  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDataProduct()
      dispatch(getCategory());
    }, 0);

    return () => clearTimeout(timeOut);
  }, []);

  const indexColumns = searchedColumn.input;
  const indexSearchText = searchText.searchText;

  const handleDelete = async (record) =>{
    const deleteProductId = await dispatch(deleteProduct(record.id));
    const name_product = deleteProductId.value.data.response.name_product;

      if (deleteProductId.value.data.status === 'success') {
        notification.success({
          message: "Data Berhasil dihapus",
          description: `Berhasil menghapus produk ${name_product}.`
        });
      } else {
        notification.error({
          message: "Gagal menghapus produk",
          description: `Maaf produk ${name_product} tidak dapat dihapus.`
        });
      }
  }
  const deleteConfirm = (record) => {
    confirm({
      title: `Apakah kamu ingin menghapus produk ${record.name_product}?`,
      okText: 'Iya',
      okType: 'danger',
      cancelText: 'Tidak',
      onOk() {
        handleDelete(record)
      },
      onCancel() {},
    });
  }

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
        render: (id, record) =>
          <span>
            <EditProduct dataProduct={record} dataCategory={categoryList}/>
            <Button 
            type="danger" 
            size="small" 
            icon="delete" 
            onClick={()=>deleteConfirm(record)}
            ghost/>
          </span>
      },
    ];
    return (
      <Layout>
        <Content className="gutter-example" style={{background: 'white'}}>
          <AddProduct data={categoryList}/>
          <Table 
            rowKey={record => record.id}
            columns={columns}
            loading={isLoading}
            dataSource={productList}
            size={"small"} 
          />
        </Content>
      </Layout>
    )
}

export default ProductLayout;