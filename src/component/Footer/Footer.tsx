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
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-4xl font-bold'>DO YOU HAVE QUESTIONS? <br /> <span className='text-orange-500'>
                        LET'S TALK US !</span> </h1>
                    <div className='flex gap-4 mt-4'>
                        <div className='text-2xl'>
                            <SlLocationPin />
                        </div>
                        <p className='mb-2 text-xl'> 5617 Glassford Street New York, NY 10000, USA</p>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <div className='text-2xl'>
                            <LuPhoneCall />
                        </div>
                        <p className='mb-2 text-xl'> (+012) 33 5566 8888</p>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <div className='text-2xl'>
                            <MdOutlineEmail />
                        </div>
                        <p className='mb-2 text-xl'>  info@autobike.com</p>
                    </div>
                </div>
                <div>
                    <p className='text-4xl'>About Us</p>
                    <p className='text-xl mt-4'>About us</p>
                    <p className='text-xl'>Our service</p>
                    <p className='text-xl'>Our Product</p>
                    <p className='text-xl'>Our Team</p>
                </div>
                <div>
                    <p className='text-4xl'>Quick Links</p>
                    <p className='text-xl mt-4'>Accessories shop</p>
                    <p className='text-xl'>Our Product</p>
                    <p className='text-xl'>Our service</p>
                    <p className='text-xl'>Our Gallary</p>
                </div>
                <div>
                    <p className='text-4xl'>SUBSCRIBE FOR UPDATED</p>
                    <input className='h-16 w-72 mt-8 gap-2 p-4' placeholder='Enter your email' type="text" />
                    <Button className='h-16 rounded-none border-none text-xl' color='success'>SUBSCRIBE</Button>
                </div>

            </div>
            <div className='mt-20 mb-20'>
                <Divider></Divider>
            </div>
            <div className='flex justify-between'>
                <p>Copyright © 2024 AutoBike. Design by <span className='text-amber-700'>Taosif</span></p>
                <img src="https://i.ibb.co/4s7JnXV/logo-1-1.png" alt="" />
                <div className='flex gap-6'>
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