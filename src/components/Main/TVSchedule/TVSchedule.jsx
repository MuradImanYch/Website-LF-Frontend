import React, {useEffect, useState} from 'react';
import './TVSchedule.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';

const MatchesSchedule = () => {
    const[matchesSchedule, setMatchesSchedule] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://legfootball.herokuapp.com/matchesSchedule')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('matchesSchedule', JSON.stringify(response.data));
                }
                setMatchesSchedule(JSON.parse(localStorage.getItem('matchesSchedule')) && JSON.parse(localStorage.getItem('matchesSchedule')).splice(0, 12).map((e, i) => {
                    return <div key={'matchesSchedule' + i} className="col">
                                <div className="channel">
                                    <LazyLoad offset={800}>
                                        <img src={e.channel} alt="channel" />
                                    </LazyLoad>
                                </div>
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