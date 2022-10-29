import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HotBoard from './components/HotBoard/HotBoard';
import AdVerticalLeft from './components/Main/AdVerticalLeft/AdVerticalLeft';
import AdVerticalLeft2 from './components/Main/AdVerticalLeft2/AdVerticalLeft2';
import AdVerticalRight from './components/Main/AdVerticalRight/AdVerticalRight';
import AdVerticalRight2 from './components/Main/AdVerticalRight2/AdVerticalRight2';

import logo from './assets/ico/logo.webp';
import $ from 'jquery';
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
import videoReviews from './assets/ico/videoReviews.webp';
import rank from './assets/ico/rank.webp';
import tvProgram from './assets/ico/tvProgram.webp';
import forecasts from './assets/ico/forecasts.webp';

import Main from './components/Main/Main';
import Error from './components/Error/Error';
import ExtendedNews from './components/Main/ExtendedNews/ExtendedNews';
import Admin from './components/Admin/Main';

function App(props) {
    // localstorage busy memory calc
    var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
};
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

    const[barState, setBarstate] = useState(true); 

    const progressBar = () => { // scroll progressBar func
        let windScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (windScroll / docHeight) * 100;
        document.getElementById("progressBar").style.width = scrolled + '%';     
    }
    window.onscroll = () => { 
        progressBar();
    }

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
        $('#dNavWrap .menuWrap > li:nth-child(3) a > i:nth-child(1)').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(3) .subMenuWrap').show();
        $('#dNavWrap .menuWrap > li:nth-child(3) i').eq(0).css({'color': 'rgb(204, 135, 45)'});
    }
    const dTransfersOut = () => {
        $('#dNavWrap .menuWrap > li:nth-child(3) a > i:nth-child(1)').attr('class', 'fas fa-caret-down');
        $('#dNavWrap .menuWrap li:nth-child(3) .subMenuWrap').hide();
        $('#dNavWrap .menuWrap > li:nth-child(3) i').eq(0).css({'color': '#fff'});
    }
    const dOthersEnter = () => {
        $('#dNavWrap .menuWrap > li:nth-child(4) a > i:nth-child(1)').attr('class', 'fas fa-caret-up');
        $('#dNavWrap .menuWrap li:nth-child(4) .subMenuWrap').show();
        $('#dNavWrap .menuWrap > li:nth-child(4) i').eq(0).css({'color': 'rgb(204, 135, 45)'});
    }
    const dOthersOut = () => {
        $('#dNavWrap .menuWrap > li:nth-child(4) a > i:nth-child(1)').attr('class', 'fas fa-caret-down');
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
        {name: 'ЧМ 2022', img: wcLogo, id: 'wc', title: 'Чемпионат Мира'},
        {name: 'ЧЕ 2024', img: ecLogo, id: 'ec', title: 'Чемпионат Европы'}
    ]

    // desc sub sub menu enter/out events
    useEffect(() => { 
        $('main .container').hide();
        $('main .container').fadeIn();

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
            $('#dNavWrap .subMenuWrap .ueclLeagueMenu').mouseenter(() => {
                $('#dNavWrap .ueclLeagueMenu .subSubMenuWrap').show();
            });
            $('#dNavWrap .subMenuWrap .ueclLeagueMenu').mouseleave(() => {
                $('#dNavWrap .ueclLeagueMenu .subSubMenuWrap').hide();
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
    }, []);

    const mMenuDownUp = (e) => { // mobile menu news arrow toggle
        $(e.nativeEvent.path[2].lastChild).slideToggle('slow');
        $(e.nativeEvent.path[0]).toggleClass('fa-caret-square-up');
        $(e.nativeEvent.path[0]).toggleClass('subMenuArrowColorToggle');
    }


    return (
        <div id='app'>
            <div id="progressBar"></div>
            <header> {/* ---------------Header--------------- */}
                <div className="container">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                    <nav> {/* --------------Nav----------------*/}
                        <div id="dNavWrap">
                            <ul className='menuWrap'>
                                <li onMouseEnter={dNewsEnter} onMouseLeave={dNewsOut}>
                                    <Link title='Все новости' to="">Новости <i className="fas fa-caret-down"></i>
                                    </Link>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} className={e.id + 'NewsMenu'} key={e.id}>
                                            <Link to=""><img src={e.img} alt={e.name} />{e.name}</Link>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dLeagueEnter} onMouseLeave={dLeagueOut}>
                                    <Link title='Все лиги' to="">Лига <i className="fas fa-caret-down"></i>
                                    </Link>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <li className={`${e.id}LeagueMenu`} title={e.title} key={e.id}>
                                            <Link to=""><img src={e.img} alt={e.name} />{e.name} <i className='fas fa-caret-right'></i></Link>
                                            <ul className='subSubMenuWrap'>
                                                <li title={`Календарь ${e.name}`}>
                                                    <Link to=""><i className="fas fa-calendar-alt"></i> Календарь</Link>
                                                </li>
                                                <li title={`Таблица ${e.name}`}>
                                                    <Link to=""><i className="fas fa-list-ol"></i> Таблица</Link>
                                                </li>
                                                <li title={`Результаты ${e.name}`}>
                                                    <Link to=""><i className="fas fa-clipboard-list"></i> Результаты</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dTransfersEnter} onMouseLeave={dTransfersOut}>
                                    <Link to="">Трансферы <i className="fas fa-caret-down"></i>
                                    </Link>
                                    <ul className='subMenuWrap transfersSubMenu'>
                                        <li><Link to=""><img src={newspaperIco} alt="news" /> Новости</Link></li>
                                        <li><Link to=""><img src={transferIco} alt="transfers" /> Переходы</Link></li>
                                    </ul>
                                </li>
                                <li onMouseEnter={dOthersEnter} onMouseLeave={dOthersOut}>
                                    <Link to="">Разное <i className="fas fa-caret-down"></i></Link>
                                    <ul className='subMenuWrap othersSubMenu'>
                                        <li><Link to=""><img src={videoReviews} alt="news" /> Обзор матчей</Link></li>
                                        <li><Link to=""><img src={rank} alt="transfers" /> Рейтинг УЕФА</Link></li>
                                        <li><Link to=""><img src={rank} alt="transfers" /> Рейтинг ФИФА</Link></li>
                                        <li><Link to=""><img src={tvProgram} alt="transfers" /> Телепрограмма</Link></li>
                                        <li><Link to=""><img src={forecasts} alt="transfers" /> Прогнозы</Link></li>
                                    </ul>
                                </li>
                                <li className='actual'>
                                    <Link to="">----</Link>
                                </li>
                            </ul>
                        </div>
                        <div id="mNavWrap">
                            <ul className="menuWrap">
                                <li>
                                    <div><Link title='Все новости' to="">Новости</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} className={e.id + 'NewsMenu'} key={e.id}>
                                            <Link to=""><img src={e.img} alt={e.name} />{e.name}</Link>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <div><Link title='Все лиги' to="">Лига</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} key={e.id}>
                                            <div>
                                                <Link to=""><img src={e.img} alt={e.name} />{e.name}</Link> <i className='far fa-caret-square-down' onClick={mMenuDownUp}></i>
                                            </div>
                                            <ul className={e.id+'LeagueWrap'}>
                                                <li title={`Календарь ${e.name}`}>
                                                    <Link to=""><i className="fas fa-calendar-alt"></i> Календарь</Link>
                                                </li>
                                                <li title={`Таблица ${e.name}`}>
                                                    <Link to=""><i className="fas fa-list-ol"></i> Таблица</Link>
                                                </li>
                                                <li title={`Результаты ${e.name}`}>
                                                    <Link to=""><i className="fas fa-clipboard-list"></i> Результаты</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <div><Link to="">Трансферы</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='transfersSubMenu'>
                                        <li><Link to=""><img src={newspaperIco} alt="news" /> Новости</Link></li>
                                        <li><Link to=""><img src={transferIco} alt="transfer" /> Переходы</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <div><Link to="">Разное</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='othersSubMenu'>
                                        <li><Link to=""><img src={videoReviews} alt="news" /> Обзор матчей</Link></li>
                                        <li><Link to=""><img src={rank} alt="transfer" /> Рейтинг УЕФА</Link></li>
                                        <li><Link to=""><img src={rank} alt="transfers" /> Рейтинг ФИФА</Link></li>
                                        <li><Link to=""><img src={tvProgram} alt="transfers" /> Телепрограмма</Link></li>
                                        <li><Link to=""><img src={forecasts} alt="transfers" /> Прогнозы</Link></li>
                                    </ul>
                                </li>
                                <li className='actual'>
                                    <div><Link to="">----</Link></div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="socnetWrap">
                        <a title="Вконтакте" href="https://vk.com/leg.football" target="__blank"><i onMouseEnter={vkMouseEnter} onMouseLeave={vkMouseLeave} className="fab fa-vk"></i></a>
                        <a title="Telegram" href="https://t.me/legendarniy_football" target="__blank"><i onMouseEnter={tgMouseEnter} onMouseLeave={tgMouseLeave} className="fab fa-telegram-plane"></i></a>
                        <a title="Instagram" href="https://www.instagram.com/legendary___football/" target="__blank"><i onMouseEnter={igMouseEnter} onMouseLeave={igMouseLeave} className="fab fa-instagram"></i></a>
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
                    </div>
                </div>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='news/:id' element={<ExtendedNews />} />
                        <Route path='admin/*' element={<Admin />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </div>
                <div className='sidebar'>
                    <div id='adWrapRight'>
                        <AdVerticalRight />
                        <AdVerticalRight2 />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;