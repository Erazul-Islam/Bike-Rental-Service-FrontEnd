import React from 'react';
import Slider from '../../component/carousel/Slider';
import Footer from '../../component/Footer/Footer';
import Contact from '../../component/contact/Contact';
import Testimonial from './Testimonial/Testimonial';
import Choose from './Choose/Choose';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Contact />
            <Testimonial />
            <Choose />
            <Footer></Footer>
        </div>
    );
};

export default Home;