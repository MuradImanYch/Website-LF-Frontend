import React from 'react';
import './MatchesLive.css';
import Tippy from '@tippyjs/react';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';
import cookies from 'js-cookie';
import axios from 'axios';

import addFavorite from '../../../assets/ico/addFavorite.webp';

const MatchesLive = () => {
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

    return (
        <div className="matchesLive">
            <div className="title">
                <h3 className="sectionName">Онлайн матчи избранных команд</h3>
                <Tippy content="Добавить команду"><img src={addFavorite} alt="add favorite" onClick={addFavoriteTeam} /></Tippy>
            </div>
            <div className="wrap">
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
                <div className="col">
                    <div className="round"><span>17-й тур</span></div>
                    <div className="center">
                        <span className='hName'>команда 1</span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 1'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 1'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='hScore'>{'0'}</span>
                        <img src={'https://s.scr365.net/img/flags/16/Viet%20Nam.png'} alt={'league'} />
                        <span className='aScore'>{'4'}</span>
                        <span></span>
                        <LazyLoad offset={800}>
                            <Tippy content={'команда 2'}>
                                <img src={'https://s.scr365.net/s1/logo/7648kt_16_6900.png'} alt={'команда 2'} />
                            </Tippy>
                        </LazyLoad>
                        <span className='aName'>{'команда 2'}</span>
                    </div>
                    <div className="dateTime"><span>{'13.11.22, 20:30'}</span></div>
                </div>
            </div>
        </div>
    );
};

export default MatchesLive;