import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './ExpectedMatches.css';
import $ from 'jquery';

import friendly from '../../../assets/ico/friendly.webp';
import undefTeam from '../../../assets/ico/undefTeam.webp';
import notRecogLeague from '../../../assets/ico/notRecogLeague.webp';
import wcLogo from '../../../assets/ico/wcLogo.webp';
import LazyLoad from 'react-lazy-load';

const ExpectedMatches = () => {
    const[endedMatches, setEndedMatches] = useState();

    useEffect(() => {
        function convertGermanToclientTime(germanTime) {
            // Разбиваем строку времени на часы и минуты
            const [hours, minutes] = germanTime.split(':').map(Number);
          
            // Создаем объект Date с текущей датой и временем в немецкой временной зоне
            const germanDate = new Date();
            germanDate.setHours(hours);
            germanDate.setMinutes(minutes);

            const clientUTCOffset = new Date();
          
            // Добавляем разницу между немецким и иранским временем (2.5 часа)
            const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 2) * 60 * 60 * 1000);
          
            // Получаем иранское время в формате "чч:мм"
            const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
          
            return clientTime;
          }
          
        const fetchData = async () => {
            await axios.get('/matches/expected')
            .then(response => {
                setEndedMatches(response.data && response.data.map((e, i) => {
                    return  <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={'endedMatches' + i} offset={[0, 15]} className='endedMatchesTippy' content={e.lName.indexOf('Товарищеский') !== -1 ? 'Товарищеский' : e.lName}>
                        <div className="col">
                                <div className="dateTime" style={{...(e.dateTime === 'Завершен' || e.dateTime.includes(':') ? {color: '#000'} : {color: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>{!e.dateTime.includes(':') ? e.dateTime : e.dateTime.includes(',') ? e.dateTime.split(',')[0] + ', ' + convertGermanToclientTime(e.dateTime.split(',')[e.dateTime.split(',').length - 1]) : convertGermanToclientTime(e.dateTime)}</div>
                                <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{e.hName}</span>
                                <span className="hLogo">{e.hLogo === null ? <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" width={'13px'} src={undefTeam} alt={e.hName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad>}</span>
                                <span className="hScore" style={{
                                    ...(e.dateTime === 'Завершен' || e.dateTime.includes(':')
                                        ? { background: 'transparent' }
                                        : { background: '#f02d54', borderColor: '#f02d54', color: '#fff' }),
                                    ...(localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null),
                                    }}>
                                    {e.hScore}
                                </span>
                                <span className='lLogo'>
                                    <LazyLoad offset={800}>
                                        <img loading="lazy" src={e.lLogo === 'https://s.scr365.net/img/ball16.png' ? notRecogLeague : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/13_36_14/fPHr8_16_439.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/12_250_17/a7wHB_16_438.png' ? friendly : e.lLogo && e.lLogo === 'https://s.scr365.net/s1/logo/22_33_11/46atU_16_742.png' ? wcLogo : e.lLogo} alt={e.lName} />
                                    </LazyLoad>
                                </span>
                                <span className="aScore" style={{...(e.dateTime === 'Завершен' || e.dateTime.includes(':') ? {background: 'transparent'} : {background: '#f02d54', borderColor: '#f02d54', color: '#fff'}),
                                ...(localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null)}}>{e.aScore}</span>
                                <span className="aLogo">{e.aLogo === null ? <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" width={'13px'} src={undefTeam} alt={e.aName} /></Tippy></LazyLoad> : <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad>}</span>
                                <span style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="aName">{e.aName}</span>
                            </div>
                    </Tippy>
                })); 
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
        setInterval(() => {
            fetchData();
        }, 60000);
    }, []);

    return (
        <div id='expectedMatches'>
            <section id='endedQckNav'>
                <h2 className="sectionName">Ожидаемые матчи</h2>
                <div className="wrap">
                    {endedMatches && endedMatches.length > 0 ? endedMatches : <div className='noData'>Данных нет</div>}
                </div>
            </section>
        </div>
    );
};

export default ExpectedMatches;