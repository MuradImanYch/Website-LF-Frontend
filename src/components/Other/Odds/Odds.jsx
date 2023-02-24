import React, { useEffect, useState } from 'react';
import './Odds.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';

const Forecasts = () => {
    const[forecasts, setForecasts] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/forecasts')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('forecasts', JSON.stringify(response.data));
                }
                setForecasts(JSON.parse(localStorage.getItem('forecasts')) && JSON.parse(localStorage.getItem('forecasts')).map((e, i) => {
                    return  <div className="col" key={'forecasts' + i}>
                                <div>
                                    <div className="head"><span>{e.lCountryName}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>{e.lName}</span></div>
                                    <div className="center">
                                        <div className="home"><LazyLoad offset={800}><Tippy content={e.hName}><img src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span>{e.hName}</span></div>
                                        <div className="dateTime"><span>{e.date}</span><span>{e.time}</span></div>
                                        <div className="away"><span>{e.aName}</span><LazyLoad offset={800}><Tippy content={e.aName}><img src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
                                    </div>
                                </div>
                                <div className="coefWrap">
                                    <div className="w1">
                                        <Tippy content="Победа первой команды"><span>П1</span></Tippy>
                                        <span>{e.w1 === '' ? '-' : e.w1}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy content="Ничья"><span>Х</span></Tippy>
                                        <span>{e.draw === '' ? '-' : e.draw}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy content="Победа второй команды"><span>П2</span></Tippy>
                                        <span>{e.w2 === '' ? '-' : e.w2}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy content="Будет забито меньше 2-ух (включительно) мячей"><span>ТМ 2.5</span></Tippy>
                                        <span>{e.tu === '' ? '-' : e.tu}</span>
                                    </div>
                                    <div className="w1">
                                        <Tippy content="Будет забито больше 3-ёх (включительно) мячей"><span>ТБ 2.5</span></Tippy>
                                        <span>{e.to === '' ? '-' : e.to}</span>
                                    </div>
                                </div>
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
        <div id='forecastsOther'>
            <h1 className="pageName">Котировки на матчи</h1>
            <section>
                {forecasts}
            </section>
        </div>
    );
};

export default Forecasts;