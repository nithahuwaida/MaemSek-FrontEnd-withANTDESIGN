import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Input, Button, Icon, Modal} from 'antd';
import Highlighter from 'react-highlight-words';
import { getCategory } from '../../public/redux/actions/category';
import './Style.css';

const { confirm } = Modal;

const CategoryLayout = (props) =>{
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const dispatch = useDispatch();
    const { dataCategories } = useSelector( state => ({
        dataCategories : state.category.categoryList
    }))

    const fetchDataCategory = async () => {
        await dispatch(getCategory())
        .then(res => {
            console.log('berhasil');
        }).catch(error => {
            console.log(error);
        })
      }  
      useEffect(() => {
        fetchDataCategory()
      },[]);

      const indexColumns = searchedColumn.input;
      const indexSearchText = searchText.searchText;
    
      const deleteConfirm = () => {
        confirm({
          title: 'Apakah kamu ingin menghapus kategori ini?',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Terjadi Kesalahan!'));
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
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
          },
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
            render: () =>
              <span>
                <Button type="primary" size="small" icon="edit" style={{marginRight:2}} ghost/>
                <Button type="danger" size="small" icon="delete" onClick={deleteConfirm} ghost/>
              </span>
          },
        ];
        return (
          <Table 
            rowKey={record => record.id}
            columns={columns} 
            dataSource={dataCategories}
            size={"small"} 
          />
        )
}

export default CategoryLayout;