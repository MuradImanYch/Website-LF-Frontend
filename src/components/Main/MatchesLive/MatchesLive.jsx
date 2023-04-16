import React, { useEffect, useState } from 'react';
import './MatchesLive.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';
import cookies from 'js-cookie';
import axios from 'axios';

import addFavorite from '../../../assets/ico/addFavorite.webp';

const MatchesLive = () => {
    const[matchesSlider, setMatchesSlider] = useState();

    const addFavoriteTeam = () => {
        cookies.get('auth') ? $('.favoriteTeamPopUp').fadeIn() && $('body').css({overflow: 'hidden'}) : $('.authWrap').fadeIn() && $('body').css({overflow: 'hidden'});
        $('#auth input').val('');
        $('#auth .error').text('');

        axios.post('/profile/getFav', {
            token: cookies.get('auth')
        })
        .then(response => {
            localStorage.setItem('teamArr', JSON.stringify(response.data));
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/matches/favLive')
            .then(response => {
                const uniqueIds = [];
                  
                const unique = response.data.filter(element => { // del duplicate obj props/teams
                    const isDuplicate = uniqueIds.includes(element.hName);
                    if (!isDuplicate) {
                      uniqueIds.push(element.hName);
                      return true;
                    }
                  
                    return false;
                });
                setMatchesSlider(unique && unique.map((e, i) => {
                    return <div className="col">
                                <div className="round"><span>17-й тур</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore'>{'0'}</span>
                                    <LazyLoad offset={800}><Tippy content='league'><img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} /></Tippy></LazyLoad>
                                    <span className='aScore'>{'4'}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
    }, []);

    return (
        <div className="matchesLive" id='fixturesFav'>
            <div className="title">
                <h2 className="sectionName">Онлайн матчи избранных команд</h2>
                <LazyLoad offset={800}><Tippy content="Добавить команду"><img src={addFavorite} alt="add favorite" onClick={addFavoriteTeam} /></Tippy></LazyLoad>
            </div>
            <div className="wrap">
                {matchesSlider}
            </div>
        </div>
    );
};

export default MatchesLive;