import { NavbarBrand, NavbarContent, NavbarItem, } from '@nextui-org/navbar';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Link, Navbar } from '@nextui-org/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { useCurrentToken } from '../../redux/feature/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';

const Nav = () => {


    const token = useAppSelector(useCurrentToken);
    console.log(token)

    let user;

    if (token) {
        user = verifyToken(token);
    }

    console.log(user)

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
                            <Link color="foreground" href="/login">
                                Login
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            {user.role === 'admin' ? < Link color="foreground" href="/admin/dashboard">
                                Dashboard
                            </Link> : <Link color="foreground" href="/user/dashboard">
                                Dashboard
                            </Link>}
                        </NavbarItem>
                    </NavbarContent>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <Input
                        classNames={{
                            base: "max-w-full sm:max-w-[10rem] h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="sm"
                        type="search"
                    />
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">zoey@example.com</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar>
        </div >
    );
};

export default Nav;