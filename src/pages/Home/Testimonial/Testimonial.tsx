import React from 'react';

const Testimonial = () => {
    return (
        <div>
            <ul><h1 className='text-3xl mt-12 mb-12 text-center'>Testimonial</h1></ul>
            <div className='lg:ml-60 lg:mr-60 lg:flex gap-8'>
                <div>
                    <img className='' src="https://i.ibb.co/SnkyWZT/carnaby-gilany-u1-Ej-Amyww-I0-unsplash.jpg" alt="" />
                    <div className='flex'>
                        <h1 className='mt-4 text-xl'>May 1 2023</h1>
                        <h2 className='mt-4 text-xl md:ml-64'>-  Michael Jac</h2>
                    </div>
                    <h3 className='text-3xl mt-3'>On Her Bike through Tanzania and Zanzibar</h3>
                    <p className='text-xl mt-3 '>During the last ice age, the land surface of Drenthe was covered <br /> with glaciers and ice, slowly moving in from Scandinavia.</p>
                </div>
                <div>
                    <img className='' src="https://i.ibb.co/mvc6Yty/web-donut-e-Sz-WOpp1rgw-unsplash-1.jpg" alt="" />
                    <div className='flex'>
                        <h1 className='mt-4 text-xl'>April 24 2024</h1>
                        <h2 className='mt-4 text-xl md:ml-64'>-  Taosif Jackson</h2>
                    </div>
                    <h3 className='text-3xl mt-3'>Mountain weather beats route planning
                   </h3>
                    <p className='text-xl mt-3'> Some visit the plance to climb and pass the Watzmann, a mountain whose striking summit towers a whopping 2713 metres into</p>
                </div>
                <div>
                    <img className='' src="https://i.ibb.co/L5XcCxD/sean-delshadi-lr-Tcl-BKLo-Sg-unsplash.jpg" alt="" />
                    <div className='flex'>
                        <h1 className='mt-4 text-xl'>June 10 2022</h1>
                        <h2 className='mt-4 text-xl md:ml-64'>-  Sofia Jackson</h2>
                    </div>
                    <h3 className='text-3xl mt-3'>America – Winter Riding Routes That Are Awesome!
                    </h3>
                    <p className='text-xl mt-3'>Where the Expedition truly distinguishes itself from the Norden 901 is in componentry. It shares the more stout Xplor suspension</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;