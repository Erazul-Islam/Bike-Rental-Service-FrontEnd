import React from 'react';

const Discount = () => {
    return (
        <div>
            <h1 className='text-3xl mt-12 mb-12 text-center'>Coupons & Discounts</h1>
            <div className='flex gap-20 '>
                <div className=' mt-24 ml-16'>
                    <h1 className='text-3xl font-bold text-orange-500'>10% OFF on New Bike</h1>
                    <p className='text-xl mt-24'>Whether offering organized motorcycling trips to the most beautiful places in the world, <br /> or training on world championship circuits: BMW is your starting point for unique <br />
                        motorcycling experiences. On the other side of the world or right outside your front door. <br />
                        Always passionate, inspiring and outstanding in quality <br /> and service – just like you expect from BMW. Get ready to explore endless possibilities.</p>
                    <h2 className='text-3xl font-bold mt-24 text-orange-500'>USE PROMO: TAOSIF10</h2>
                </div>
                <div className=''>
                    <img className='ml-28' src="https://i.ibb.co/SdZSZ81/baptiste-david-Xfbj-Tax-Snuw-unsplash.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Discount;