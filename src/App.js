import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import LazyLoad from 'react-lazy-load';
import cookies from 'js-cookie';
import axios from 'axios';
import $ from 'jquery';
import Snowfall from 'react-snowfall';
import config from './conf.json';

import logo from './assets/ico/logo.webp';
import logoNy from './assets/ico/logo-ny.webp';
import settings from './assets/ico/settings.webp';
import rplLogo from './assets/ico/rplLogo.webp';
import eplLogo from './assets/ico/eplLogo.webp';
import laligaLogo from './assets/ico/laligaLogo.webp';
import serieaLogo from './assets/ico/serieaLogo.webp';
import bundesligaLogo from './assets/ico/bundesligaLogo.webp';
import ligue1Logo from './assets/ico/ligue1Logo.webp';
import uclLogo from './assets/ico/uclLogo.webp';
import uelLogo from './assets/ico/uelLogo.webp';
import ueclLogo from './assets/ico/ueclLogo.webp';
import wcLogo from './assets/ico/wcLogo.webp';
import ecLogo from './assets/ico/ecLogo.webp';
import newspaperIco from './assets/ico/newspaperIco.webp';
import transferIco from './assets/ico/transferIco.webp';
import video from './assets/ico/video.webp';
import rank from './assets/ico/rank.webp';
import tvProgram from './assets/ico/tvProgram.webp';
import forecasts from './assets/ico/forecasts.webp';
import unlLogo from './assets/ico/unlLogo.webp';
import topScores from './assets/ico/topScores.webp';
import login from './assets/ico/login.webp';
import defaultProfile from './assets/ico/defaultProfile.webp';
import broadcasts from './assets/ico/broadcasts.webp';
import euQualLogo from './assets/ico/euroQualLogo.webp';

import Preloader from './components/Preloader/Preloader';
import HotBoard from './components/HotBoard/HotBoard';
import AdVerticalLeft from './components/Main/AdVerticalLeft/AdVerticalLeft';
import AdVerticalLeft2 from './components/Main/AdVerticalLeft2/AdVerticalLeft2';
import AdVerticalRight from './components/Main/AdVerticalRight/AdVerticalRight';
import AdVerticalRight2 from './components/Main/AdVerticalRight2/AdVerticalRight2';
import Poll from './components/Main/Poll/Poll';
import SearchTeam from './components/Main/SearchTeam/SearchTeam';
import Auth from './components/Auth/Auth';
import Footer from './components/Footer/Footer';

const Error = React.lazy(() => import('./components/Error/Error'));
const Main = React.lazy(() => import('./components/Main/Main'));
const ExtendedNews = React.lazy(() => import('./components/Main/ExtendedNews/ExtendedNews'));
const News = React.lazy(() => import('./components/News/Main'));
const Transfers = React.lazy(() => import('./components/Transfers/Main'));
const Admin = React.lazy(() => import('./components/Admin/Main'));
const Other = React.lazy(() => import('./components/Other/Main'));
const League = React.lazy(() => import('./components/League/Main'));
const QuickNav = React.lazy(() => import('./components/QuickNav/QuickNav'));
const ExtendedBroadcast = React.lazy(() => import('./components/Main/ExtendedBroadcast/ExtendedBroadcast'));
const SuggestionComplaints = React.lazy(() => import('./components/SuggestionComplaints/SuggestionComplaints'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const ExtendedMatch = React.lazy(() => import('./components/Main/ExtendedMatch/ExtendedMatch'));

function App() {
    const[barState, setBarstate] = useState(true); 
    const location = useLocation();
    const[adminAuth, setAdminAuth] = useState(false);
    const navigate = useNavigate();
    const[logToggle, setLogToggle] = useState(true);
    const[auth, setAuth] = useState();
    const[username, setUsername] = useState();
    const[profileToggle, setProfileToggle] = useState(true);
    const[mouseX, setMouseX] = useState();
    const[mouseY, setMouseY] = useState();

    const progressBar = () => { // scroll progressBar func
        let windScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (windScroll / docHeight) * 100;
        document.getElementById("progressBar").style.width = scrolled + '%';     
    }

    useEffect(() => {
        if(localStorage.getItem('darkTheme') === 'true') {
            $('body').css({background: '#222'});
            $('span:not(.hotBoard .liveWrap span)').css({color: '#fff'});
            $('#settings .item .darkThemeBtn').css({background: '#4CD964'});
            $('#profile .subMenu li a span').css({color: '#f02d54'});
        }
        else {
            $('body').css({background: '#fff'});
            $('span:not(.hotBoard .liveWrap span)').css({color: '#000'});
            $('#settings .item .darkThemeBtn').css({background: '#fff'});
            $('#profile .subMenu li a span').css({color: '#f02d54'});
        }
    }, [JSON.parse(localStorage.getItem('darkTheme'))]);

    useEffect(() => {
        window.addEventListener("scroll", progressBar);
        return () => {
            window.removeEventListener("scroll", progressBar);
        }
    }, []);

    useEffect(() => {
        let authCookie = cookies.get('auth');
        if(authCookie) { // check is auth and get username by token
            axios.post('/profile/username', {
                token: authCookie
            })
            .then(response => {
                if (response.status == 200){
                    setUsername(response.data);
                    setAuth(authCookie);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }

        localStorage.getItem('darkTheme') === null && localStorage.setItem('darkTheme', false);
    }, []);

    const menuToggle = () => {
        if($(window).width() <= 1024) { // for mobile
            setBarstate(!barState);
            if(barState) {
                $('.bar1').css({'transform': 'rotate(-45deg) translate(-8px, 7px)'});
                $('.bar2').css({'opacity': '0'});
                $('.bar3').css({'transform': 'rotate(45deg) translate(-8px, -8px)'});
                $('#mNavWrap').css({'transform': 'translate(100%, 0)'});
                $('.bar1').css({'backgroundColor': 'rgb(204, 135, 45)'});
                $('.bar2').css({'backgroundColor': 'rgb(204, 135, 45)'});
                $('.bar3').css({'backgroundColor': 'rgb(204, 135, 45)'});
                $('body').css({'overflow': 'hidden'});
                $('#mNavWrap').css({'overflow':'scroll'});
            }
            else {
                $('.bar1').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('.bar2').css({'opacity': '1'});
                $('.bar3').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('#mNavWrap').css({'transform': 'translate(0, 0)'});
                $('.bar1').css({'backgroundColor': '#fff'});
                $('.bar2').css({'backgroundColor': '#fff'});
                $('.bar3').css({'backgroundColor': '#fff'});
                $('body').css({'overflow': 'auto'});
                $('#mNavWrap').css({'overflow':'hidden'});
            }
        }
    }

    $('#mNavWrap ul li a, #mNavWrap > a').click(() => {
        setBarstate(true);
        $('.bar1').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
        $('.bar2').css({'opacity': '1'});
        $('.bar3').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
        $('#mNavWrap').css({'transform': 'translate(0, 0)'});
        $('.bar1').css({'backgroundColor': '#fff'});
        $('.bar2').css({'backgroundColor': '#fff'});
        $('.bar3').css({'backgroundColor': '#fff'});
        $('body').css({'overflow': 'auto'});
        $('#mNavWrap').css({'overflow':'hidden'});
    });


    const vkMouseEnter = () => { // soc net mouse enter / out func
        $('header .socnetWrap i:eq(0)').css({'color': '#0077ff'});
    }
    const vkMouseLeave = () => {
        $('header .socnetWrap i:eq(0)').css({'color': '#fff'});
    }
    const tgMouseEnter = () => {
        $('header .socnetWrap i:eq(1)').css({'color': '#3ab3e0'});
    }
    const tgMouseLeave = () => {
        $('header .socnetWrap i:eq(1)').css({'color': '#fff'});
    }
    const igMouseEnter = () => {
        $('header .socnetWrap i:eq(2)').css({'background': '-webkit-linear-gradient(#9700ff, #df194c, #ff7f00)'})
            .css({'-webkit-background-clip': 'text'})
            .css({'-webkit-text-fill-color': 'transparent'});
    }
    const igMouseLeave = () => {
        $('header .socnetWrap i:eq(2)').css({'background': 'none'})
            .css({'-webkit-background-clip': 'border-box'})
            .css({'-webkit-text-fill-color': 'initial'});
    }

    // desc menu enter/out events
    const dNewsEnter = () => {
        $('#dNavWrap .menuWrap > li:nth-child(1) a i:nth-child(1)').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(1) .subMenuWrap').show();
        $('#dNavWrap .menuWrap > li:nth-child(1) i').css({'color': 'rgb(204, 135, 45)'});
    }
    const dNewsOut = () => {
        $('#dNavWrap .menuWrap > li:nth-child(1) a i:nth-child(1)').attr('class', 'fas fa-caret-down');
        $('#dNavWrap .menuWrap li:nth-child(1) .subMenuWrap').hide();
        $('#dNavWrap .menuWrap > li:nth-child(1) i').css({'color': '#fff'});
    }
    const dLeagueEnter = () => {
        $('#dNavWrap .menuWrap > li:nth-child(2) a > i:nth-child(1)').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(2) .subMenuWrap').show();
        $('#dNavWrap .subSubMenuWrap li:nth-child(1) i').attr({'class': 'fas fa-calendar-alt'});
        $('#dNavWrap .subSubMenuWrap li:nth-child(2) i').attr({'class': 'fas fa-list-ol'});
        $('#dNavWrap .subSubMenuWrap li:nth-child(3) i').attr({'class': 'fas fa-clipboard-list'});
        $('#dNavWrap .menuWrap > li:nth-child(2) i').eq(0).css({'color': 'rgb(204, 135, 45)'});
    }
    const dLeagueOut = () => {
        $('#dNavWrap .menuWrap > li:nth-child(2) a > i:nth-child(1)').attr('class', 'fas fa-caret-down');
        $('#dNavWrap .menuWrap li:nth-child(2) .subMenuWrap').hide();
        $('#dNavWrap .menuWrap > li:nth-child(2) i').eq(0).css({'color': '#fff'});
    }
    const dTransfersEnter = () => {
        $('#dNavWrap > ul > li:nth-child(3) > div > i').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(3) .subMenuWrap').show();
        $('#dNavWrap .menuWrap > li:nth-child(3) i').eq(0).css({'color': 'rgb(204, 135, 45)'});
    }
    const dTransfersOut = () => {
        $('#dNavWrap > ul > li:nth-child(3) > div > i').attr('class', 'fas fa-caret-down');
        $('#dNavWrap .menuWrap li:nth-child(3) .subMenuWrap').hide();
        $('#dNavWrap .menuWrap > li:nth-child(3) i').eq(0).css({'color': '#fff'});
    }
    const dOthersEnter = () => {
        $('#dNavWrap > ul > li:nth-child(4) > div > i').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(4) .subMenuWrap').show();
        $('#dNavWrap .menuWrap > li:nth-child(4) i').eq(0).css({'color': 'rgb(204, 135, 45)'});
    }
    const dOthersOut = () => {
        $('#dNavWrap > ul > li:nth-child(4) > div > i').attr('class', 'fas fa-caret-down');
        $('#dNavWrap .menuWrap li:nth-child(4) .subMenuWrap').hide();
        $('#dNavWrap .menuWrap > li:nth-child(4) i').eq(0).css({'color': '#fff'});
    }

    // leagues array obj
    let leagues = [
        {name: 'РПЛ', img: rplLogo, id: 'rpl', title: 'Россия'},
        {name: 'АПЛ', img: eplLogo, id: 'epl', title: 'Англия'},
        {name: 'Ла Лига', img: laligaLogo, id: 'laliga', title: 'Испания'},
        {name: 'Серия А', img: serieaLogo, id: 'seriea', title: 'Италия'},
        {name: 'Бундеслига', img: bundesligaLogo, id: 'bundesliga', title: 'Германия'},
        {name: 'Лига 1', img: ligue1Logo, id: 'ligue1', title: 'Франция'},
        {name: 'ЛЧ', img: uclLogo, id: 'ucl', title: 'Лига Чемпионов'},
        {name: 'ЛЕ', img: uelLogo, id: 'uel', title: 'Лига Европы'},
        {name: 'ЛК', img: ueclLogo, id: 'uecl', title: 'Лига Конференций'},
        {name: 'Евр. квлф.', img: euQualLogo, id: 'eu-qualification', title: 'Европейская квалификация'},
        {name: 'ЛН', img: unlLogo, id: 'unl', title: 'Лига наций УЕФА'},
        {name: 'ЧМ 2026', img: wcLogo, id: 'wc', title: 'Чемпионат Мира 2026'},
        {name: `ЧЕ ${config['european-championship-season']}`, img: ecLogo, id: 'ec', title: `Чемпионат Европы ${config['european-championship-season']}`}
    ]

    // desc sub sub menu enter/out events
    useEffect(() => { 
        if($(window).width() > 1024) { // desctop
            $('#dNavWrap .subMenuWrap .rplLeagueMenu').mouseenter(() => {
                $('#dNavWrap .rplLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .rplLeagueMenu').mouseleave(() => {
                $('#dNavWrap .rplLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .eplLeagueMenu').mouseenter(() => {
                $('#dNavWrap .eplLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .eplLeagueMenu').mouseleave(() => {
                $('#dNavWrap .eplLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .laligaLeagueMenu').mouseenter(() => {
                $('#dNavWrap .laligaLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .laligaLeagueMenu').mouseleave(() => {
                $('#dNavWrap .laligaLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .serieaLeagueMenu').mouseenter(() => {
                $('#dNavWrap .serieaLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .serieaLeagueMenu').mouseleave(() => {
                $('#dNavWrap .serieaLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .bundesligaLeagueMenu').mouseenter(() => {
                $('#dNavWrap .bundesligaLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .bundesligaLeagueMenu').mouseleave(() => {
                $('#dNavWrap .bundesligaLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .ligue1LeagueMenu').mouseenter(() => {
                $('#dNavWrap .ligue1LeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .ligue1LeagueMenu').mouseleave(() => {
                $('#dNavWrap .ligue1LeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .uclLeagueMenu').mouseenter(() => {
                $('#dNavWrap .uclLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .uclLeagueMenu').mouseleave(() => {
                $('#dNavWrap .uclLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .uelLeagueMenu').mouseenter(() => {
                $('#dNavWrap .uelLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .uelLeagueMenu').mouseleave(() => {
                $('#dNavWrap .uelLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .eu-qualificationLeagueMenu').mouseenter(() => {
                $('#dNavWrap .eu-qualificationLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .eu-qualificationLeagueMenu').mouseleave(() => {
                $('#dNavWrap .eu-qualificationLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .ueclLeagueMenu').mouseenter(() => {
                $('#dNavWrap .ueclLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .ueclLeagueMenu').mouseleave(() => {
                $('#dNavWrap .ueclLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .unlLeagueMenu').mouseenter(() => {
                $('#dNavWrap .unlLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .unlLeagueMenu').mouseleave(() => {
                $('#dNavWrap .unlLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .wcLeagueMenu').mouseenter(() => {
                $('#dNavWrap .wcLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .wcLeagueMenu').mouseleave(() => {
                $('#dNavWrap .wcLeagueMenu .subSubMenuWrap').hide();
            });
            $('#dNavWrap .subMenuWrap .ecLeagueMenu').mouseenter(() => {
                $('#dNavWrap .ecLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .ecLeagueMenu').mouseleave(() => {
                $('#dNavWrap .ecLeagueMenu .subSubMenuWrap').hide();
            });
        }   
    }, [location]);

    const mMenuDownUp = (e) => { // mobile menu news arrow toggle
        $(e.target).parent().parent().find('> ul').slideToggle('slow');
        $(e.target).toggleClass('fa-caret-square-up subMenuArrowColorToggle');
    }
    const closeAddFavorite = () => {
        $('.favoriteTeamPopUp').fadeOut();
        $('body').css({overflow: 'scroll'});
    }

    const loginToggle = () => {
        setLogToggle(!logToggle);
        logToggle ? $('.authWrap').fadeIn() && $('body').css({overflow: 'hidden'}) : $('.authWrap').fadeOut() && $('body').css({overflow: 'auto'});
        $('#auth input').val('');
        $('#auth .error').text('');
    }
    const close = () => {
        setLogToggle(true);
        $('.authWrap').fadeOut();
        $('body').css({overflow: 'auto'});
        $('#auth input').val('');
        $('#auth .error').text('');
    }

    if(cookies.get('auth')) { // check is auth and get username by token
        axios.post('/profile/username', {
            token: cookies.get('auth')
        })
        .then(response => {
            setUsername(response.data);
            setAuth(cookies.get('auth'));
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getToken = async (e) => { // get token while login
        setAuth(e);
        setLogToggle(true);
        await axios.post('/profile/username', {
            token: cookies.get('auth')
        })
        .then(response => {
            setUsername(response.data);
        })
        .catch(err => {
            console.log(err);
        });

        await axios.post('/profile/getFav', {
            token: cookies.get('auth')
        })
        .then(response => {
            localStorage.setItem('teamArr', JSON.stringify(response.data));
        })
        .catch(err => {
            console.log(err);
        });
    }

    const logOut = () => {
        cookies.remove('auth');
        setAuth();
        $('.favoriteTeamPopUp').fadeOut();
        $('body').css({overflow: 'scroll'});
        localStorage.removeItem('teamArr');
        setAdminAuth(false);
    }

    useEffect(() => {
        if(auth) {
            cookies.set('auth', auth, {expires: 30});
        }
        
        if(cookies.get('auth')) {
            axios.post('/admin/check', {
                token: cookies.get('auth')
            })
            .then(response => {
                if(response.data === 'viewer') {
                    setAdminAuth(false);
                }
                else {
                    setAdminAuth(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [auth]);

    const adminEnter = () => {
        if(cookies.get('auth')) {
            axios.post('/admin/check', {
                token: cookies.get('auth')
            })
            .then(response => {
                if(response.data === 'viewer') {
                    setAdminAuth(false);
                    navigate('/');
                }
                else {
                    setAdminAuth(true);
                    navigate('/admin');
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const profileToggleFunc = () => {
        setProfileToggle(!profileToggle);
        profileToggle ? $('#profile .subMenu').css({display: 'flex'}) : $('#profile .subMenu').css({display: 'none'});
    }

    config['ny-christmass-theme'] &&
    document.addEventListener('mousemove', function(event) {
        setMouseX(event.clientX - 60);
        setMouseY(event.clientY - 60);
    });
    document.addEventListener('mousedown', async function() {
        setTimeout(() => {
            $('#pointerEffect').fadeIn();
        }, 100);
    });
    document.addEventListener('mouseup', function() {
        setTimeout(() => {
            $('#pointerEffect').hide();
        }, 100);
    });
    
    return (
        <div id='app'>
            {config['ny-christmass-theme'] && <Snowfall style={{zIndex: '2024'}} />}
            {config['ny-christmass-theme'] && <div id="pointerEffect" style={{left: mouseX + 'px', top: mouseY + 'px'}}></div>}
            <div id="progressBar"></div>
            <header> {/* ---------------Header--------------- */}
                <div className="container">
                    <Link to="/">
                        <LazyLoad offset={800}>
                            <img loading="lazy" src={config['ny-christmass-theme'] ? logoNy : logo} alt="Logo" />
                        </LazyLoad>
                    </Link>
                    <nav> {/* --------------Nav----------------*/}
                        <div id="dNavWrap">
                            <ul className='menuWrap'>
                                <li onMouseEnter={dNewsEnter} onMouseLeave={dNewsOut}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='left' content='Все новости'><Link to="/news">Новости <i className="fas fa-caret-down"></i>
                                    </Link></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={e.id + 'dNews'} placement='left' content={e.title}>
                                            <li className={e.id + 'NewsMenu'}>
                                                <Link to={'/news/' + e.id}><img loading="lazy" src={e.img} alt={e.name} />{e.name}</Link>
                                            </li>
                                        </Tippy>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dLeagueEnter} onMouseLeave={dLeagueOut}>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='left' content='Все турниры'><Link to="/league">Лига <i className="fas fa-caret-down"></i>
                                    </Link></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} key={e.id + 'dLeague'} placement='left' content={e.title}>
                                            <li className={`${e.id}LeagueMenu`}>
                                                <Link to={'/league/' + e.id}><img loading="lazy" src={e.img} alt={e.name} />{e.name} <i className='fas fa-caret-right'></i></Link>
                                                <ul className='subSubMenuWrap'>
                                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='right' content={`Таблица ${e.name}`}>
                                                        <li>
                                                            <Link to={`/league/${e.id}/standings`}><i className="fas fa-list-ol"></i> Таблица</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='right' content={`Календарь ${e.name}`}>
                                                        <li>
                                                            <Link to={`/league/${e.id}/fixtures`}><i className="fas fa-calendar-alt"></i> Календарь</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='right' content={`Результаты ${e.name}`}>
                                                        <li>
                                                            <Link to={`/league/${e.id}/results`}><i className="fas fa-clipboard-list"></i> Результаты</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='right' content={`Бомбардиры ${e.name}`}>
                                                        <li>
                                                            <Link to={`/league/${e.id}/topscores`}><img loading="lazy" src={topScores} alt="topScores" /> Бомбардиры</Link>
                                                        </li>
                                                    </Tippy>
                                                </ul>
                                            </li>
                                        </Tippy>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dTransfersEnter} onMouseLeave={dTransfersOut}>
                                    <div>Трансферы <i className="fas fa-caret-down"></i>
                                    </div>
                                    <ul className='subMenuWrap transfersSubMenu'>
                                        <li><Link to="/transfers/news"><img loading="lazy" src={newspaperIco} alt="news" /> Новости</Link></li>
                                        <li><Link to="/transfers/list"><img loading="lazy" src={transferIco} alt="transfers" /> Переходы</Link></li>
                                    </ul>
                                </li>
                                <li onMouseEnter={dOthersEnter} onMouseLeave={dOthersOut}>
                                    <div>Разное <i className="fas fa-caret-down"></i></div>
                                    <ul className='subMenuWrap oТВ расписаниеthersSubMenu'>
                                        <li><Link to="/other/news"><img loading="lazy" src={newspaperIco} alt="other news" /> Новости</Link></li>
                                        <li><Link to="/other/blogs"><img loading="lazy" src={newspaperIco} alt="blog" /> Блоги</Link></li>
                                        <li><Link to="/other/video"><img loading="lazy" src={video} alt="video news" /> Видео</Link></li>
                                        <li><Link to="/other/uefa-country-ranking"><img loading="lazy" src={rank} alt="uefa ranking" /> Рейтинг УЕФА</Link></li>
                                        <li><Link to="/other/fifa-ranking"><img loading="lazy" src={rank} alt="fifa ranking" /> Рейтинг ФИФА</Link></li>
                                        <li><Link to="/other/tvschedule"><img loading="lazy" src={tvProgram} alt="tv program" /> ТВ расписание</Link></li>
                                        <li><Link to="/other/odds"><img loading="lazy" src={forecasts} alt="forecasts" /> Котировки</Link></li>
                                    </ul>
                                </li>
                                <li className='actual'><Link to="/other/broadcasts">Прямые трансляции</Link></li>
                                {/* <li className='actual'>
                                    <Link to="">----</Link>
                                </li> */}
                            </ul>
                        </div>
                        <div id="mNavWrap">
                            <ul className="menuWrap">
                                <li>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='left' content='Все новости'><div><Link to="/news">Новости</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} className={e.id + 'NewsMenu'} key={e.id + 'mNews'}>
                                            <Link to={'/news/' + e.id}><img loading="lazy" src={e.img} alt={e.name} />{e.name}</Link>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} placement='left' content='Все турниры'><div><Link to="/league">Лига</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div></Tippy>
                                    <ul>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} key={e.id + 'mLeague'}>
                                            <div>
                                                <Link to={'/league/' + e.id}><img loading="lazy" src={e.img} alt={e.name} />{e.name}</Link> <i className='far fa-caret-square-down' onClick={mMenuDownUp}></i>
                                            </div>
                                            <ul className={e.id+'LeagueWrap'}>
                                                <li title={`Таблица ${e.name}`}>
                                                    <Link to={`/league/${e.id}/standings`}><i className="fas fa-list-ol"></i> Таблица</Link>
                                                </li>
                                                <li title={`Календарь ${e.name}`}>
                                                    <Link to={`/league/${e.id}/fixtures`}><i className="fas fa-calendar-alt"></i> Календарь</Link>
                                                </li>
                                                <li title={`Результаты ${e.name}`}>
                                                    <Link to={`/league/${e.id}/results`}><i className="fas fa-clipboard-list"></i> Результаты</Link>
                                                </li>
                                                <li title={`Бомбардиры ${e.name}`}>
                                                    <Link to={`/league/${e.id}/topscores`}><img loading="lazy" src={topScores} alt="topScores" /> Бомбардиры</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <div>Трансферы <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='transfersSubMenu'>
                                        <li><Link to="/transfers/news"><img loading="lazy" src={newspaperIco} alt="news" /> Новости</Link></li>
                                        <li><Link to="/transfers/list"><img loading="lazy" src={transferIco} alt="transfer" /> Переходы</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <div>Разное <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='othersSubMenu'>
                                        <li><Link to="/other/news"><img loading="lazy" src={newspaperIco} alt="other news" /> Новости</Link></li>
                                        <li><Link to="/other/blogs"><img loading="lazy" src={newspaperIco} alt="blog" /> Блоги</Link></li>
                                        <li><Link to="/other/video"><img loading="lazy" src={video} alt="video news" /> Видео</Link></li>
                                        <li><Link to="/other/uefa-country-ranking"><img loading="lazy" src={rank} alt="uefa ranking" /> Рейтинг УЕФА</Link></li>
                                        <li><Link to="/other/fifa-ranking"><img loading="lazy" src={rank} alt="fifa ranking" /> Рейтинг ФИФА</Link></li>
                                        <li><Link to="/other/tvschedule"><img loading="lazy" src={tvProgram} alt="tv program" /> ТВ расписание</Link></li>
                                        <li><Link to="/other/odds"><img loading="lazy" src={forecasts} alt="forecasts" /> Котировки</Link></li>
                                    </ul>
                                </li>
                                <li className='actual'><Link to="/other/broadcasts">Прямые трансляции</Link></li>
                            </ul>

                            {/* <Link style={{textAlign: 'center', display: 'block', textDecoration: 'underline', textUnderlineOffset: '2px'}} to='/suggestions-complaints'>Предложения и жалобы</Link> */}
                        </div>
                    </nav>
                    <div className="socnetWrap">
                        <a title="Вконтакте" href="https://vk.com/leg.football" target="__blank"><i onMouseEnter={vkMouseEnter} onMouseLeave={vkMouseLeave} className="fab fa-vk"></i></a>
                        <a title="Telegram" href="https://t.me/+zHJJw7xZ2300YjEy" target="__blank"><i onMouseEnter={tgMouseEnter} onMouseLeave={tgMouseLeave} className="fab fa-telegram-plane"></i></a>
                        <a title="Instagram" href="https://www.instagram.com/leg_football/" target="__blank"><i onMouseEnter={igMouseEnter} onMouseLeave={igMouseLeave} className="fab fa-instagram"></i></a>
                    </div>
                    <div className="userSettings">
                        {auth || cookies.get('auth') ? <div onClick={profileToggleFunc} id="profile">
                        <img className='profilePic' loading="lazy" src={defaultProfile} alt="profilePic" />
                            <ul className="subMenu">
                                <li><a href="#">Профиль <span>{username ? username : 'err'}</span></a></li>
                                {adminAuth ? <li style={{marginTop: '30px'}}><Link to='/admin' onClick={adminEnter} style={{color: 'yellow', fontWeight: 'bold'}}>Админ панель</Link></li> : null}
                                <button onClick={logOut}>Выйти</button>
                            </ul>
                            </div> : <Tippy trigger={$(window).width() < 1024 ? 'click' : 'mouseenter'} content='Вход/Регистрация'><img loading="lazy" className='login' src={login} alt="login" onClick={loginToggle} /></Tippy>}
                            <Link to={'/settings'}><img className='settingsPic' loading="lazy" src={settings} alt="settingsPic" /></Link>
                    </div>
                    <div id="menuToggleMobDiv" onClick={menuToggle}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
            </header>
            <HotBoard />
            <main>
                <div className='sidebar'>
                    <div id='adWrapLeft'>
                        <AdVerticalLeft />
                        <AdVerticalLeft2 />
                        
                        <Poll />
                    </div>
                </div>
                <div className='container'>
                    <Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route path='/' element={<Main />} />
                            <Route path='news/*' element={<News />} />
                            <Route path='news/read/:id' element={<ExtendedNews />} />
                            {adminAuth ? <Route path='admin/*' element={<Admin />} /> : null}
                            <Route path='transfers/*' element={<Transfers />} />
                            <Route path='other/*' element={<Other />} />
                            <Route path='league/*' element={<League leagues={leagues} />} />
                            <Route path='broadcast/watch/:id' element={<ExtendedBroadcast />} />
                            <Route path='suggestions-complaints' element={<SuggestionComplaints />} />
                            <Route path='settings' element={<Settings />} />
                            {/* <Route path='match/:id' element={<ExtendedMatch />} /> */}
                            <Route path='*' element={<Error />} />
                        </Routes>
                    </Suspense>
                </div>
                <div className='sidebar'>
                    <div id='adWrapRight'>
                        <AdVerticalRight />
                        <AdVerticalRight2 />
                    </div>
                </div>
            </main>
            <div className="favoriteTeamPopUp">
                <SearchTeam />
                <div className="close" onClick={closeAddFavorite}>⨯</div>
            </div>
            <div className='authWrap'>
                <Auth token={getToken} />
                <button title='Отклонить' type='submit' className='close' onClick={close}>⨯</button>
            </div>
            <QuickNav />
            <Footer />
        </div>
    );
}

export default App;