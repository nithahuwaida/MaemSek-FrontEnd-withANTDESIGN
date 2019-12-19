import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, notification} from 'antd';
import { putCategory } from '../../public/redux/actions/category';
import './Style.css';

const EditCategory = props => {
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
        const editDataCategory = await dispatch(putCategory(values))
        const name_category = editDataCategory.value.data.response.name_category;
        setConfirmLoading(false);
        setVisible(false);
        props.form.resetFields();
        if (editDataCategory.value.data.status === 'success') {
          notification.success({
            message: "Data Berhasil diubah",
            description: `Berhasil mengubah kategori ${name_category}.`
          });
        } else {
          notification.error({
            message: "Gagal merubah kategori",
            description: editDataCategory.value.data.response
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
    <div style={{display:'contents'}}>
      <Button 
        type="primary" 
        size="small" 
        icon="edit"
        onClick={showModal}
        style={{marginRight:2}} 
        ghost
        />
      <Modal
          title="Edit Kategori"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label="Username" style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue : props.data.id,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Nama Kategori" style={{marginBottom: 0}}>
              {getFieldDecorator('name_category', {
                initialValue : props.data.name_category,
                rules: [{ required: true, message: 'Nama kategori tidak boleh kosong!' }],
              })(<Input/>)}
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(EditCategory);