import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
import unlLogo from './assets/ico/unlLogo.webp';
import topScores from './assets/ico/topScores.webp';

import HotBoard from './components/HotBoard/HotBoard';
import AdVerticalLeft from './components/Main/AdVerticalLeft/AdVerticalLeft';
import AdVerticalLeft2 from './components/Main/AdVerticalLeft2/AdVerticalLeft2';
import AdVerticalRight from './components/Main/AdVerticalRight/AdVerticalRight';
import AdVerticalRight2 from './components/Main/AdVerticalRight2/AdVerticalRight2';
import Main from './components/Main/Main';
import Error from './components/Error/Error';
import ExtendedNews from './components/Main/ExtendedNews/ExtendedNews';
import Admin from './components/Admin/Main';
import News from './components/News/Main';
import Transfers from './components/Transfers/Main';
import Other from './components/Other/Main';
import Poll from './components/Main/Poll/Poll';
import League from './components/League/Main';

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

    $('#mNavWrap ul li a').click(() => {
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
        {name: '??????', img: rplLogo, id: 'rpl', title: '????????????'},
        {name: '??????', img: eplLogo, id: 'epl', title: '????????????'},
        {name: '???? ????????', img: laligaLogo, id: 'laliga', title: '??????????????'},
        {name: '?????????? ??', img: serieaLogo, id: 'seriea', title: '????????????'},
        {name: '????????????????????', img: bundesligaLogo, id: 'bundesliga', title: '????????????????'},
        {name: '???????? 1', img: ligue1Logo, id: 'ligue1', title: '??????????????'},
        {name: '????', img: uclLogo, id: 'ucl', title: '???????? ??????????????????'},
        {name: '????', img: uelLogo, id: 'uel', title: '???????? ????????????'},
        {name: '????', img: ueclLogo, id: 'uecl', title: '???????? ??????????????????????'},
        {name: '????', img: unlLogo, id: 'unl', title: '???????? ?????????? ????????'},
        {name: '???? 2022', img: wcLogo, id: 'wc', title: '?????????????????? ????????'},
        {name: '???? 2024', img: ecLogo, id: 'ec', title: '?????????????????? ????????????'}
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
                                    <Tippy placement='left' content='?????? ??????????????'><Link to="/news">?????????????? <i className="fas fa-caret-down"></i>
                                    </Link></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <Tippy key={e.id + 'dNews'} placement='left' content={e.title}>
                                            <li className={e.id + 'NewsMenu'}>
                                                <Link to={'/news/' + e.id}><img src={e.img} alt={e.name} />{e.name}</Link>
                                            </li>
                                        </Tippy>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dLeagueEnter} onMouseLeave={dLeagueOut}>
                                    <Tippy placement='left' content='?????? ??????????????'><Link to="/league">???????? <i className="fas fa-caret-down"></i>
                                    </Link></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <Tippy key={e.id + 'dLeague'} placement='left' content={e.title}>
                                            <li className={`${e.id}LeagueMenu`}>
                                                <Link to={'/league/' + e.id}><img src={e.img} alt={e.name} />{e.name} <i className='fas fa-caret-right'></i></Link>
                                                <ul className='subSubMenuWrap'>
                                                    <Tippy placement='right' content={`?????????????????? ${e.name}`}>
                                                        <li>
                                                            <Link to=""><i className="fas fa-calendar-alt"></i> ??????????????????</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy placement='right' content={`?????????????? ${e.name}`}>
                                                        <li>
                                                            <Link to=""><i className="fas fa-list-ol"></i> ??????????????</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy placement='right' content={`???????????????????? ${e.name}`}>
                                                        <li>
                                                            <Link to=""><i className="fas fa-clipboard-list"></i> ????????????????????</Link>
                                                        </li>
                                                    </Tippy>
                                                    <Tippy placement='right' content={`???????????????????? ${e.name}`}>
                                                        <li>
                                                            <Link to=""><img src={topScores} /> ????????????????????</Link>
                                                        </li>
                                                    </Tippy>
                                                </ul>
                                            </li>
                                        </Tippy>
                                        )}
                                    </ul>
                                </li>
                                <li onMouseEnter={dTransfersEnter} onMouseLeave={dTransfersOut}>
                                    <div>?????????????????? <i className="fas fa-caret-down"></i>
                                    </div>
                                    <ul className='subMenuWrap transfersSubMenu'>
                                        <li><Link to="/transfers/news"><img src={newspaperIco} alt="news" /> ??????????????</Link></li>
                                        <li><Link to="/transfers/list"><img src={transferIco} alt="transfers" /> ????????????????</Link></li>
                                    </ul>
                                </li>
                                <li onMouseEnter={dOthersEnter} onMouseLeave={dOthersOut}>
                                    <div>???????????? <i className="fas fa-caret-down"></i></div>
                                    <ul className='subMenuWrap o???? ????????????????????thersSubMenu'>
                                        <li><Link to="/other/news"><img src={newspaperIco} alt="other news" /> ??????????????</Link></li>
                                        <li><Link to="/other/blogs"><img src={newspaperIco} alt="blog" /> ??????????</Link></li>
                                        <li><Link to="/other/video"><img src={videoReviews} alt="video news" /> ??????????</Link></li>
                                        <li><Link to="/other/uefa-country-ranking"><img src={rank} alt="uefa ranking" /> ?????????????? ????????</Link></li>
                                        <li><Link to="/other/fifa-ranking"><img src={rank} alt="fifa ranking" /> ?????????????? ????????</Link></li>
                                        <li><Link to="/other/tvschedule"><img src={tvProgram} alt="tv program" /> ???? ????????????????????</Link></li>
                                        <li><Link to="/other/odds"><img src={forecasts} alt="forecasts" /> ??????????????????</Link></li>
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
                                    <Tippy placement='left' content='?????? ??????????????'><div><Link to="/news">??????????????</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div></Tippy>
                                    <ul className='subMenuWrap'>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} className={e.id + 'NewsMenu'} key={e.id + 'mNews'}>
                                            <Link to={'/news/' + e.id}><img src={e.img} alt={e.name} />{e.name}</Link>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <Tippy placement='left' content='?????? ??????????????'><div><Link to="/league">????????</Link> <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div></Tippy>
                                    <ul>
                                        {leagues && leagues.map((e) => 
                                        <li title={e.title} key={e.id + 'mLeague'}>
                                            <div>
                                                <Link to={'/league/' + e.id}><img src={e.img} alt={e.name} />{e.name}</Link> <i className='far fa-caret-square-down' onClick={mMenuDownUp}></i>
                                            </div>
                                            <ul className={e.id+'LeagueWrap'}>
                                                <li title={`?????????????????? ${e.name}`}>
                                                    <Link to=""><i className="fas fa-calendar-alt"></i> ??????????????????</Link>
                                                </li>
                                                <li title={`?????????????? ${e.name}`}>
                                                    <Link to=""><i className="fas fa-list-ol"></i> ??????????????</Link>
                                                </li>
                                                <li title={`???????????????????? ${e.name}`}>
                                                    <Link to=""><i className="fas fa-clipboard-list"></i> ????????????????????</Link>
                                                </li>
                                                <li title={`???????????????????? ${e.name}`}>
                                                    <Link to=""><img src={topScores} /> ????????????????????</Link>
                                                </li>
                                            </ul>
                                        </li>
                                        )}
                                    </ul>
                                </li>
                                <li>
                                    <div>?????????????????? <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='transfersSubMenu'>
                                        <li><Link to="/transfers/news"><img src={newspaperIco} alt="news" /> ??????????????</Link></li>
                                        <li><Link to="/transfers/list"><img src={transferIco} alt="transfer" /> ????????????????</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <div>???????????? <i onClick={mMenuDownUp} className="far fa-caret-square-down"></i></div>
                                    <ul className='othersSubMenu'>
                                        <li><Link to="/other/news"><img src={newspaperIco} alt="other news" /> ??????????????</Link></li>
                                        <li><Link to="/other/blogs"><img src={newspaperIco} alt="blog" /> ??????????</Link></li>
                                        <li><Link to="/other/video"><img src={videoReviews} alt="video news" /> ??????????</Link></li>
                                        <li><Link to="/other/uefa-country-ranking"><img src={rank} alt="uefa ranking" /> ?????????????? ????????</Link></li>
                                        <li><Link to="/other/fifa-ranking"><img src={rank} alt="fifa ranking" /> ?????????????? ????????</Link></li>
                                        <li><Link to="/other/tvschedule"><img src={tvProgram} alt="tv program" /> ???? ????????????????????</Link></li>
                                        <li><Link to="/other/odds"><img src={forecasts} alt="forecasts" /> ??????????????????</Link></li>
                                    </ul>
                                </li>
                                <li className='actual'>
                                    <div><Link to="">----</Link></div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="socnetWrap">
                        <a title="??????????????????" href="https://vk.com/leg.football" target="__blank"><i onMouseEnter={vkMouseEnter} onMouseLeave={vkMouseLeave} className="fab fa-vk"></i></a>
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

                        <Poll />
                    </div>
                </div>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='news/*' element={<News />} />
                        <Route path='news/read/:id' element={<ExtendedNews />} />
                        <Route path='admin/*' element={<Admin />} />
                        <Route path='transfers/*' element={<Transfers />} />
                        <Route path='other/*' element={<Other />} />
                        <Route path='league/*' element={<League leagues={leagues} />} />
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