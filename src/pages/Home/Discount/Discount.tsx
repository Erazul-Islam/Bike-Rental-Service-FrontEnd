import React from 'react';
import CouponsAndDiscounts from '../../../component/CouponAndDiscount/CouponAndDiscount';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const Discount = () => {
    return (
        <div>
            <h1 className='text-3xl mt-12 mb-12 text-center'>Coupons & Discounts</h1>
            <div className='md:flex  gap-20 '>
                <Layout>
                    <Content style={{ padding: '0 50px', marginTop: '20px', alignItems: 'center', }}>
                        <CouponsAndDiscounts />
                    </Content>
                </Layout>
                <div className=''>
                    <img className='md:ml-28 ml-14' src="https://i.ibb.co/SdZSZ81/baptiste-david-Xfbj-Tax-Snuw-unsplash.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Discount;