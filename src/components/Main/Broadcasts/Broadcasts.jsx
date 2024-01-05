import React, { useState, useEffect } from 'react';
import './Broadcasts.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import $ from 'jquery';

const Broadcasts = () => {
    const[item, setItem] = useState();

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
            const clientDate = new Date(germanDate.getTime() + ((-clientUTCOffset.getTimezoneOffset() / 60) - 4) * 60 * 60 * 1000);
          
            // Получаем иранское время в формате "чч:мм"
            const clientTime = `${clientDate.getHours()}:${clientDate.getMinutes().toString().padStart(2, '0')}`;
          
            return clientTime;
          }

        const fetchData = async () => {
            await axios.get('/broadcasts/get')
            .then(response => {
                setItem(response.data && response.data.splice(0, 8).map((e) => {    
                    return <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Смотреть' key={'broadcast' + e.id}>
                                <Link to={`/broadcast/watch/${e.id + '-' + cyrillicToTranslit().transform(e.hName + '-' + e.aName + '-' + e.lName).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`} id={'broadcast' + e.id}>
                                    <div className="col">
                                        <div><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.hName}><img loading="lazy" src={e.hLogo} alt={e.hName} /></Tippy></LazyLoad><span>{e.hName}</span></div>
                                        <div className='timeLive'>
                                            <LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.lName}><img loading="lazy" src={e.lLogo} alt={e.lName} /></Tippy></LazyLoad>
                                            {e.broadcastLink === null || e.broadcastLink === '' ? <span>{convertGermanToclientTime(e.time)}</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>live <br /><div className="liveTime">{convertGermanToclientTime(e.time)}</div></span>}
                                        </div>
                                        <div><span>{e.aName}</span><LazyLoad offset={800}><Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={e.aName}><img loading="lazy" src={e.aLogo} alt={e.aName} /></Tippy></LazyLoad></div>
                                    </div>
                                </Link>
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
        <div id='broadcastsQckNav' className='broadcasts'>
            <h2 className="sectionName">Трансляция матчей</h2>
            <div className="wrap">
                {item && item.length > 0 ? item : <div className='noData'>Данных нет</div>}
                {item && item.length > 0 && <Link style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} to='/other/broadcasts'>Все матчи</Link>}
            </div>
        </div>
    );
};

export default Broadcasts;