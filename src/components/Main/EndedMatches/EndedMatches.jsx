import React, { useEffect, useState } from 'react';
import './EndedMatches.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import $ from 'jquery';

import friendly from '../../../assets/ico/friendly.webp';
import redCard from '../../../assets/ico/redCard.webp';
import yellowRedCard from '../../../assets/ico/yellowRedCard.webp';
import undefTeam from '../../../assets/ico/undefTeam.webp';
import notRecogLeague from '../../../assets/ico/notRecogLeague.webp';
import wcLogo from '../../../assets/ico/wcLogo.webp';
import LazyLoad from 'react-lazy-load';

const EndedMatches = () => {
    const[endedMatches, setEndedMatches] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/matches/ended')
            .then(response => {
                setEndedMatches(response.data && response.data.map((e, i) => {
                    return  <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'endedMatches' + i} offset={[0, 15]} className='endedMatchesTippy' content={e.lName.indexOf('Товарищеский') !== -1 ? 'Товарищеский' : e.lName + ' | ' + e.lRound}>
                        <div className="col">
                                <div className="rcWrap">
                                    <div className="rcht">
                                        {e.hCards === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards2 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards2 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards3 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards3 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards4 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards4 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards5 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards5 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards6 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.hCards6 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                    </div>
                                    <div className="rcat">
                                        {e.aCards === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards2 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards2 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards3 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards3 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards4 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards4 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards5 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards5 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards6 === 'yellowred' ? <img loading="lazy" src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                        {e.aCards6 === 'redcard' ? <img loading="lazy" src={redCard} width={'14px'} alt="КК" /> : false}
                                    </div>
                                </div>
                                <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName}</span>
                                <span className="hLogo">{e.hLogo === null ? <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" width={'13px'} src={undefTeam} alt={e.hName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad>}</span>
                                <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hScore}</span>
                                <span className='lLogo'>
                                    <LazyLoad offset={800}>
                                        <img loading="lazy" src={e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lName} />
                                    </LazyLoad>
                                </span>
                                <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.aScore}</span>
                                <span className="aLogo">{e.aLogo === null ? <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" width={'13px'} src={undefTeam} alt={e.aName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad>}</span>
                                <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.aName}</span>
                            </div>
                    </Tippy>
                })); 
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        // fetchData();
    }, []);

    return (
        <div id='endedMatches'>
            <section id='oddsQckNav expectedMatchesQckNav'>
                <h2 className="sectionName">Завершенные матчи</h2>
                <div className="wrap">
                    {endedMatches && endedMatches.length > 0 ? endedMatches : <div className='noData'>Данных нет</div>}
                </div>
            </section>
        </div>
    );
};

export default EndedMatches;