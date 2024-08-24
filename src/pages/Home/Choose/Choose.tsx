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
            <div className='flex gap-20 '>
                <div>
                    <img src="https://i.ibb.co/5YM99Jj/gijs-coolen-t1g-Nz-D88-PDs-unsplash.jpg" alt="" />
                </div>
                <div className='lg:mt-72'>
                    <h1 className='text-2xl text-orange-500'>Reason for choosen us</h1><br />
                    <p className='text-xl'>You should purchase to us because we give you best price, best opportunity and gift</p>
                    <div className='mt-12 flex gap-8'>
                        <div>
                            <div className='flex gap-4'>
                                <p className='text-3xl'> <FaStroopwafel className='' /> </p>
                                <h1 className='text-xl'>Fast Processing</h1>
                            </div>
                            <div className='flex mt-6 gap-4'>
                                <p className='text-3xl'> <MdOutlineManageAccounts /> </p>
                                <h1 className='text-xl'>Front Interview</h1>
                            </div>
                            <div className='flex mt-6 gap-4'>
                                <p className='text-3xl'> <MdOutlinePriceCheck /> </p>
                                <h1 className='text-xl'>Reasonable Price</h1>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='flex gap-4'>
                                    <p className='text-3xl'> <VscWorkspaceTrusted /> </p>
                                    <h1 className='text-xl'>Trusted Company</h1>
                                </div>
                                <div className='flex mt-6 gap-4'>
                                    <p className='text-3xl'> <CiDeliveryTruck /> </p>
                                    <h1 className='text-xl'>InTime Delivery</h1>
                                </div>
                                <div className='flex mt-6 gap-4'>
                                    <p className='text-3xl'> <FaHeadphones /> </p>
                                    <h1 className='text-xl'>24/7 Support</h1>
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