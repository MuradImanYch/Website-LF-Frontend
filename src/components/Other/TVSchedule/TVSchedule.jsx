import React, {useEffect, useState} from 'react';
import './TVSchedule.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';

const TVSchedule = () => {
    const[matchesSchedule, setMatchesSchedule] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/tv/schedule')
            .then(response => {
                setMatchesSchedule(response.data && response.data.map((e, i) => {
                    return <div key={'matchesSchedule' + i} className="col">
                                <div className="channel"><LazyLoad offset={800}><img src={e.channel} alt="channel" /></LazyLoad></div>
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