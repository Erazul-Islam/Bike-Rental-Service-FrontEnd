import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { Avatar, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined, BookOutlined, HomeOutlined, LikeOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';

const UserDashBoard = () => {

    const user = useSelector((state: RootState) => state.auth.user)

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
                            <Link to="/user/dashboard/profile">Profile</Link>
                        </Menu.Item>
                        <Menu.Item key="booking" icon={<BookOutlined />}>
                            <Link to="/user/dashboard/booking">My Booking</Link>
                        </Menu.Item>
                        <Menu.Item key="bike-list" icon={<LikeOutlined />}>
                            <Link to="/user/dashboard/bike-list">All Bikes</Link>
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

export default UserDashBoard;