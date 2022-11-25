import React, { useEffect, useState } from 'react';
import './MainSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import axios from 'axios';

SwiperCore.use([Autoplay, Pagination]);

const NewsSlider = () => {
    const[newsSlider, setNewsSlider] = useState(); 
    
    useEffect(() => {
        axios.get('/mainNews')
        .then(response => {
            setNewsSlider(response.data && response.data.reverse().splice(0, 8).map((e) => {
                let date = new Date(e.date);
                let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth()) : String(date.getMonth());
                let year = date.getFullYear();
                let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());

                return <SwiperSlide key={'maiSlider' + e.id} id={'maiSlider' + e.id}>
                    <Link to={`/news/read/${e.id}`}>
                        <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                        <img src={e.img} alt="img" />
                        <h2>{e.title}</h2>
                    </Link>
                </SwiperSlide>
            })); 
        })
        .catch(err => {
            console.log(err);
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