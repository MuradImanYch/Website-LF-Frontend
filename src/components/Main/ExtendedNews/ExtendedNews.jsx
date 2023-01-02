import React, { useEffect, useState } from 'react';
import './ExtendedNews.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
const parse = require('html-react-parser');

const ExtendedNews = () => {
    const {id} = useParams();
    const[selected, setSelected] = useState();

    useEffect(() => {
        axios.get('/allNews')
        .then(response => {
            setSelected(response.data.find((obj) => {
                return obj.id === +id;
            }));
        })
        .catch(err => {
            console.log(err);
        });

        $('.extendedNews').hide();
        $('.extendedNews').fadeIn('slow');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }, []);
    
    function convertDate(str) { // convert date & time
        let date = new Date(str);
        let day = String(date.getDate()).length < 2 ? '0' + String(date.getDate()) : String(date.getDate());
        let month = String(date.getMonth()).length < 2 ? '0' + String(date.getMonth() + 1) : String(date.getMonth() + 1);
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
            <section>
                <div className="container">
                    <div className="postWrap">
                        <article>
                            <h1 className="pageName">{selected && selected.title}</h1>
                            <span className="date">{selected && convertDate(selected.date)}</span>
                            <img id='mainImg' src={selected && selected.img} alt="newsImg" />
                            <div className='textWrap'>{selected && parse(selected.content)}</div>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExtendedNews;