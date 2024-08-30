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
        <div className='dark lg:ml-60 lg:mr-60 pt-40 pb-40'>
            <div className='md:flex md:justify-between'>
                <div>
                    <h1 className='text-4xl text-cyan-400 font-bold'>DO YOU HAVE QUESTIONS? <br /> <span className='text-orange-500'>
                        LET'S TALK US !</span> </h1>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-2xl'>
                            <SlLocationPin />
                        </div>
                        <b className='mb-2 text-xl'> 5617 Glassford Street New York, NY 10000, USA</b>
                    </div>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-2xl'>
                            <LuPhoneCall />
                        </div>
                        <b className='mb-2 text-xl'> (+012) 33 5566 8888</b>
                    </div>
                    <div className='flex ml-4 md:ml-0 gap-4 mt-4'>
                        <div className='text-2xl'>
                            <MdOutlineEmail />
                        </div>
                        <b className='mb-2 text-xl'>  info@autobike.com</b>
                    </div>
                </div>
                <div className=''>
                    <div className='text-4xl text-center'>About Us</div>
                    <div className='text-xl  ml-4 md:ml-0 mt-4'>About us</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our service</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our divroduct</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our Team</div>
                </div>
                <div>
                    <div className='text-4xl text-center'>Quick Links</div>
                    <div className='text-xl  ml-4 md:ml-0 mt-4'>Accessories shodiv</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our divroduct</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our service</div>
                    <div className='text-xl  ml-4 md:ml-0'>Our Gallary</div>
                </div>
                <div className='mt-4 md:mt-0'>
                    <b className='text-4xl  ml-4 md:ml-0 '>SUBSCRIBE FOR UPDATED</b>
                    <input className='h-16  ml-4 md:ml-0 w-72 mt-8 gap-2 p-4' placeholder='Enter your email' type="text" />
                    <Button className='h-16  ml-4 md:ml-0 rounded-none border-none text-xl' color='success'>SUBSCRIBE</Button>
                </div>

            </div>
            <div className='mt-20 mb-20'>
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