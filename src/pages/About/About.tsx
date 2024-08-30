import { Button } from '@nextui-org/button';
import React from 'react';
import { LuPhoneCall } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';

const About = () => {
    return (
        <div className=''>
            <div>
                <img className='w-full' src="https://i.ibb.co/qyqmrqt/breadcrumb.jpg" alt="" />
            </div>
            <div className='mt-28 md:ml-60 md:flex gap-12'>
                <img className='md:w-1/4' src="https://i.ibb.co/6HLR1ts/harley-davidson-6-OBa-II5-Go-unsplash.jpg" alt="" />
                <div>
                    <Button color='warning' className='rounded-none mt-4 h-20 text-xl' >Mission Statement</Button>
                    <h1 className='md:text-5xl text-orange-600 font-bold mt-10'>HELPS YOU TO FIND YOUR NEXT <br /> MOTORBIKE EASILY</h1>
                    <p className='mt-12 text-center text-xl'>The glamour of ten decades can be this timeless and modern. This motorcycle was, <br />
                        is and remains a design icon. A statement. This limited edition is an icon thanks <br />
                        to its attention to historic details. And its willingness to be glamorous. A fair bit from being modest. <br />
                        The generous use of chrome lends it its radiance. A true masterpiece.

                        <span className='mt-5'>Customized motorcycle. Not for sale. The vehicles shown <br /> are modified and equipped with third-party accessories <br /> and/or proprietary parts that are neither manufactured, distributed nor tested <br />
                            by BMW. BMW assumes no liability for the modifications <br /> (including the installation, characteristics and use of the accessories shown).</span>
                    </p>
                </div>
            </div>
            <div className='md:ml-60 md:mr-60'>
                <Button color='warning' className='rounded-none text-orange-600 mt-20 h-20 text-xl' >OUR TEAM</Button>
                <h1 className='text-5xl mb-20 text-orange-600  font-bold mt-10'>MEET OUR TEAM</h1>
                <div className='flex gap-8'>
                    <div>
                        <img src="https://i.ibb.co/wdhVmFY/thisisengineering-raeng-DKPh3-G8-HLRU-unsplash.jpg" alt="" />
                        <h1 className='text-center text-orange-500 mt-4 text-xl'>Taosif Mahbub</h1>
                        <h1 className='text-center text-orange-600  mt-4'>Director of Marketing</h1>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/V3ZWMTx/27.jpg" alt="" />
                        <h1 className='text-center mt-4 text-orange-500 text-xl'>RASHA ISLAM</h1>
                        <h1 className='text-center text-orange-600 mt-4'>Media Buyer</h1>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/4sWhV2j/thisisengineering-raeng-b-MTdk-0-SIw-unsplash.jpg" alt="" />
                        <h1 className='text-center text-orange-500 mt-4 text-xl'>Sohagi Samiya</h1>
                        <h1 className='text-center text-orange-600 mt-4'>Marketing Manager</h1>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/nmBfhHg/thisisengineering-raeng-ov-WUKV1bt-Xk-unsplash.jpg" alt="" />
                        <h1 className='text-center text-orange-500 mt-4 text-xl'>Sayma ISLAM</h1>
                        <h1 className='text-center text-orange-600 mt-4'>Operations Manager</h1>
                    </div>
                </div>
            </div>
            <h1 className='text-3xl mt-12 mb-12 text-center'>BIG ACHIEVEMENT</h1>
            <img className='mt-12' src="https://i.ibb.co/WfhDfn0/bike-news-image-161751501484263.jpg" alt="" />
            <div>
                <h1 className='text-2xl text-center mt-10 font-bold'>Contact info</h1>
                <p className='pt-8 text-center text-xl pb-8'>We pride ourselves on being a <br /> helping hand for people during good days, <br /> bad days and everything in between.</p>
                <div className='flex justify-between md:ml-40 md:mr-40'>
                    <div className='text-xl flex gap-4'>
                        <p><LuPhoneCall className='text-orange-600 text-xl mt-4' /></p>
                        <h1 className='text-cyan-600'>Need I help? Talk to an Expert <br />
                            (+88) 1900 888 666</h1>
                    </div>
                    <div className='text-xl flex gap-4'>
                        <p><SlLocationPin className='text-orange-600 mt-4' /></p>
                        <h1 className='text-cyan-600'>
                            Address: <br />
                            1095 Howard Street, San Francisco, USA</h1>
                    </div>
                    <div className='text-xl flex gap-4'>
                        <p><MdOutlineEmail className='text-orange-600 mt-4' /></p>
                        <h1 className='text-cyan-600'>
                            Email: <br />
                            Info@autobike.com</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;