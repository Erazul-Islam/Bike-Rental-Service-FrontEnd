import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hook';
import { RootState } from '../../../redux/store';
import { Avatar, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { UserOutlined, BookOutlined, HomeOutlined, LikeOutlined } from '@ant-design/icons';
import { RiCoupon5Fill } from "react-icons/ri";
import { RiMotorbikeFill } from "react-icons/ri";
import { GrDeliver } from "react-icons/gr";



const AdminDashBoard = () => {

    const user = useAppSelector((state: RootState) => state.auth.user)


    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible>
                    <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <h2 style={{ color: 'white', marginTop: '8px' }}>{user?.name}</h2>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']}>
                        <Menu.Item key="profile" icon={<UserOutlined />}>
                            <Link to="/admin/dashboard/admin-profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="Manage" icon={<BookOutlined />}>
                            <Link to="/admin/dashboard/user-management">Manage Users</Link>
                        </Menu.Item>
                        <Menu.Item key="Coupon Management" icon={<RiCoupon5Fill />}>
                            <Link to="/admin/dashboard/coupon-management">Coupon Management</Link>
                        </Menu.Item>
                        <Menu.Item key="bike-list" icon={<RiMotorbikeFill />}>
                            <Link to="/admin/dashboard/bike-management">Bike Management</Link>
                        </Menu.Item>
                        <Menu.Item key="bike-return" icon={<GrDeliver />}>
                            <Link to="/admin/dashboard/return">Bike Return</Link>
                        </Menu.Item>
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to="/">Home</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <div style={{ padding: '0 16px', fontSize: '24px', fontWeight: 'bold' }}>
                            User Dashboard
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AdminDashBoard;