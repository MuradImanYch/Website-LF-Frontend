import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/eplLogo.webp';
import Helmet from 'react-helmet';

const Fixtures = () => {
    const [fixtures, setFixtures] = useState([]);
    const [tourSeparators, setTourSeparators] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0); // scroll top, when open page
  }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('/fixtures/epl');
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
      
          fetchData();
    }, []);

    return (
        <div className='leagueFixtures'>
          <Helmet>
                <title>Английская Премьер Лига (АПЛ) - расписание матчей - на Legendary Football</title>
                <meta name="description" content="Календарь матчей чемпионата англии (АПЛ)." />
                <meta name="keywords" content="апл, чемпионат англии, английский футбол, футбол, манчестер сити, манчестер юнайтед, челси, арсенал, календарь апл, расписание апл, английская премьер лига" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy content='АПЛ'><img src={logo} alt="logo" /></Tippy>
                </LazyLoad>
                <h1 className="pageName">Календарь - Английская Премьер-Лига</h1>
            </div>
            {fixtures && fixtures.length > 0 ? fixtures.map((fixture, index) => (
        <React.Fragment key={'epl' + index}>
          {tourSeparators.includes(index) && <hr />} {/* Вставляем разделитель, если необходимо */}
          <div className="col">
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' }} className="round">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' }}>{fixture.round}</span>
            </div>
            <div className="center">
              <span className="hName">{fixture.hName}</span>
              <LazyLoad offset={800}>
                <Tippy content={fixture.hName}>
                  <img src={fixture.hLogo} alt={fixture.hName} />
                </Tippy>
              </LazyLoad>
              <span className="hScore" style={fixture.dateTime.includes(':') ? null : { background: '#f02d54', color: '#fff', borderColor: '#f02d54' }}>
                {fixture.hScore}
              </span>
              -
              <span className="aScore" style={fixture.dateTime.includes(':') ? null : { background: '#f02d54', color: '#fff', borderColor: '#f02d54' }}>
                {fixture.aScore}
              </span>
              <span></span>
              <LazyLoad offset={800}>
                <Tippy content={fixture.aName}>
                  <img src={fixture.aLogo} alt={fixture.aName} />
                </Tippy>
              </LazyLoad>
              <span className="aName">{fixture.aName}</span>
            </div>
            <div style={fixture.dateTime.includes(':') ? null : { background: '#f02d54' }} className="dateTime">
              <span style={fixture.dateTime.includes(':') ? null : { color: '#fff' }}>
                {fixture.dateTime.includes(':') ? (fixture.dateTime.includes(',') ? fixture.dateTime : 'Сегодня, ' + fixture.dateTime) : fixture.dateTime}
              </span>
            </div>
          </div>
        </React.Fragment>
      )) : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Fixtures;