import React, { useEffect, useState } from 'react';
import './MainSlider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Lazy } from 'swiper';
import { Link } from 'react-router-dom';
import axios from 'axios';

SwiperCore.use([Autoplay, Pagination, Lazy]);

const NewsSlider = () => {
    const[newsSlider, setNewsSlider] = useState(); 
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/news/mainNews')
            .then(response => {
                setNewsSlider(response.data && response.data.reverse().splice(0, 8).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    
                    return <SwiperSlide key={'mainSlider' + e.id}>
                        <Link to={`/news/read/${e.id}`}>
                            <div className="swiper-lazy-preloader">
                                <div className="lds-dual-ring"></div>
                            </div>
                            <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                <img src={e.img} className='swiper-lazy' alt="img" />
                            <h2>{e.title}</h2>
                            <span className='category'>{`#${e.category}`}</span>
                        </Link>
                    </SwiperSlide>
                })); 
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
    }, []);

    return (
        <div id="newsSlider">
                <section>
                    <Swiper lazy={true} pagination={{clickable: true}} autoplay={{delay: 5000, disableOnInteraction: false}}>
                        {newsSlider}
                    </Swiper>
                </section>
        </div>
    );
};

export default NewsSlider;