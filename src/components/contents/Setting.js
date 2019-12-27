import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../helpers/Helpers';
import { Layout, Row, Col, Typography, Descriptions, Avatar, Skeleton} from 'antd';
import { getUserById } from '../../public/redux/actions/user';
import fotoProfil from '../../image/fotoProfil.jpg'
import Moment from 'moment';
import './Style.css'

import EditUser from '../page/EditUser';

const { Content } = Layout;
const { Text } = Typography;

const SettingLayout = () =>{
    const [loading, setLoading]= useState(true);

    const dispatch = useDispatch();
    const { userList } = useSelector(
        state => state.user
    );

    const fetchUserId = async ()=>{
        const id = getUserId()
        await dispatch(getUserById(id))
        .then(() => {
            setLoading(false)
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
                    <Skeleton loading={loading} active>
                        <Col span={6} style={{paddingRight:'40px'}}>
                            <Avatar shape='square' className='profil-image' src={fotoProfil}/>
                        </Col>
                        <Col span={18}>
                            <Text className='title'><b>Informasi Admin<EditUser data={userList}/></b></Text>
                            <Descriptions
                                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                                style={{paddingTop:8}}
                            >
                                <Descriptions.Item label="Nama lengkap">{userList.fullname}</Descriptions.Item>
                                <Descriptions.Item label="Username">{userList.username}</Descriptions.Item>
                                <Descriptions.Item label="Email">{userList.email}</Descriptions.Item>
                                <Descriptions.Item label="Tanggal Pembuatan Akun">{Moment(userList.date_add).format('DD-MM-YYYY')}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Skeleton>
                </Row>
            </Content>
        </Layout>
    )
}

export default SettingLayout;