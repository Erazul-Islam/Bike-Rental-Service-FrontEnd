import React from 'react';

const Testimonial = () => {
    return (
        <div>
            <ul><h1 className='text-3xl mt-12 mb-12 text-center'>Testimonial</h1></ul>
            <div className='lg:ml-60 lg:mr-60 lg:flex gap-8'>
                <div  >
                    <img className='' src="https://i.ibb.co/SnkyWZT/carnaby-gilany-u1-Ej-Amyww-I0-unsplash.jpg" alt="" />
                    <div className='flex'>
                        <h1 className='mt-4  ml-8 md:ml-0 '>May 1 2023</h1>
                        <h2 className='mt-4  md:ml-64'>Michael </h2>
                    </div>
                    <h3 className='md:text-xl ml-8 md:ml-0 font-bold text-xl mt-3'>On Her Bike through Tanzania</h3>
                    <h4 className='text-sm mt-3 ml-8 md:ml-0 '>During the last ice age, the land surface of Drenthe was covered <br /> with glaciers and ice, slowly moving in from Scandinavia.</h4>
                </div>
                <div>
                    <img className='md:mt-0 mt-4' src="https://i.ibb.co/mvc6Yty/web-donut-e-Sz-WOpp1rgw-unsplash-1.jpg" alt="" />
                    <div className='flex ml-8 md:ml-0'>
                        <h1 className='mt-4 '>April 4 2024</h1>
                        <h2 className='mt-4 md:ml-64'>Taosif </h2>
                    </div>
                    <h3 className='md:text-xl ml-8 md:ml-0 font-bold text-xl mt-3'>Mountain weather beats route planning
                    </h3>
                    <h4 className='text-sm mt-3 ml-8 md:ml-0 '> Some visit the plance to climb and pass the Watzmann, a mountain whose striking summit towers a whopping 2713 metres into</h4>
                </div>
                <div>
                    <img className='md:mt-0 mt-4' src="https://i.ibb.co/L5XcCxD/sean-delshadi-lr-Tcl-BKLo-Sg-unsplash.jpg" alt="" />
                    <div className='flex ml-8 md:ml-0'>
                        <h1 className='mt-4'>June 10 2022</h1>
                        <h2 className='mt-4 md:ml-64'>Sofia</h2>
                    </div>
                    <h3 className='md:text-xl ml-8 md:ml-0 font-bold text-xl mt-3'>Winter Riding Routes That Are Awesome!
                    </h3>
                    <h4 className='text-sm mt-3 ml-8 md:ml-0 '>Where the Expedition truly distinguishes itself from the Norden 901 is in componentry. It shares the more stout Xplor suspension</h4>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;