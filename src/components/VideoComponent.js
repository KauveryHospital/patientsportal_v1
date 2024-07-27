import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import video1 from '../assets/images/ABHAImage@1x.png';
import video2 from '../assets/images/CreateABHAVector@1x.png';
import video3 from '../assets/images/KauveryLogo@1x.png';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

const VideoSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    };

    return (
        <div style={styles.videoSliderContainer}>
        <Slider {...settings}>
            <div style={styles.videoSlide}>
                <video controls style={styles.video}>
                    <source src={video1} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div style={styles.videoSlide}>
                <video controls style={styles.video}>
                    <source src={video2} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div style={styles.videoSlide}>
                <video controls style={styles.video}>
                    <source src={video3} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </Slider>
    </div>
);
};

const styles = {
videoSliderContainer: {
    width: '50%',
    height: '350px',
    margin: 'auto',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    // overflow: 'hidden'
},
videoSlide: {
    outline: 'none'
},
video: {
    width: '100%',
    height: 'auto'
},
};

export default VideoSlider;
