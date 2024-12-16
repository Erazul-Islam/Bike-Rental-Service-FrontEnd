import { NavbarContent, NavbarItem, } from '@nextui-org/navbar';
import { Avatar, Link, Navbar, Switch } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout, useCurrentToken } from '../../redux/feature/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { MoonIcon } from './sunIcon';
import { SunIcon } from './moonIcon';
import { MenuOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Drawer } from 'antd';

const Nav = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token);
    }

    console.log(user)

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark'
    });

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme)
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    return (
        <div>
            <Navbar isBordered>
                <NavbarContent justify="end">
                    <NavbarItem className='md:hidden mr-32'>
                        <NavLink to='/'><img src="https://i.ibb.co/4s7JnXV/logo-1-1.png" alt="" /></NavLink>
                    </NavbarItem>
                    <NavbarContent className="hidden sm:flex gap-3">
                        <NavbarItem >
                            <NavLink to='/'><img src="https://i.ibb.co/4s7JnXV/logo-1-1.png" alt="" /></NavLink>
                        </NavbarItem>
                        <NavbarItem style={{ marginLeft: 200 }}>
                            <Link color="foreground" href='/'>
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/about">
                                About
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/all-bike">
                                Bike
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/spin">
                                Spinner
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            {user ? <div className='cursor-pointer' onClick={handleLogout}>Logout</div> : <Link color="foreground" href="/login">
                                Login
                            </Link>}
                        </NavbarItem>
                        <NavbarItem>
                            {
                                user === undefined ? '' : <NavbarItem>
                                    {user?.role === 'admin' ? < Link color="foreground" href="/admin/dashboard">
                                        Dashboard
                                    </Link> : <Link color="foreground" href="/user/dashboard">
                                        Dashboard
                                    </Link>}
                                </NavbarItem>
                            }
                        </NavbarItem>
                    </NavbarContent>
                    <Switch
                        defaultSelected={theme === 'dark'}
                        size="lg"
                        color="secondary"
                        className='sm:hidden'
                        thumbIcon={({ isSelected, className }) =>
                            isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
                        }
                        onChange={toggleTheme}
                    >

                    </Switch>
                    <div className='md:hidden'>
                        <button className='md:hidden border-none mt-4 ml-4' onClick={showDrawer}> <MenuUnfoldOutlined /> </button>
                    </div>
                    <Drawer
                        title="Menu"
                        placement="right"
                        onClose={onClose}
                        open={visible}
                        className="md:hidden dark:dark light:light"
                    >
                        <NavbarItem>
                            <Link className='text-black' href='/'>
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link className='text-black' href="/about">
                                About
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link className='text-black' href="/all-bike">
                                Bike
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link className='text-black' href="/spin">
                                Spinner
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            {user ? <div className='cursor-pointer' onClick={handleLogout}>Logout</div> : <Link className='text-black' href="/login">
                                Login
                            </Link>}
                        </NavbarItem>
                        {
                            user === undefined && token === null ? "" : <NavbarItem>
                                {user?.role === 'admin' ? < Link className='text-black' href="/admin/dashboard">
                                    dashboard
                                </Link> : <Link className='text-black' href="/user/dashboard/profile">
                                    dashboard
                                </Link>}
                            </NavbarItem>
                        }
                        <NavbarItem>
                            
                        </NavbarItem>
                    </Drawer>
                </NavbarContent>
            </Navbar>
        </div >
    );
};

export default Nav;