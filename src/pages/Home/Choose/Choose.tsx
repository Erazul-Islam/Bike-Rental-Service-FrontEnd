import React from 'react';
import { FaStroopwafel } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHeadphones } from "react-icons/fa";

const Choose = () => {
    return (
        <div>
            <h1 className='text-3xl text-center mt-16 mb-12'>Why choose us</h1>
            <div className='md:flex gap-20 '>
                <div>
                    <img src="https://i.ibb.co/5YM99Jj/gijs-coolen-t1g-Nz-D88-PDs-unsplash.jpg" alt="" />
                </div>
                <div className='lg:mt-72'>
                    <h1 className='text-2xl text-orange-500'>Reason for choosen us</h1><br />
                    <p className='text-xl md:ml-0 ml-4'>You should purchase to us because we give you best price, best opportunity and gift</p>
                    <div className='mt-12 ml-12 md:ml- flex gap-8'>
                        <div>
                            <div className='flex gap-4'>
                                <FaStroopwafel className='text-3xl text-orange-500' />
                                <h1 className='text-xl text-sky-600'>Fast Processing</h1>
                            </div>
                            <div className='flex mt-6 gap-4'>
                                 <MdOutlineManageAccounts className='text-3xl text-orange-500'  /> 
                                <h1 className='text-xl text-sky-600'>Front Interview</h1>
                            </div>
                            <div className='flex mt-6 gap-4'>
                                 <MdOutlinePriceCheck className='text-3xl text-orange-500'   /> 
                                <h1 className='text-xl text-sky-600'>Reasonable Price</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='flex gap-4'>
                                     <VscWorkspaceTrusted className='text-3xl text-orange-500'  /> 
                                    <h1 className='text-xl text-sky-600'>Trusted Company</h1>
                                </div>
                                <div className='flex mt-6 gap-4'>
                                     <CiDeliveryTruck className='text-3xl text-orange-500'  /> 
                                    <h1 className='text-xl text-sky-600'>InTime Delivery</h1>
                                </div>
                                <div className='flex mt-6 gap-4'>
                                     <FaHeadphones className='text-3xl text-orange-500'  /> 
                                    <h1 className='text-xl text-sky-600'>24/7 Support</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choose;