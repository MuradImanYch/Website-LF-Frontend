import React, { useEffect, useState } from 'react';
import './EndedMatches.css';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
            await axios.get('https://legfootball.herokuapp.com/matches/ended')
            .then(response => {
                if(response.data.length > 0) {
                    localStorage.setItem('endedMatches', JSON.stringify(response.data));
                }
                setEndedMatches(JSON.parse(localStorage.getItem('endedMatches')) && JSON.parse(localStorage.getItem('endedMatches')).map((e, i) => {
                    return  <Tippy key={'endedMatches' + i} offset={[0, 15]} className='endedMatchesTippy' content={e.lName.indexOf('Товарищеский') !== -1 ? 'Товарищеский' : e.lName + ' | ' + e.lRound}>
                        <div className="col">
                                <div className="rcWrap">
                                    <div className="rcht">
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer}>
                                                {e.hCards === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer}>
                                                {e.hCards === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer2}>
                                                {e.hCards2 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer2}>
                                                {e.hCards2 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer3}>
                                                {e.hCards3 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer3}>
                                                {e.hCards3 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer4}>
                                                {e.hCards4 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer4}>
                                                {e.hCards4 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer5}>
                                                {e.hCards5 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer5}>
                                                {e.hCards5 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer6}>
                                                {e.hCards6 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.hCardPlayer6}>
                                                {e.hCards6 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                    </div>
                                    <div className="rcat">
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer}>
                                                {e.aCards === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer}>
                                                {e.aCards === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer2}>
                                                {e.aCards2 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer2}>
                                                {e.aCards2 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer3}>
                                                {e.aCards3 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer3}>
                                                {e.aCards3 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer4}>
                                                {e.aCards4 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer4}>
                                                {e.aCards4 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer5}>
                                                {e.aCards5 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer5}>
                                                {e.aCards5 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer6}>
                                                {e.aCards6 === 'yellowred' ? <img src={yellowRedCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                        <LazyLoad offset={800}>
                                            <Tippy content={e.aCardPlayer6}>
                                                {e.aCards6 === 'redcard' ? <img src={redCard} width={'14px'} alt="КК" /> : false}
                                            </Tippy>
                                        </LazyLoad>
                                    </div>
                                </div>
                                <span className="hName">{e.hName}</span>
                                <span className="hLogo">{e.hLogo === undefined ? <LazyLoad offset={800}><Tippy content={e.hName}><img width={'13px'} src={undefTeam} alt={e.hName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy content={e.hName}><img src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad>}</span>
                                <span className="hScore">{e.hScore}</span>
                                <span className='lLogo'>
                                    <LazyLoad offset={800}>
                                        <img src={e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lName} />
                                    </LazyLoad>
                                </span>
                                <span className="aScore">{e.aScore}</span>
                                <span className="aLogo">{e.aLogo === undefined ? <LazyLoad offset={800}><Tippy content={e.aName}><img width={'13px'} src={undefTeam} alt={e.aName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy content={e.aName}><img src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad>}</span>
                                <span className="aName">{e.aName}</span>
                            </div>
                    </Tippy>
                })); 
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
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