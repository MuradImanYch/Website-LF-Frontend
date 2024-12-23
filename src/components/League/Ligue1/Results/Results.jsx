import React, { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
import logo from '../../../../assets/ico/ligue1Logo.webp';
import {Helmet} from 'react-helmet-async';
import $ from 'jquery';
import translate from 'translate';

import config from '../../../../conf.json';

const Results = () => {
    const [fixtures, setFixtures] = useState([]);
    const [tourSeparators, setTourSeparators] = useState([]);
    const [liveMatches, setLiveMatches] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                  league: '61',
                  season: `${config['ligue-1-season'].split('/')[0]}`,
                  status: 'FT'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(options);
                const sortedFixtures = response.data.response.sort((a, b) => {
                  return new Date(a.fixture.date) - new Date(b.fixture.date);
                });

                if (sortedFixtures) {
                  const translatedFixtures = await Promise.all(sortedFixtures.reverse().map(async (e, i) => {
                    const hName = config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] : await translate(e.teams.home.name, {to: 'ru'});
                    const aName = config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] : await translate(e.teams.away.name, {to: 'ru'});
                    const round = await translate(e.league.round, {to: 'ru'});
                    const date = new Date(e.fixture.timestamp * 1000);

                    return (
                      <React.Fragment key={'result' + i}>
                        {tourSeparators.includes(i) && <hr />} {/* Вставляем разделитель, если необходимо */}
                        <div className="col">
                          <div className="round">
                            <span>{round}</span>
                          </div>
                          <div className="center">
                            <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{hName}</span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={hName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.home.logo} alt={hName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                              {e.goals.home ? e.goals.home : '0'}
                            </span>
                            <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>
                              {e.goals.away ? e.goals.away : '0'}
                            </span>
                            <span></span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={aName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.away.logo} alt={aName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{aName}</span>
                          </div>
                          <div className="dateTime">
                            <span>{String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear()} | {String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  }));

                  setFixtures(translatedFixtures);

                  const separators = [];
                    let currentRound = '';

                    for (let i = 0; i < response.data.response.length; i++) {
                      const round = response.data.response[i].league.round;
            
                      if (round !== currentRound) {
                        separators.push(i);
                        currentRound = round;
                      }
                    }

                    setTourSeparators(separators);
                }
              } catch (error) {
                console.error(error);
              }
              

              const optionsLive = {
                method: 'GET',
                url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                params: {
                  live: 'all',
                  league: '61'
                },
                headers: {
                  'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                }
              };
              
              try {
                const response = await axios.request(optionsLive);
                const liveData = response.data && response.data.response;

                if (liveData) {
                  const translatedMatches = await Promise.all(liveData.map(async (e, i) => {
                    const hName = config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.home.name, {to: 'ru'})}`] : await translate(e.teams.home.name, {to: 'ru'});
                    const aName = config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(e.teams.away.name, {to: 'ru'})}`] : await translate(e.teams.away.name, {to: 'ru'});
                    const round = await translate(e.league.round, {to: 'ru'});
                    const statusTxt = await translate(e.fixture.status.long, {to: 'ru'});

                    return (
                      <React.Fragment key={'live' + i}>
                        <div className="col live">
                          <div style={{background: '#f02d54'}} className="round">
                            <span style={{color: '#fff'}}>{round}</span>
                          </div>
                          <div className="center">
                            <span className="hName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{hName}</span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={hName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.home.logo} alt={hName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="hScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff', background: '#f02d54'} : {color: '#fff', background: '#f02d54'}}>
                              {e.goals.home ? e.goals.home : '0'}
                            </span>
                            <span className="aScore" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff', background: '#f02d54'} : {color: '#fff', background: '#f02d54'}}>
                              {e.goals.away ? e.goals.away : '0'}
                            </span>
                            <span></span>
                            <LazyLoad offset={800}>
                              <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={aName}>
                                <img style={{maxWidth: '20px', maxHeight: '20px', width: 'auto', height: 'auto'}} loading="lazy" src={e.teams.away.logo} alt={aName} />
                              </Tippy>
                            </LazyLoad>
                            <span className="aName" style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null}>{aName}</span>
                          </div>
                          <div style={{background: '#f02d54'}} className="dateTime">
                            <span style={{color: '#fff'}}>{e.fixture.status.elapsed}' {e.fixture.status.short !== 'FT' ? ' | ' + statusTxt : statusTxt}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  }));

                  setLiveMatches(translatedMatches);
                }
              } catch (error) {
                console.error(error);
              }
          };
      
          // fetchData();
    }, []);

    return (
        <div className='leagueFixtures'>
            <Helmet>
                <title>Чемпионат Франции (Лига 1) - Результаты матчей</title>
                <meta name="description" content="Результаты матчей чемпионата Франции (Лиги 1)." />
                <meta name="keywords" content="лига 1 результаты, чемпионат франции результаты, французский футбол результаты, лига 1 матчи, псж результаты, олимпик марсель результаты, олимпик лион результаты, монако результаты, результаты лиги 1, прошедшие матчи лиги 1" />
            </Helmet>
            <div className="logoPageName">
                <LazyLoad offset={800}>
                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content={`Лига 1 ${config['ligue-1-season']}`}><img loading="lazy" src={logo} alt={`Лига 1 ${config['ligue-1-season']}`} /></Tippy>
                </LazyLoad>
                <h1 style={localStorage.getItem('darkTheme') === 'true' ? {color: '#fff'} : null} className="pageName">Результаты - Лига 1 {config['ligue-1-season']}</h1>
            </div>
            {liveMatches.length > 0 && liveMatches}
            {fixtures.length > 0 ? fixtures : <div className='noData'>Данных нет</div>}
        </div>
    );
};

export default Results;