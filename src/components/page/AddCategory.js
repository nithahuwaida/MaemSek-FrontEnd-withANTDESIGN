import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { Button, Modal, Form, Input, notification} from 'antd';
import { postCategory } from '../../public/redux/actions/category';
import './Style.css';

const AddCategory = props => {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    props.form.validateFields(async(err, values) => {
      if (!err) {
        setConfirmLoading(true);
        const addDataCategory = await dispatch(postCategory(values))
        const name_category = addDataCategory.value.data.response.name_category;
        setConfirmLoading(false);
        setVisible(false);
        props.form.resetFields();
        if (addDataCategory.value.data.status === 'success') {
          notification.success({
            message: "Data Berhasil ditambahkan",
            description: `Berhasil menambah kategori ${name_category}.`
          });
        } else {
          notification.error({
            message: `Gagal menambah kategori ${name_category}`,
            description: addDataCategory.value.data.response
          });
        }
      }
    });
  };

  const handleCancel=()=>{
    setVisible(false);
    props.form.resetFields();
  }

  return (
    <div>
      <Button 
          className='add-category' 
          type='primary' 
          icon="plus"
          onClick={showModal} >  
              Tambah Category
      </Button>
      <Modal
          title="Tambah Kategori"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label="Nama Kategori" style={{marginBottom: 0}}>
              {getFieldDecorator('name_category', {
                rules: [{ required: true, message: 'Nama kategori tidak boleh kosong!' }],
              })(<Input />)}
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(AddCategory);