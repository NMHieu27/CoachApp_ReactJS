import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import { useState } from 'react';
import './CoachImagesSlider.scss';
function CoachImagesSlider({ images }) {
    const [activeThumb, setActiveThumb] = useState();
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{ swiper: activeThumb }}
                className="coach-images-slider"
            >
                {images.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img src={item.url} alt="coach images" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                modules={[Navigation, Thumbs]}
                className="coach-images-slider-thumbs"
            >
                {images.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="coach-images-slider-thumbs-wrapper">
                            <img src={item.url} alt="coach images" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

CoachImagesSlider.propTypes = {
    images: PropTypes.array.isRequired,
};
export default CoachImagesSlider;
