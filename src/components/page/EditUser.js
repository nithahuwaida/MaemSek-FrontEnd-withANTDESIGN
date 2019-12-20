import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, notification} from 'antd';
import { putUserById } from '../../public/redux/actions/user';
import './Style.css';

const EditUser = props => {
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
        const editDataUser = await dispatch(putUserById(values))
        const fullname = editDataUser.value.data.response.fullname;
        setConfirmLoading(false);
        setVisible(false);
        props.form.resetFields();
        if (editDataUser.value.data.status === 'success') {
          localStorage.setItem('user-email', editDataUser.value.data.response.email);
          notification.success({
            message: "Data Berhasil diubah",
            description: `Berhasil merubah data admin ${fullname}.`
          });
        } else {
          notification.error({
            message: "Gagal merubah data admin",
            description: editDataUser.value.data.response
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
        type="link"
        icon="edit"
        onClick={showModal}
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
            <Form.Item label="Nama Lengkap" style={{marginBottom: 0}}>
              {getFieldDecorator('fullname', {
                initialValue : props.data.fullname,
                rules: [{ required: true, message: 'Nama Lengkap tidak boleh kosong!' }],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Username" style={{marginBottom: 0}}>
              {getFieldDecorator('username', {
                initialValue : props.data.username,
                rules: [{ required: true, message: 'Username tidak boleh kosong!' }],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="E-mail" style={{marginBottom: 0}}>
              {getFieldDecorator('email', {
                initialValue : props.data.email,
                rules: [{ required: true, message: 'E-mail tidak boleh kosong!' }],
              })(<Input/>)}
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(EditUser);