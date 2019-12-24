import React from 'react';
import { Statistic, Row, Col, Icon } from 'antd';

const DashboardLayout = () =>{
    return (
        <div style={{ background: '#ECECEC', padding: '10px' }}>
            <Row >
                <Col span={6} className='statistic-info'>
                    <Statistic
                        title="Keuntungan"
                        value={87,5}
                        // precision={2}
                        valueStyle={{ color: 'rgb(24, 144, 255)' }}
                        prefix={<Icon type="line-chart" />}
                        suffix="%"
                    />
                </Col>
                <Col span={6} className='statistic-info'>
                    <Statistic
                        title="Jumlah Transaksi"
                        value={1001}
                        // precision={2}
                        valueStyle={{ color: 'rgb(24, 144, 255)' }}
                        prefix={<Icon type="shopping-cart" />}
                        suffix="transaksi"
                    />
                </Col>
                <Col span={6} className='statistic-info'>
                    <Statistic
                        title="Produk"
                        value={4}
                        // precision={2}
                        valueStyle={{ color: 'rgb(24, 144, 255)' }}
                        prefix={<Icon type="inbox" />}
                        suffix="pcs"
                    />
                </Col>
                <Col span={6} className='statistic-info'>
                    <Statistic
                        title="Kategori"
                        value={3}
                        // precision={2}
                        valueStyle={{ color: 'rgb(24, 144, 255)' }}
                        prefix={<Icon type="gold" />}
                        suffix="pcs"
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardLayout;