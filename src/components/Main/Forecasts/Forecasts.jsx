import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Forecasts.css';

const Forecasts = () => {
    const[forecasts, setForecasts] = useState();

    useEffect(() => {
        $.ajax({
            type: "GET",
            url: '/forecasts',
        }).done(function (response) {
            setForecasts(response && response.map((e, i) => {
                return  <div className="col" id={'id' + i} key={'key' + i}>
                            <div><span className="lName">{e.lName}</span></div>
                            <div className='center'>
                                <div className='hName'><img src={'https://kushvsporte.ru/' + e.hLogo} alt={e.hName} title={e.hName} /><span>{e.hName}</span></div>
                                <span>{e.date}</span>
                                <div className='aName'><span>{e.aName}</span><img src={'https://kushvsporte.ru/' + e.aLogo} alt={e.aName} title={e.aName} /></div>
                            </div>
                            <div className="hr">
                                <hr />
                                <div className="predicCoef">
                                    <span>{e.prediction}</span>
                                    <span>|</span>
                                    <span>{e.coefficient}</span>
                                </div>
                            </div>
                        </div>
            }));
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