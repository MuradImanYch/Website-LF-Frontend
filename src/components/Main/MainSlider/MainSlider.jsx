import React, { useEffect, useState } from 'react';
import './MainSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import $ from 'jquery';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';

SwiperCore.use([Autoplay, Pagination]);

const NewsSlider = () => {
    const[newsSlider, setNewsSlider] = useState(); 
    
    useEffect(() => {
            $.ajax({
                type: "GET",
                url: '/mainSlider'
            }).done(function (response) {
                setNewsSlider(response && response.splice(0, 8).map((news, i) => {
                    return <SwiperSlide key={'key' + i} id={'id' + i}>
                        <a href={`https://footballhd.ru/articles${news.src}`} target="_blank">
                            <span>{news.date}</span>
                            <img src={news.img} alt="img" />
                            <h2>{news.title}</h2>
                        </a>
                    </SwiperSlide>
                })); 
            });
    }, []);

    return (
        <div id="newsSlider">
                <section>
                    <Swiper pagination={{clickable: true}} autoplay={{delay: 5000, disableOnInteraction: false}}>
                        {newsSlider}
                    </Swiper>
                </section>
        </div>
    );
};

export default NewsSlider;