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
            <h1 className='text-3xl mt-12 mb-12 text-center'>Contact Us</h1>
            <div>
                <img className='w-full' src="https://i.ibb.co/qyqmrqt/breadcrumb.jpg" alt="" />
            </div>
            <div className='md:flex lg:gap-32 mt-14 lg:ml-60 '>
                <div className=' pl-16 pt-10 pr-12'>
                    <h1 className='text-2xl font-bold'>Contact info</h1>
                    <p className='pt-8 text-xl pb-8'>We pride ourselves on being a <br /> helping hand for people during good days, <br /> bad days and everything in between.</p>
                    <div className='text-xl flex gap-4'>
                        <LuPhoneCall className='text-orange-600 text-xl mt-4' />
                        <h1 className='text-green-700'>Need I help? Talk to an Expert
                            (+88) 1900 888 666</h1>
                    </div>
                    <div className='text-xl mt-10 flex gap-4'>
                        <SlLocationPin className='text-orange-600 mt-4' />
                        <h1 className='text-green-700'>
                            Address:
                            1095 Howard Street, San Francisco, USA</h1>
                    </div>
                    <div className='text-xl mt-10 flex gap-4'>
                       <MdOutlineEmail className='text-orange-600 mt-4' />
                        <h1 className='text-green-700'>
                            Email:
                            Info@autobike.com</h1>
                    </div>
                    <div className='flex mt-8 pl-8 pb-12 gap-6'>
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
                <div>
                    <div className='ml-8  md:ml-0'><Button color='success' className='rounded-none h-12 ' >Contact</Button></div>
                    <h1 className='text-6xl mt-4 text-orange-500 font-bold'>GET IN TOUCH</h1>
                    <div className='text-xl md:mr-12  text-center mt-10'>We welcome and value your feedback. Use the form below to send us an email with your comments, questions, or <br /> 
                    concerns. Every customer is welcome to request a transfer or return call from a Senior Agent or Supervisor on an <br /> arising issue.</div>
                    <div className='mt-10 mr-8 ml-8  md:ml-0 flex gap-2'>
                        <input placeholder='Your name' className='md:h-16 md:w-1/2 pl-3 bg-rose-500 dark:dark light:light ' type="text" />
                        <input placeholder='Your Email' className='md:h-16 bg-rose-500 md:w-1/2 pl-3 ' type="text" />
                    </div>
                    <div className=' ml-8 md:ml-0 mr-8'><textarea placeholder='Your message' className='w-full   bg-rose-500 h-32  mt-8 pt-12 pl-3' name="" id=""></textarea></div>
                    <div className='ml-8  md:ml-0'><Button color='success' className='rounded-none bg-rose-500 mt-4 h-14 text-xl w-32' >Submit</Button></div>
                </div>
            </div>
                
        </div>
    );
};

export default ContactSection;