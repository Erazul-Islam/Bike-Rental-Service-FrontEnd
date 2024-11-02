import React from 'react';
import { SlLocationPin } from "react-icons/sl";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Divider } from '@nextui-org/react';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { LuTwitter } from "react-icons/lu";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {
    return (
        <div className='dark lg:ml-32 lg:mr-32 pt-40 pb-40'>
            <div className='md:flex md:justify-between'>
                <div>
                    <div className='text-2xl font-bold'> <span>DO YOU HAVE QUESTIONS?</span> <br /> <span className='text-red-600'>
                        LET'S TALK US !</span> </div>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-xl'>
                            <SlLocationPin />
                        </div>
                        <b className='mb-2 '> 5617 Glassford Street New York, NY 10000, USA</b>
                    </div>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-xl'>
                            <LuPhoneCall />
                        </div>
                        <b className='mb-2 '> (+012) 33 5566 8888</b>
                    </div>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-xl'>
                            <MdOutlineEmail />
                        </div>
                        <b className='mb-2 '>  info@autobike.com</b>
                    </div>
                </div>
                <div className=''>
                    <div className='text-2xl text-center'>About Us</div>
                    <div className='  ml-4 md:ml-0 mt-4'>About us</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our service</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our product</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our Team</div>
                </div>
                <div>
                    <div className='text-2xl text-center'>Quick Links</div>
                    <div className='  ml-4 md:ml-0 mt-4'>Accessories</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our divroduct</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our service</div>
                    <div className='  ml-4 md:ml-0 mt-3'>Our Gallary</div>
                </div>
                <div className='mt-4 md:mt-0'>
                    <div className='text-2xl  ml-4 md:ml-0 '>SUBSCRIBE FOR UPDATE</div>
                    <div className='flex'>
                        <input className='h-16  ml-4 md:ml-0 rounded-sm border-none w-72 mt-10 gap-2 p-4' placeholder='Enter your email' type="text" />
                        <button className='h-16 ml-4 md:ml-0 rounded-sm border-none text-white bg-red-600'>SUBSCRIBE</button>
                    </div>
                </div>

            </div>
            <div className='mt-20 mb-8'>
                <Divider></Divider>
            </div>
            <div className='md:flex md:justify-between'>
                <b className='ml-12 md:ml-0'>Copyright © 2024 AutoBike. Design by <span className='text-amber-700'>Taosif</span></b>
                <img className='ml-40 mt-4 md:ml-0 md:mt-0' src="https://i.ibb.co/4s7JnXV/logo-1-1.png" alt="" />
                <div className='flex mt-6 ml-32 md:ml-0 gap-6'>
                    <div className='text-2xl'>
                        <CiFacebook></CiFacebook>
                    </div>
                    <div className='text-2xl'>
                        <CiYoutube />
                    </div>
                    <div className='text-2xl'>
                        <CiInstagram />
                    </div>
                    <div className='text-2xl'>
                        <LuTwitter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;