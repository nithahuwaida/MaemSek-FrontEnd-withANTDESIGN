import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Table, Input, Button, Icon, Modal, notification} from 'antd';
import Highlighter from 'react-highlight-words';
import { getCategory, deleteCategory } from '../../public/redux/actions/category';
import './Style.css';

import AddCategory from '../page/AddCategory';
import EditCategory from '../page/EditCategory';

const { Content } = Layout;
const { confirm } = Modal;

const CategoryLayout = () =>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const dispatch = useDispatch();
    const { categoryList, isLoading } = useSelector( 
      state => state.category
    ) 

    const fetchDataCategory = async () => {
        await dispatch(getCategory())
        .then(() => {})
        .catch(error => {
            console.log(error);
        })
      }  
      useEffect(() => {
        const timeOut = setTimeout(() => {
          fetchDataCategory()
        }, 0);
    
        return () => clearTimeout(timeOut);
      }, []);

      const indexColumns = searchedColumn.input;
      const indexSearchText = searchText.searchText;
    
      const handleDelete = async (record) =>{
        const deleteCategoryId = await dispatch(deleteCategory(record.id));
        const name_category = deleteCategoryId.value.data.response.name_category;

          if (deleteCategoryId.value.data.status === 'success') {
            notification.success({
              message: "Data Berhasil dihapus",
              description: `Berhasil menghapus kategori ${name_category}.`
            });
          } else {
            notification.error({
              message: "Gagal menghapus kategori",
              description: `Maaf kategori ${name_category} tidak dapat dihapus.`
            });
          }
      }
      const deleteConfirm = (record) => {
        confirm({
          title: 'Apakah kamu ingin menghapus kategori ini?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
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
          title: 'Nama Kategori',
          dataIndex: 'name_category',
          key: 'name_category',
          ...getColumnSearchProps('name_category'),
        },
        {
          title: 'Action',
          dataIndex: "id",
          key: 'action',
          render: (id, record) =>
            <span>
              <EditCategory data={record}/>
              <Button 
                type="danger" 
                size="small" 
                icon="delete" 
                onClick={()=>deleteConfirm(record)} 
                ghost
              />
            </span>
        },
      ];
      return (
        <Layout>
          <Content className="gutter-example" style={{background: 'white'}}>
            <AddCategory/>
            <Table 
              rowKey={record => record.id}
              columns={columns}
              dataSource={categoryList}
              loading={isLoading}
              size={"small"}
            />
          </Content>
        </Layout>
      )
}

export default CategoryLayout;