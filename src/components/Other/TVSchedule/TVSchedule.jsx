import React, {useEffect, useState} from 'react';
import './TVSchedule.css';
import axios from 'axios';

const TVSchedule = () => {
    const[matchesSchedule, setMatchesSchedule] = useState();

    useEffect(() => {
        axios.get('/matchesSchedule')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('matchesSchedule', JSON.stringify(response.data));
            }
            setMatchesSchedule(JSON.parse(localStorage.getItem('matchesSchedule')) && JSON.parse(localStorage.getItem('matchesSchedule')).map((e, i) => {
                return <div key={'matchesSchedule' + i} id={'matchesSchedule' + i} className="col">
                            <div className="channel"><img src={e.channel} alt="channel" /></div>
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