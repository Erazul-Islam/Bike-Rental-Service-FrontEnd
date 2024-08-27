import { Button } from 'antd';
import React from 'react';
import { IoMdSad } from "react-icons/io";
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen'>
            <div className='text-7xl text-green-600 flex justify-center lg:pt-12 text-center'>
                <span >4</span> <span className='text-center'> <IoMdSad /> </span> <span>4</span>
            </div>
            <div className='text-center text-white text-3xl mt-12'>
                Who0ps! Page not found
            </div>
            <div className='text-center text-white text-xl mt-12'>
                This page cannot found or is missing. <br />
                Use the navigation above or the button below to get back and track.
            </div>
            <div className='text-center flex justify-center '>
                <Link to='/' > <Button className='pt-12 bg-green-600 h-12'>Home</Button> </Link>
            </div>
        </div>
    );
};

export default Error;