import React, {useEffect, useState} from 'react';
import './TVSchedule.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import Helmet from 'react-helmet';

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
                                    <span>{e.programme}</span>
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
        <div id='tvScheduleOther'>
            <Helmet>
                <title>ТВ расписание матчей - на Legendary Football</title>
                <meta name="description" content="Планируете смотреть футбольные матчи и не хотите пропустить ни одной важной игры? Получите актуальное ТВ расписание матчей и узнайте время и каналы трансляции для любимых команд. Никаких упущенных моментов!" />
                <meta name="keywords" content="тв расписание матчей, телепередача спортивных событий, трансляция футбольных матчей, график спортивных трансляций, программа телевизионных матчей, расписание футбольных игр на тв, тв-трансляции спорта, спортивные события в эфире, программа просмотра футбольных матчей, тв-график спортивных соревнований" />
            </Helmet>
            <h1 className="pageName">ТВ расписание</h1>
            <section>
                <div className="wrap">
                    {matchesSchedule}
                </div>
            </section>
        </div>
    );
};

export default TVSchedule;