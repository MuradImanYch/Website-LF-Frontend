import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/uelLogo.webp';
import Helmet from 'react-helmet';

const Results = () => {
    const [results, setResults] = useState([]);
    const [tourSeparators, setTourSeparators] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0); // scroll top, when open page
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('/results/uel');
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
  
      fetchData();
}, []);

    return (
        <div className='leagueResults'>
          <Helmet>
                <title>Лига Европы (ЛЕ) - результаты матчей - на Legendary Football</title>
                <meta name="description" content="Результаты матчей Лиги Европы (ЛЕ)." />
                <meta name="keywords" content="ле, лига европы, европейский футбол, футбол, севилья, ливерпуль, вильяреал, манчестер юнайтед, айнтрахт франкфурт, результаты ле, прошедшие матчи ле" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='ЛЕ'><img loading="lazy" src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Результаты - Лига Европы</h1>
            </div>
            {results && results.length > 0 ? results.map((fixture, index) => (
        <React.Fragment key={'uel' + index}>
          {tourSeparators.includes(index) && <hr />} {/* Вставляем разделитель, если необходимо */}
          <div className="col">
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' } && fixture.dateTime === 'Завершен' && {background: '#ffbf66'}} className="round">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' } && fixture.dateTime === 'Завершен' && {color: '#000'}}>{fixture.round}</span>
            </div>
            <div className="center">
              <span className="hName">{fixture.hName}</span>
              <LazyLoad offset={800}>
                <Tippy content={fixture.hName}>
                  <img loading="lazy" src={fixture.hLogo} alt={fixture.hName} />
                </Tippy>
              </LazyLoad>
              <span className="hScore" style={fixture.dateTime.includes(':') ? null : { background: '#f02d54', color: '#fff', borderColor: '#f02d54' } && fixture.dateTime === 'Завершен' && {background: '#fff', color: '#000', borderColor: '#ffbf66'}}>
                {fixture.hScore}
              </span>
              -
              <span className="aScore" style={fixture.dateTime.includes(':') ? null : { background: '#f02d54', color: '#fff', borderColor: '#f02d54' } && fixture.dateTime === 'Завершен' && {background: '#fff', color: '#000', borderColor: '#ffbf66'}}>
                {fixture.aScore}
              </span>
              <span></span>
              <LazyLoad offset={800}>
                <Tippy content={fixture.aName}>
                  <img loading="lazy" src={fixture.aLogo} alt={fixture.aName} />
                </Tippy>
              </LazyLoad>
              <span className="aName">{fixture.aName}</span>
            </div>
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' } && fixture.dateTime === 'Завершен' && {background: '#ffbf66'}} className="dateTime">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' } && fixture.dateTime === 'Завершен' && {color: '#000'}}>
                {fixture.dateTime.includes(':') ? (fixture.dateTime.includes(',') ? fixture.dateTime : 'Сегодня, ' + fixture.dateTime) : fixture.dateTime}
              </span>
            </div>
          </div>
        </React.Fragment>
      )) : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Results;