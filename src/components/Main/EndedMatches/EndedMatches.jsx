import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './EndedMatches.css';
import friendly from '../../../assets/ico/friendly.webp';
import redCard from '../../../assets/ico/redCard.webp';
import yellowRedCard from '../../../assets/ico/yellowRedCard.webp';

const EndedMatches = () => {
    const[endedMatches, setEndedMatches] = useState();

    useEffect(() => {
        const update = () => {
            $.ajax({
                type: "GET",
                url: '/endedMatches',
            }).done(function (response) {
                setEndedMatches(response && response.map((e, i) => {
                    return  <div key={'key' + i} className="col" id={'id' + i} title={e.lName === '' ? 'Товарищеский' : e.lName + ' | ' + e.lRound}>
                                <div className="rcWrap">
                                    <div className="rcht">
                                        {e.hCards === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer} width={'14px'} alt="КК" /> : false}
                                        {e.hCards === 'redcard' ? <img src={redCard} title={e.hCardPlayer} width={'14px'} alt="КК" /> : false}
                                        {e.hCards2 === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer2} width={'14px'} alt="КК" /> : false}
                                        {e.hCards2 === 'redcard' ? <img src={redCard} title={e.hCardPlayer2} width={'14px'} alt="КК" /> : false}
                                        {e.hCards3 === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer3} width={'14px'} alt="КК" /> : false}
                                        {e.hCards3 === 'redcard' ? <img src={redCard} title={e.hCardPlayer3} width={'14px'} alt="КК" /> : false}
                                        {e.hCards4 === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer4} width={'14px'} alt="КК" /> : false}
                                        {e.hCards4 === 'redcard' ? <img src={redCard} title={e.hCardPlayer4} width={'14px'} alt="КК" /> : false}
                                        {e.hCards5 === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer5} width={'14px'} alt="КК" /> : false}
                                        {e.hCards5 === 'redcard' ? <img src={redCard} title={e.hCardPlayer5} width={'14px'} alt="КК" /> : false}
                                        {e.hCards6 === 'yellowred' ? <img src={yellowRedCard} title={e.hCardPlayer6} width={'14px'} alt="КК" /> : false}
                                        {e.hCards6 === 'redcard' ? <img src={redCard} title={e.hCardPlayer6} width={'14px'} alt="КК" /> : false}
                                    </div>
                                    <div className="rcat">
                                        {e.aCards === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer} width={'14px'} alt="КК" /> : false}
                                        {e.aCards === 'redcard' ? <img src={redCard} title={e.aCardPlayer} width={'14px'} alt="КК" /> : false}
                                        {e.aCards2 === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer2} width={'14px'} alt="КК" /> : false}
                                        {e.aCards2 === 'redcard' ? <img src={redCard} title={e.aCardPlayer2} width={'14px'} alt="КК" /> : false}
                                        {e.aCards3 === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer3} width={'14px'} alt="КК" /> : false}
                                        {e.aCards3 === 'redcard' ? <img src={redCard} title={e.aCardPlayer3} width={'14px'} alt="КК" /> : false}
                                        {e.aCards4 === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer4} width={'14px'} alt="КК" /> : false}
                                        {e.aCards4 === 'redcard' ? <img src={redCard} title={e.aCardPlayer4} width={'14px'} alt="КК" /> : false}
                                        {e.aCards5 === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer5} width={'14px'} alt="КК" /> : false}
                                        {e.aCards5 === 'redcard' ? <img src={redCard} title={e.aCardPlayer5} width={'14px'} alt="КК" /> : false}
                                        {e.aCards6 === 'yellowred' ? <img src={yellowRedCard} title={e.aCardPlayer6} width={'14px'} alt="КК" /> : false}
                                        {e.aCards6 === 'redcard' ? <img src={redCard} title={e.aCardPlayer6} width={'14px'} alt="КК" /> : false}
                                    </div>
                                </div>
                                <span className="hName">{e.hName}</span>
                                <span className="hLogo"><img src={e.hLogo} alt={e.hName} /></span>
                                <span className="hScore">{e.hScore}</span>
                                <span className='lLogo'>{e.lLogo == '' ? <img src={friendly} alt="Товарищеский" title="Товарищеский" /> : <img src={e.lLogo} alt={e.lName} />}</span>
                                <span className="aScore">{e.aScore}</span>
                                <span className="aLogo"><img src={e.aLogo} alt={e.aName} /></span>
                                <span className="aName">{e.aName}</span>
                            </div>
                })); 
            });
        }
        update();
        setInterval(() => {
            update();
        }, 60000);
}, []);

    return (
        <div id='endedMatches'>
                <section>
                    <h3 className="sectionName">Завершенные матчи</h3>
                    <div className="wrap">
                        {endedMatches}
                    </div>
                </section>
        </div>
    );
};

export default EndedMatches;