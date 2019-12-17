import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../helpers/Helpers';
import { Layout, Row, Col, Typography, Descriptions, Avatar, Button} from 'antd';
import { getUserById } from '../../public/redux/actions/user';
import fotoProfil from '../../image/fotoProfil.png'
import Moment from 'moment';
import './Style.css'

const { Content } = Layout;
const { Text } = Typography;

const SettingLayout = () =>{

    const dispatch = useDispatch();
    const { dataUserId } = useSelector(state =>({
        dataUserId : state.user.userList
    }));

    const fetchUserId = async ()=>{
        const id = getUserId()
        await dispatch(getUserById(id))
        .then(res => {
            console.log('berhasil');
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() =>{
        fetchUserId()
    },[]);

    return (
        <Layout>
            <Content className="gutter-example" style={{background: 'white'}}>
                <Row className='row-profil'>
                    <Col span={6} style={{paddingRight:'40px'}}>
                        <Avatar className='profil-image' src={fotoProfil}/>
                    </Col>
                    <Col span={18}>
                        <Text className='title'><b>Informasi Admin<Button type='link' icon='edit'/></b></Text>
                        <Descriptions
                            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                            style={{paddingTop:8}}
                        >
                            <Descriptions.Item label="Nama lengkap">{dataUserId.fullname}</Descriptions.Item>
                            <Descriptions.Item label="Username">{dataUserId.username}</Descriptions.Item>
                            <Descriptions.Item label="Email">{dataUserId.email}</Descriptions.Item>
                            <Descriptions.Item label="Tanggal Pembuatan Akun">{Moment(dataUserId.date_add).format('DD-MM-YYYY')}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default SettingLayout;