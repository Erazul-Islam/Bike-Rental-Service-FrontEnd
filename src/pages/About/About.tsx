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
            <div className='mt-28 md:ml-60 md:flex justify-between gap-12'>
                <img className='md:w-1/4' src="https://i.ibb.co/6HLR1ts/harley-davidson-6-OBa-II5-Go-unsplash.jpg" alt="" />
                <div>
                    <div className='rounded-none text-center h-10 mt-12 w-40 pt-2  bg-red-700 ' >Mission Statement</div>
                    <div className='md:text-4xl  font-bold mt-10'>HELPS YOU TO FIND YOUR NEXT <br /> MOTORBIKE EASILY</div>
                    <div className='mt-12 mr-4 text-left'>The glamour of ten decades can be this timeless and modern. This motorcycle was, <br />
                        is and remains a design icon. A statement. This limited edition is an icon thanks <br />
                        to its attention to historic details. And its willingness to be glamorous. A fair bit from being modest. <br />
                        The generous use of chrome lends it its radiance. A true masterpiece.
                        <span className='mt-12'>Customized motorcycle. Not for sale. The vehicles shown <br /> are modified and equipped with third-party accessories <br /> and/or proprietary parts that are neither manufactured, distributed nor tested <br />
                            by BMW. BMW assumes no liability for the modifications <br /> (including the installation, characteristics and use of the accessories shown).</span>
                    </div>
                </div>
            </div>
            <div className='md:ml-60 md:mr-60'>
                <div className='rounded-none text-center h-10 mt-12 w-40 pt-2 bg-red-700 ' >OUR TEAM</div>
                <div className='text-3xl mb-20   text-left font-bold mt-10'>MEET OUR TEAM</div>
                <div className='md:flex gap-8'>
                    <div>
                        <img src="https://i.ibb.co/wdhVmFY/thisisengineering-raeng-DKPh3-G8-HLRU-unsplash.jpg" alt="" />
                        <div className='text-center  mt-4 text-xl'>Taosif Mahbub</div>
                        <div className='text-center  mt-4'>Director of Marketing</div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/V3ZWMTx/27.jpg" alt="" />
                        <div className='text-center mt-4  text-xl'>RASHA ISLAM</div>
                        <div className='text-center mt-4'>Media Buyer</div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/4sWhV2j/thisisengineering-raeng-b-MTdk-0-SIw-unsplash.jpg" alt="" />
                        <div className='text-center  mt-4 text-xl'>Sohagi Samiya</div>
                        <div className='text-center mt-4'>Marketing Manager</div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/nmBfhHg/thisisengineering-raeng-ov-WUKV1bt-Xk-unsplash.jpg" alt="" />
                        <div className='text-center  mt-4 text-xl'>Sayma ISLAM</div>
                        <div className='text-center mt-4'>Operations Manager</div>
                    </div>
                </div>
            </div>
            <div className='rounded-none md:ml-60 md:mr-60 text-center h-10 mt-12 w-40 pt-2 bg-red-700 '>BIG ACHIEVEMENT</div>
            <img className='mt-12' src="https://i.ibb.co/WfhDfn0/bike-news-image-161751501484263.jpg" alt="" />
            <div className='md:ml-60 md:mr-60'>
                <div className='rounded-none text-center h-10 mt-12 w-40 pt-2 bg-red-700 '>Contact info</div>
                <div className='pt-8 text-xl text-center pb-8'>We pride ourselves on being a  helping hand for people during good days,  bad days and everything in between.</div>
                <div className=' ml-20 md:ml-40 md:mr-40'>
                    <div className='text-xl flex gap-4'>
                        <div><LuPhoneCall className='text-orange-600 text-xl mt-2' /></div>
                        <div className=''> Talk to an Expert 
                            (+88) 1900 888 666</div>
                    </div>
                    <div className='text-xl mt-6 flex gap-4'>
                        <div><SlLocationPin className='text-orange-600 mt-2 text-xl' /></div>
                        <div className=''>
                        
                            1095 Howard Street, San Francisco, USA</div>
                    </div>
                    <div className='text-xl flex mt-6 gap-4'>
                        <div><MdOutlineEmail className='text-orange-600 mt-2 text-xl mb-12' /></div>
                        <div className=''>
                            Email: 
                            Info@autobike.com</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;