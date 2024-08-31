import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { Avatar, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined, BookOutlined, HomeOutlined, LikeOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import { Switch } from '@nextui-org/react';
import { MoonIcon } from '../../navbar/sunIcon';
import { SunIcon } from '../../navbar/moonIcon';

const UserDashBoard = () => {

    const user = useSelector((state: RootState) => state.auth.user)

    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

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
                        <Switch
                            defaultSelected={theme === 'dark'}
                            size="lg"
                            color="secondary"
                            className='ml-3'
                            thumbIcon={({ isSelected, className }) =>
                                isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
                            }
                            onChange={toggleTheme}
                        >

                        </Switch>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{  padding: 0 }}>
                        <div style={{ padding: '0 16px', fontSize: '24px', fontWeight: 'bold' }}>
                            Welcome {user?.name}
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default UserDashBoard;