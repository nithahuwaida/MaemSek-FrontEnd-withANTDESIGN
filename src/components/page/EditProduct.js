import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { Button, Modal, Form, Input, notification, InputNumber, Select} from 'antd';
import { putProduct } from '../../public/redux/actions/product';
import './Style.css';

const { Option } = Select;

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
        const editDataProduct = await dispatch(putProduct(values))
        const name_product = editDataProduct.value.data.response.name_product;
        setConfirmLoading(false);
        setVisible(false);
        props.form.resetFields();
        if (editDataProduct.value.data.status === 'success') {
          notification.success({
            message: "Data Berhasil diubah",
            description: `Berhasil merubah data produk ${name_product}.`
          });
        } else {
          notification.error({
            message: `Gagal merubah produk ${name_product}`,
            description: editDataProduct.value.data.response
          });
        }
      }
    });
  };

  const handleCancel=()=>{
    setVisible(false);
    props.form.resetFields();
  }

  const checkPrice = (rule, value, callback) => {
    if (value > 999) {
      return callback();
    }
    callback('Minimal harga produk Rp. 1000,- !');
  };
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
          title="Edit Produk"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <Form {...formItemLayout}>
            <Form.Item label="Id" style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue : props.dataProduct.id,
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="Nama Produk" style={{marginBottom: 0}}>
              {getFieldDecorator('name_product', {
                initialValue : props.dataProduct.name_product,
                rules: [{ required: true, message: 'Nama Produk tidak boleh kosong!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Deskripsi Produk" style={{marginBottom: 0}}>
              {getFieldDecorator('desc_product', {
                initialValue : props.dataProduct.desc_product,
                rules: [{ required: true, message: 'Deskripsi tidak boleh kosong!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Foto Produk" style={{marginBottom: 0}}>
              {getFieldDecorator('image_product', {
                initialValue : props.dataProduct.image_product,
                rules: [{ required: true, message: 'Foto Produk tidak boleh kosong!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Harga Produk" style={{marginBottom: 0}}>
              {getFieldDecorator('price_product', {
                initialValue : props.dataProduct.price_product,
                rules: [{ validator: checkPrice }],
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="Stok" style={{marginBottom: 0}}>
                {getFieldDecorator('quantity_product',{
                initialValue : props.dataProduct.quantity_product,
                })(<InputNumber min={props.dataProduct.quantity_product}/>)}
                <span className="ant-form-text"> pcs</span>
            </Form.Item>
            <Form.Item label="Kategori">
              {getFieldDecorator('id_category', {
                initialValue : props.dataProduct.category.id,
                rules: [{ required: true, message: 'Kategori tidak boleh kosong' }],
              })(
                <Select
                placeholder="Pilih kategori"
                >
                {props.dataCategory.map((item, index) => (
                <Option value={item.id} key={index}>
                    {item.name_category}
                </Option>
                ))}
              </Select>
              )}
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
}

export default Form.create()(EditCategory);