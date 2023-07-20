import React, { useEffect, useState } from 'react';
import './Blogs.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation, Pagination, Lazy} from "swiper";
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import LazyLoad from 'react-lazy-load';

SwiperCore.use([Navigation, Pagination, Lazy]);

const Blogs = () => {
    const[blogs, setBlogs] = useState(); 

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('/news/blogs')
            .then(response => {
                setBlogs(response.data && response.data.reverse().splice(0, 6).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    
                    const animIn = () => { // anim mouse in
                        $(`.newsVr #${'blogs' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                        $(`.newsVr #${'blogs' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`.newsVr #${'blogs' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`.newsVr #${'blogs' + e.id} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`.newsVr #${'blogs' + e.id} .img img`).css({'transform': 'scale(1)'});
                        $(`.newsVr #${'blogs' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`.newsVr #${'blogs' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`.newsVr #${'blogs' + e.id} .img img`).css({'opacity': '0.8'});
                    }
                    return  <SwiperSlide key={'blog' + e.id}>
                        <div className="cart" id={'blogs' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}>
                                    <div className="swiper-lazy-preloader">
                                        <div className="lds-dual-ring"></div>
                                    </div>
                                    <div className="img">
                                        <LazyLoad offset={800}>
                                            <img loading="lazy" className='swiper-lazy' alt={e.title} src={e.img} />
                                        </LazyLoad>
                                    </div>
                                    <h3>{e.title}</h3>
                                    <span className='date'>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes} <span className='views'>👁 {`${e && e.views?.split(',').length > 0 ? e.views?.split(',').length : '0'}`}</span></span>
                                    <span className='category'><span className="likes">❤ {`${e && e.likes?.split(',').length > 0 ? e.likes?.split(',').length : '0'}`}</span> {`#${e.category}`}</span>
                                </Link>
                            </div>
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
        <div id='blogs' className='newsVr'>
            <section id='blogsQckNav'>
                <h2 className="sectionName">Блоги</h2>
                <Swiper lazy={true} navigation grabCursor={true} breakpoints={{280: {slidesPerView: 1, direction: 'horizontal'}, 768: {slidesPerView: 2}, 1024: {slidesPerView: 3, direction: 'vertical'}}} pagination={{type: "progressbar", clickable: true}}>
                    {blogs && blogs.length > 0 ? blogs : <div className='noData'>Данных нет</div>}
                </Swiper>
            </section>
        </div>
    );
};

export default Blogs;