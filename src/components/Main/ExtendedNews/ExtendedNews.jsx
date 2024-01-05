import React, { useEffect, useState } from 'react';
import './ExtendedNews.css';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import $ from 'jquery';
import Helmet from 'react-helmet';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

import unliked from '../../../assets/ico/unliked.webp';
import liked from '../../../assets/ico/liked.webp';

const parse = require('html-react-parser');

const ExtendedNews = () => {
    const {id} = useParams();
    const[selected, setSelected] = useState();
    const location = useLocation();
    const[isLiked, setIsLiked] = useState();
    const[likeBtn, setLikeBtn] = useState();
    const[isViewed, setIsViewed] = useState();

    useEffect(() => {
        $("html, body").animate({ scrollTop: 0 }, "fast");

        const fetchData = async () => {
            await axios.get('/news/allNews')
            .then(response => {
                setSelected(response.data.find((obj) => {
                    return obj.id + '-' + cyrillicToTranslit().transform(obj.title).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase() === id;
                }));
            })
            .catch(err => {
                console.log(err);
            });
    
            $('.extendedNews').hide();
            $('.extendedNews').fadeIn('slow');

            location.pathname.includes('/read') && await axios.get('https://api.ipify.org/')
            .then(response => {
                axios.post('/like/checkIP', {
                    clientIP: response.data,
                    id: id.split('-')[0]
                })
                .then(response => {
                    setIsLiked(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });

            location.pathname.includes('/read') && await axios.get('https://api.ipify.org/')
            .then(response => {
                axios.post('/views/post', {
                    clientIP: response.data,
                    id: id.split('-')[0]
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });

            location.pathname.includes('/read') && await axios.get('https://api.ipify.org/')
            .then(response => {
                axios.post('/views/checkIP', {
                    clientIP: response.data,
                    id: id.split('-')[0]
                })
                .then(response => {
                    setIsViewed(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
    }, [id]);

    useEffect(() => {
        setLikeBtn(
            isLiked && isLiked === -1 || isLiked === false ? <img loading="lazy" title='Нравится' onClick={like} className='unliked' src={unliked} /> : <img loading="lazy" title='Нравится' className='liked' src={liked} />
        );
    }, [isLiked]);

    const like = async () => {
        await axios.get('https://api.ipify.org/')
        .then(response => {
            axios.post('/like/post', {
                clientIP: response.data,
                id: id
            })
            .catch(err => {
                if(err) throw err;
            });
        })
        .catch(err => {
            console.log(err);
        });

        setLikeBtn(<img loading="lazy" className='liked' src={liked} />);
        $('.likes .likeNum').html(!selected.likes?.split(',').length ? +$('.likes').val() + 1 : selected.likes?.split(',').length + 1);
    }
    
    function convertDate(str) { // convert date & time
        let date = new Date(str);
        let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
        let month = String(date.getMonth() + 1).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
        let year = date.getFullYear();
        let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
        let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
        return day + '-' +
          month + '-' +
          year + ' | ' +
          hours + ':' +
          minutes;
      }

    return (
        <div className='extendedNews'>
            <Helmet>
                <title>{selected && selected.title + ' - Legendary Football'}</title>
                <meta name="description" content={selected && selected.meta_description} />
                <meta name="keywords" content={selected && selected.meta_keywords} />
            </Helmet>
            <section>
                <div className="container">
                    <div className="postWrap">
                        <article>
                            <h1 className="pageName">{selected && selected.title}</h1>
                            <div className="dateCategory">
                                <ul>
                                    <li className='category'>{selected && selected.category}</li>
                                </ul>
                                <span className="date">{selected && convertDate(selected.date)}</span>
                            </div>
                            <img loading="lazy" id='mainImg' src={selected && selected.img} alt="newsImg" />
                            <div className='textWrap'>
                                <p><strong>{selected && selected.meta_description}</strong></p>
                                {selected && parse(selected.content)}
                            </div>
                            <div className="likes"><span title='Просмотры' className='views'>👁 {isViewed && isViewed}</span> {likeBtn} <span title='Нравится' className='likeNum'>{selected && selected.likes?.split(',').length > 0 ? selected.likes?.split(',').length : 0}</span></div>
                        </article>
                    </div>
                    <i className='author'>{selected && selected.author}</i>
                </div>
            </section>
        </div>
    );
};

export default ExtendedNews;