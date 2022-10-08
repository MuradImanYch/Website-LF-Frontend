import React, { useEffect, useState } from 'react';
import './MainSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import $ from 'jquery';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Pagination]);

const NewsSlider = () => {
    const[newsSlider, setNewsSlider] = useState(); 
    
    useEffect(() => {
            $.ajax({
                type: "GET",
                url: '/mainSlider'
            }).done(function (response) {
                if(response.length > 0) {
                    localStorage.setItem('mainSlider', JSON.stringify(response));
                }
                setNewsSlider(JSON.parse(localStorage.getItem('mainSlider')) && JSON.parse(localStorage.getItem('mainSlider')).splice(0, 8).map((news, i) => {
                    return <SwiperSlide key={'key' + i} id={'id' + i}>
                        <Link to={`/news/${news.id}`}>
                            <span>{news.date}</span>
                            <img src={news.img} alt="img" />
                            <h2>{news.title}</h2>
                        </Link>
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