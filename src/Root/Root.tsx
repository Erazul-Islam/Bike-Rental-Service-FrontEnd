import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../component/navbar/Nav';

const Root = () => {
    return (
        <div className=''>
            <Nav />
            <Outlet />
        </div>
    );
};

export default Root;