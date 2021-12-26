import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation
} from 'swiper';
import styles from '../../../styles/Header.module.css'


SwiperCore.use([Navigation]);

function CastSlide() {
    return (
        <div>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}

                // navigation={true}
                style={{width:"40%"}}
            >
                <SwiperSlide ><img style={{width:"50%"}} src='luffy.png'></img></SwiperSlide>
                <SwiperSlide ><img style={{width:"50%"}} src='zoro.jpg'></img></SwiperSlide>
                <SwiperSlide ><img style={{width:"50%"}} src='chopper.png'></img></SwiperSlide>
                <SwiperSlide ><img style={{width:"50%"}} src='nami.jpg'></img></SwiperSlide>
                
            </Swiper>


        </div >
    )
}

export default CastSlide
