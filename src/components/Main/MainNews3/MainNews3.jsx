import React, { useEffect, useState } from 'react';
import './MainNews3.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';

const MainNews3 = () => {
    const[mainNews, setMainNews] = useState(); 

    useEffect(() => { 
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/news/mainNews')
            .then(response => {
                setMainNews(response.data && response.data.reverse().splice(20, 6).map((e) => {
                    let date = new Date(e.date);
                    let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
                    let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
                    let year = date.getFullYear();
                    let hours = String(date.getHours()).length < 2 ? '0' + String(date.getHours()) : String(date.getHours());
                    let minutes = String(date.getMinutes()).length < 2 ? '0' + String(date.getMinutes()) : String(date.getMinutes());
    
                    const animIn = () => { // anim mouse in
                        $(`.newsVr #${'mainNews3' + e.id} .img img`).css({'transform': 'scale(1.04)'});
                        $(`.newsVr #${'mainNews3' + e.id}`).css({'boxShadow': '0px 0px 15px 1px #000'});
                        $(`.newsVr #${'mainNews3' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.7)'}).css({'color': 'rgb(224, 164, 79)'});
                        $(`.newsVr #${'mainNews3' + e.id} .img img`).css({'opacity': '1'});
                    }
                    const animOut = () => { // anim mouse out
                        $(`.newsVr #${'mainNews3' + e.id} .img img`).css({'transform': 'scale(1)'});
                        $(`.newsVr #${'mainNews3' + e.id}`).css({'boxShadow': '0px 0px 0px 0px #000'});
                        $(`.newsVr #${'mainNews3' + e.id} h3`).css({'backgroundColor': 'rgba(0, 0, 0, 0.1)'}).css({'color': 'rgb(255, 255, 255)'});
                        $(`.newsVr #${'mainNews3' + e.id} .img img`).css({'opacity': '0.8'});
                    }
                    return  <div key={'mainNews3' + e.id} className="cart" id={'mainNews3' + e.id} onMouseEnter={animIn} onMouseLeave={animOut}>
                                <Link to={`/news/read/${e.id}`}>
                                    <div className="img">
                                        <LazyLoad offset={800}>
                                            <img alt={e.title} src={e.img} />
                                        </LazyLoad>
                                    </div>
                                    <h3>{e.title}</h3>
                                    <span>{day + '-' + month + '-' + year + ' | ' + hours + ':' + minutes}</span>
                                    <span className='category'>{`#${e.category}`}</span>
                                </Link>
                            </div>
                })); 
            })
            .catch(err => {
                console.log(err);
            }); 
        }
        
        fetchData();
    }, []); 

    return (
        <div className='newsVr'>
            <section>
                {mainNews}
            </section>
        </div>
    );
};

export default MainNews3;