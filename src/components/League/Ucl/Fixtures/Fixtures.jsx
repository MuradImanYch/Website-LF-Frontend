import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/uclLogo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const Fixtures = () => {
    const [fixtures, setFixtures] = useState([]);
    const [tourSeparators, setTourSeparators] = useState([]);

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

    useEffect(() => {
      window.scrollTo(0, 0); // scroll top, when open page
  }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('/fixtures/ucl');
              const data = response.data;
      
              setFixtures(data);
      
              // Создаем массив разделителей на основе значений раундов
              const separators = [];
              let currentRound = '';
      
              for (let i = 0; i < data.length; i++) {
                const round = data[i].round;
      
                if (round !== currentRound) {
                  separators.push(i);
                  currentRound = round;
                }
              }
      
              setTourSeparators(separators);
            } catch (error) {
              console.log(error);
            }
          };
      
          // fetchData();
    }, []);

    return (
        <div className='leagueFixtures'>
          <Helmet>
                <title>Лига Чемпионов (ЛЧ) - Расписание матчей</title>
                <meta name="description" content="Календарь матчей Лиги Чемпионов (ЛЧ)." />
                <meta name="keywords" content="расписание лч, лига чемпионов расписание, расписание матчей лиги чемпионов, лч расписание, расписание лиги чемпионов, европейский футбол календарь, календарь лч, лч календарь, бавария расписание, реал мадрид расписание, ливерпуль расписание, милан расписание, манчестер сити расписание" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='ЛЧ'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>Календарь - Лига Чемпионов</h1>
            </div>
            {fixtures && fixtures.length > 0 ? fixtures.map((fixture, index) => (
        <React.Fragment key={'ucl' + index}>
          {tourSeparators.includes(index) && <hr />} {/* Вставляем разделитель, если необходимо */}
          <div className="col">
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' }} className="round">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' }}>{fixture.round}</span>
            </div>
            <div className="center">
              <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fixture.hName ? fixture.hName : '—'}</span>
              <LazyLoad offset={800}>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={fixture.hName}>
                  <img loading="lazy" src={fixture.hLogo} alt={fixture.hName} />
                </Tippy>
              </LazyLoad>
              <span className="hScore" style={{...(fixture.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>
                {fixture.hScore}
              </span>
              <span className="aScore" style={{...(fixture.dateTime.includes(':') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>
                {fixture.aScore}
              </span>
              <span></span>
              <LazyLoad offset={800}>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={fixture.aName}>
                  <img loading="lazy" src={fixture.aLogo} alt={fixture.aName} />
                </Tippy>
              </LazyLoad>
              <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fixture.aName ? fixture.aName : '—'}</span>
            </div>
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' }} className="dateTime">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' }}>
                {fixture.dateTime.includes(':') ? (fixture.dateTime.includes(',') ? fixture.dateTime.split(',')[0] + ', ' + convertGermanToclientTime(fixture.dateTime.split(',')[1]) : 'Сегодня, ' + convertGermanToclientTime(fixture.dateTime)) : fixture.dateTime}
              </span>
            </div>
          </div>
        </React.Fragment>
      )) : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Fixtures;