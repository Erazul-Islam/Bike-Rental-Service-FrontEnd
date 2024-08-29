import { NavbarBrand, NavbarContent, NavbarItem, } from '@nextui-org/navbar';
import { Link, Navbar, Switch } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout, useCurrentToken } from '../../redux/feature/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { MoonIcon } from './sunIcon';
import { SunIcon } from './moonIcon';

const Nav = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const token = useAppSelector(useCurrentToken);
    console.log(token)

    let user;

    if (token) {
        user = verifyToken(token);
    }

    console.log(user)
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div>
            <Navbar isBordered>
                <NavbarContent justify="end">
                    <NavbarBrand className="mr-4">
                        <NavLink to='/'><img src="https://i.ibb.co/4s7JnXV/logo-1-1.png" alt="" /></NavLink>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-3">
                        <NavbarItem>
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
                            {user?.role === 'admin' ? < Link color="foreground" href="/admin/dashboard">
                                Dashboard
                            </Link> : <Link color="foreground" href="/user/dashboard">
                                Dashboard
                            </Link>}
                        </NavbarItem>
                    </NavbarContent>
                    <Switch
                        defaultSelected={theme === 'dark'}
                        size="lg"
                        color="secondary"
                        thumbIcon={({ isSelected, className }) =>
                            isSelected ? <MoonIcon className={className} /> : <SunIcon className={className} />
                        }
                        onChange={toggleTheme}
                    >
                        {/* Dark mode */}
                    </Switch>
                </NavbarContent>
            </Navbar>
        </div >
    );
};

export default Nav;