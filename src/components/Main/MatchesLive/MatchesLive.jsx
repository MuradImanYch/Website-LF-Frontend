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
            cookies.get('auth') && axios.post('/matches/favLive', {
                token: cookies.get('auth')
            })
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
                    return <div className="col" key={'id' + i}>
                                <div className="round"><span>{e.lNameRoundDateTime[1]}</span></div>
                                <div className="center">
                                    <span className='hName'>{e.hName}</span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.hName}>
                                            <img loading="lazy" src={e.hLogo} alt={e.hName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='hScore'>{e.hScore}</span>
                                    <LazyLoad offset={800}><Tippy content={e.lNameRoundDateTime[0] + ' | ' + e.lNameRoundDateTime[1] + ', ' + e.lNameRoundDateTime[2]}><img loading="lazy" src={e.lLogo} alt={e.lNameRoundDateTime[0]} /></Tippy></LazyLoad>
                                    <span className='aScore'>{e.aScore}</span>
                                    <span></span>
                                    <LazyLoad offset={800}>
                                        <Tippy content={e.aName}>
                                            <img loading="lazy" src={e.aLogo} alt={e.aName} />
                                        </Tippy>
                                    </LazyLoad>
                                    <span className='aName'>{e.aName}</span>
                                </div>
                                <div className="dateTime"><span>{e.time === 'Перерыв' ? 'Перерыв' : e.time + '\''}</span></div>
                            </div>
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
        setInterval(() => {
            fetchData();
        }, 30000);
    }, []);


    return (
        <div className="matchesLive" id='fixturesFav'>
            <div className="title">
                <h2 className="sectionName">Онлайн матчи избранных команд</h2>
                <LazyLoad offset={800}><Tippy content="Добавить команду"><img loading="lazy" src={addFavorite} alt="add favorite" onClick={addFavoriteTeam} /></Tippy></LazyLoad>
            </div>
            <div className="wrap">
                {matchesSlider && matchesSlider.length > 0 ? matchesSlider : <div className='noData'>Данных нет</div>}
            </div>
        </div>
    );
};

export default MatchesLive;