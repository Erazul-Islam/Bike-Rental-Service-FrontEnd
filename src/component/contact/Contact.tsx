import { Button } from '@nextui-org/button';
import React from 'react';

const Contact = () => {
    return (
        <div>
            <div className='relative'>
                <img className='w-full' src="https://i.ibb.co/rphXwH1/paul-kansonkho-1920.jpg" alt="" />
                <div className='absolute bottom-52 left-56'>
                    <h1 className='text-5xl font-bold'>Free service for premium <br /> members</h1>
                    <h2 className='mt-8 text-xl'>If someone’s not there to take your call, you can wait and <br /> the automated voice will prompt you to leave a message. <br /> We will get back to you as soon as possible</h2>
                    <div className='flex gap-4 mt-8'>
                        <Button className='h-16 rounded-none bg-orange-600' >CONTACT US</Button>
                        <h2>Call us <br />  <span className='text-3xl'>(+012) 33 5566 8888</span> </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;