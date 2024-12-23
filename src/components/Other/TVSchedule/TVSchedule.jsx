import React, {useEffect, useState} from 'react';
import './TVSchedule.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import {Helmet} from 'react-helmet-async';

const TVSchedule = () => {
    const[matchesSchedule, setMatchesSchedule] = useState();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/tv/schedule')
            .then(response => {
                setMatchesSchedule(response.data && response.data.map((e, i) => {
                    return <div key={'matchesSchedule' + i} className="col">
                                <div className="channel"><LazyLoad offset={800}><img loading="lazy" src={e.channel} alt="channel" /></LazyLoad></div>
                                <div className="timeProgramme">
                                    <span>{e.time}</span>
                                    <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.programme}</span>
                                </div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }

        // fetchData();
    }, []);

    return (
        <div id='tvScheduleOther'>
            <Helmet>
                <title>ТВ расписание матчей - Ежедневная ТВ программа</title>
                <meta name="description" content="Планируете смотреть футбольные матчи и не хотите пропустить ни одной важной игры? Получите актуальное ТВ расписание матчей, узнайте время и каналы трансляции." />
                <meta name="keywords" content="расписание матчей, программа спортивных событий, трансляция футбольных матчей, график спортивных трансляций, расписание футбольных игр на тв, тв-трансляции спорта, спортивные события в эфире, программа просмотра футбольных матчей, программа матчей футбол" />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">ТВ расписание</h1>
            <section>
                <div className="wrap">
                    {matchesSchedule}
                </div>
            </section>
        </div>
    );
};

export default TVSchedule;