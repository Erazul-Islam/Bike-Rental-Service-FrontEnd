import React from 'react';
import { Card, List, Typography, Row, Col } from 'antd';

const { Title, Paragraph } = Typography;

const coupons = [
    {
        code: 'TAOSIF20',
        description: 'Get 20% off on all bike rentals',
    },
    {
        code: 'TAOSIF10',
        description: '10% off for all new customers!',
    },
];

const CouponsAndDiscounts = () => {
    return (
        <div className='dark:dark light:light
        ' style={{ padding: '20px', }}>
            <Title style={{color:'bisque'}} level={2}>Coupons & Discounts</Title>
            <Paragraph style={{color:'bisque'}}>Apply the following coupon codes at checkout to receive discounts on your rentals:</Paragraph>

            <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                dataSource={coupons}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.code}>
                            <p>{item.description}</p>
                        </Card>
                    </List.Item>
                )}
            />

            <Title level={3} style={{ marginTop: '20px',color:'bisque' }}>How to Apply Coupons:</Title>
            <Paragraph style={{color:'bisque'}}>1. Copy the coupon code.</Paragraph>
            <Paragraph style={{color:'bisque'}}>2. Go to the checkout page.</Paragraph>
            <Paragraph style={{color:'bisque'}}>3. Enter the coupon code in the "Apply Coupon" section.</Paragraph>
            <Paragraph style={{color:'bisque'}}>4. Enjoy your discount!</Paragraph>
        </div>
    );
};

export default CouponsAndDiscounts;
