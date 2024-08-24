import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Slider = () => {
    return (
        <div>
            <Carousel autoPlay >
                <div>
                    <img src="https://i.ibb.co/rHHfhdF/banner-image-168827119571643.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/P17gWFk/banner-image-172247255649308.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/VMS2Mcr/banner-image-163046875999311.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/NTXpD1z/banner-image-165838353587341.jpg" />
                </div>
                <div>
                    <img src="https://i.ibb.co/1fzN29P/banner-image-165838484769234.jpg" />
                </div>

            </Carousel>
        </div>
    );
};

export default Slider;