import React from 'react';
import Slider from '../../component/carousel/Slider';
import Footer from '../../component/Footer/Footer';
import Contact from '../../component/contact/Contact';
import Testimonial from './Testimonial/Testimonial';
import Choose from './Choose/Choose';
import Discount from './Discount/Discount';
import ContactSection from '../../component/contact/ContactSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Contact />
            <Testimonial />
            <Choose />
            <Discount />
            <ContactSection />
            <Footer></Footer>
        </div>
    );
};

export default Home;