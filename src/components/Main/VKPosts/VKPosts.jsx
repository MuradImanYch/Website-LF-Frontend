import React from 'react';
import './VKPosts.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper';

SwiperCore.use([Pagination, Autoplay, Navigation]);

const VKPosts = () => {
    return (
        <div id='vkPosts'>
            <Swiper navigation pagination={{clickable: true}} autoplay={{delay: 4000, disableOnInteraction: false}}>
                <SwiperSlide>
                    <div id="vk_post_-135007012_240466"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div id="vk_post_-135007012_240480"></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div id="vk_post_-135007012_240441"></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default VKPosts;