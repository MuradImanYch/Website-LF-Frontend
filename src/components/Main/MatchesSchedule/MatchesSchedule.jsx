import React, {useEffect, useState} from 'react';
import './MatchesSchedule.css';
import axios from 'axios';

const MatchesSchedule = () => {
    const[matchesSchedule, setMatchesSchedule] = useState();

    useEffect(() => {
        axios.get('/matchesSchedule')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('matchesSchedule', JSON.stringify(response.data));
            }
            setMatchesSchedule(JSON.parse(localStorage.getItem('matchesSchedule')) && JSON.parse(localStorage.getItem('matchesSchedule')).splice(0, 12).map((e, i) => {
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
        <div id='matchesSchedule'>
            <section>
                <h3 className="sectionName">Телепрограмма</h3>
                <div className="wrap">
                    {matchesSchedule}
                </div>
            </section>
        </div>
    );
};

export default MatchesSchedule;