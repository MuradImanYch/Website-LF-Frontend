import React, { useEffect, useState } from 'react';
import './Forecasts.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Forecasts = () => {
    const[forecasts, setForecasts] = useState();

    useEffect(() => {
        axios.get('/forecasts')
        .then(response => {
            if(response.data.length > 0) {
                localStorage.setItem('forecasts', JSON.stringify(response.data));
            }
            setForecasts(JSON.parse(localStorage.getItem('forecasts')) && JSON.parse(localStorage.getItem('forecasts')).map((e, i) => {
                return  <div className="col" id={'forecasts' + i} key={'forecasts' + i}>
                            <div><span className="lName">{e.lName}</span></div>
                            <div className='center'>
                                <div className='hName'><Tippy content={e.hName}><img src={'https://kushvsporte.ru/' + e.hLogo} alt={e.hName} /></Tippy><span>{e.hName}</span></div>
                                <span>{e.date}</span>
                                <div className='aName'><span>{e.aName}</span><Tippy content={e.aName}><img src={'https://kushvsporte.ru/' + e.aLogo} alt={e.aName} /></Tippy></div>
                            </div>
                            <div className="hr">
                                <hr />
                                <div className="predicCoef">
                                    <span>{e.prediction}</span>
                                    <span>|</span>
                                    <span>{'КФ ' + e.coefficient}</span>
                                </div>
                            </div>
                        </div>
            }));
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className='forecasts'>
            <section>
                <h3 className="sectionName">Прогнозы на матчи</h3>
                <div className="wrap">
                    {forecasts}
                </div>
            </section>
        </div>
    );
};

export default Forecasts;