import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/euroQualLogo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';

const Results = () => {
    const [results, setResults] = useState([]);
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
          const response = await axios.get('/results/euQual');
          const data = response.data;
  
          setResults(data);
  
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
        <div className='leagueResults'>
          <Helmet>
                <title>европейская Квалификация - результаты матчей - на Legendary Football</title>
                <meta name="description" content="Результаты матчей отборочного турнира европейского континента." />
                <meta name="keywords" content="европейская квалификация, отборочный турнир, европейский футбол, футбол, сборная англии, сборная германии, сборная испании, сборная италии, результаты отборочного турнира, прошедшие матчи европейской квалификации" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Европейская квалификация'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Результаты - Европейская квалификация</h1>
            </div>
            {results && results.length > 0 ? results.map((fixture, index) => (
        <React.Fragment key={'euQual' + index}>
          {tourSeparators.includes(index) && <hr />} {/* Вставляем разделитель, если необходимо */}
          <div className="col">
            
            <div className="round" style={fixture.dateTime === 'Завершен' || fixture.dateTime.includes(':') ? {background: '#ffbf66'} : {background: '#f02d54'}}>
              <span style={fixture.dateTime === 'Завершен' || fixture.dateTime.includes(':') ? {color: '#000'} : {color: '#fff'}}>{fixture.round}</span>
            </div>
            <div className="center">
              <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fixture.hName}</span>
              <LazyLoad offset={800}>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={fixture.hName}>
                  <img loading="lazy" src={fixture.hLogo} alt={fixture.hName} />
                </Tippy>
              </LazyLoad>
              <span className="hScore" style={{...(fixture.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && fixture.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>
                {fixture.hScore}
              </span>
              <span className="aScore" style={{...(fixture.dateTime.includes('Завершен') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'} && fixture.dateTime.includes(',') ? null : {background: '#f02d54', color: '#fff', borderColor: '#f02d54'}), ...(localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null)}}>
                {fixture.aScore}
              </span>
              <span></span>
              <LazyLoad offset={800}>
                <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={fixture.aName}>
                  <img loading="lazy" src={fixture.aLogo} alt={fixture.aName} />
                </Tippy>
              </LazyLoad>
              <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{fixture.aName}</span>
            </div>
            <div className="dateTime" style={fixture.dateTime === 'Завершен' || fixture.dateTime.includes(':') ? {background: '#ffbf66'} : {background: '#f02d54'}}>
              <span style={fixture.dateTime === 'Завершен' || fixture.dateTime.includes(':') ? {color: '#000'} : {color: '#fff'}}>
                {fixture.dateTime.includes(':') ? (fixture.dateTime.includes(',') ? fixture.dateTime.split(',')[0] + ', ' + convertGermanToclientTime(fixture.dateTime.split(',')[1]) : 'Сегодня, ' + convertGermanToclientTime(fixture.dateTime)) : fixture.dateTime}
              </span>
            </div>
          </div>
        </React.Fragment>
      )) : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Results;