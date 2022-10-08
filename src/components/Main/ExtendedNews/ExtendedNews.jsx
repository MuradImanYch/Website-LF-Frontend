import React, { useEffect } from 'react';
import './ExtendedNews.css';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

const ExtendedNews = () => {
    const {id} = useParams();

    let items = ['mainSlider', 'transferNews', 'mainNews2', 'mainNews3', 'mainNews4', 'mainNews5', 'mainNews'];
    let arr = [];

    // push all endpoints to all
    items.map((e) => {
        arr.push(JSON.parse(localStorage.getItem(e)));
    });

    let result = arr.map((e) => {
        return e.filter(e => e.id === id);
    });

    const results = result.filter(element => { // remove empty arr
        if (Object.keys(element).length !== 0) {
          return true;
        }
      
        return false;
    });

    useEffect(() => {
        $('.extendedNews .textWrap').html(results[0][0].description).hide();
        $('.extendedNews a').removeAttr('href');
        $('.extendedNews .textWrap').fadeIn('fast');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }, []);

    return (
        <div className='extendedNews'>
            <div className="container">
                <div className="postWrap">
                    <h1 className="pageName">{results[0][0].title}</h1>
                    <span className="date">{results[0][0].date}</span>
                    <div className='textWrap'></div>
                </div>
            </div>
        </div>
    );
};

export default ExtendedNews;