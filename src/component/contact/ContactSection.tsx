import React from 'react';
import { SlLocationPin } from "react-icons/sl";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { Button, Divider } from '@nextui-org/react';
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { LuTwitter } from "react-icons/lu";
import { CiYoutube } from "react-icons/ci";

const ContactSection = () => {
    return (
        <div className='mt-24 '>
            <div className='text-3xl mt-12 mb-12 text-center'>Contact Us</div>
            <div>
                <img className='w-full' src="https://i.ibb.co/qyqmrqt/breadcrumb.jpg" alt="" />
            </div>
            <div className='md:flex lg:gap-32 mt-14 lg:ml-60 '>
                <div className='shadow-lg   pl-16 pt-10 pr-12'>
                    <div className='text-2xl  font-bold'>Contact info</div>
                    <div className='pt-8 text-left pb-8'>We pride ourselves on being a  helping hand for people during good days,  bad days and everything in between.</div>
                    <div className='mt-4 flex gap-4'>
                        <LuPhoneCall className='text-red-600 text-xl mt-4' />
                        <div className='pt-3'>
                            (+88) 1900 888 666
                        </div>
                    </div>
                    <div className='mt-10 flex gap-4'>
                        <SlLocationPin className='text-red-600 text-xl mt-4' />
                        <div className='pt-3'>
                            1095 Howard Street, San Francisco
                        </div>
                    </div>
                    <div className='mt-10 flex gap-4'>
                        <MdOutlineEmail className='text-red-600 text-xl mt-4' />
                        <div className='pt-3'>
                            Email:
                            Info@autobike.com
                        </div>
                    </div>
                    <div className='flex mt-16 pl-8 pb-12 gap-6'>
                        <div className='text-2xl text-red-600'>
                            <CiFacebook></CiFacebook>
                        </div>
                        <div className='text-2xl text-red-600'>
                            <CiYoutube />
                        </div>
                        <div className='text-2xl text-red-600'>
                            <CiInstagram />
                        </div>
                        <div className='text-2xl text-red-600'>
                            <LuTwitter />
                        </div>
                    </div>
                </div>
                <div className='md:mr-44'>
                    <div className='text-4xl mt-4  text-center font-bold'>GET IN TOUCH</div>
                    <div className=' md:mr-12 md:text-left text-center ml-4 mr-4 mt-10'>We welcome and value your feedback. Use the form below to send us an email with your comments, questions, or 
                        concerns. Every customer is welcome to request a transfer or return call from a Senior Agent or Supervisor on an  arising issue.</div>
                    <div className='mt-10 mr-8 ml-8  md:ml-0 flex gap-2'>
                        <input placeholder='Your name' className='md:h-16 md:w-1/2 pl-3  dark:dark light:light ' type="text" />
                        <input placeholder='Your Email' className='md:h-16  md:w-1/2 pl-3 ' type="text" />
                    </div>
                    <div className=' ml-8 md:ml-0 mr-8'><textarea placeholder='Your message' className='w-full    h-32  mt-8 pt-12 pl-3' name="" id=""></textarea></div>
                    <div className='ml-8  md:ml-0'><button className='rounded-none bg-red-600 border-none text-white  mt-4 h-14 text-xl w-32' >Submit</button></div>
                </div>
            </div>

        </div>
    );
};

export default ContactSection;