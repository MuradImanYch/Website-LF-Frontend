import React, { useEffect } from 'react';
import './Main.css';
import $ from 'jquery';
import AdSense from 'react-adsense';
import { Helmet } from 'react-helmet-async';

import MainSlider from './MainSlider/MainSlider';
// import MatchesSlider from './MatchesSlider/MatchesSlider';
import MainNews from './MainNews/MainNews';
import Standings from './Standings/Standings';
import Standings2 from './Standings2/Standings2';
import MainNews2 from './MainNews2/MainNews2';
import MainNews3 from './MainNews3/MainNews3';
import Standings3 from './Standings3/Standings3';
import TopScores from './TopScores/TopScores';
import TopScores2 from './TopScores2/TopScores2';
import TopScores3 from './TopScores3/TopScores3';
import MainNews4 from './MainNews4/MainNews4';
import Standings4 from './Standings4/Standings4';
import Standings5 from './Standings5/Standings5';
import MainNews5 from './MainNews5/MainNews5';
import UEFACountryRank from './UEFACountryRank/UEFACountryRank';
import MainNews6 from './MainNews6/MainNews6';
import TransferList from './TransferList/TransferList';
import VideoNews from './VideoNews/VideoNews';
import EndedMatches from './EndedMatches/EndedMatches';
import Forecasts from './Odds/Odds';
import Standings6 from './Standings6/Standings6';
import Standings7 from './Standings7/Standings7';
import Blogs from './Blogs/Blogs';
import TVSchedule from './TVSchedule/TVSchedule';
import FifaRanking from './FifaRanking/FifaRanking';
// import MatchesLive from './MatchesLive/MatchesLive';
import Broadcasts from './Broadcasts/Broadcasts';
import ExpectedMatches from './ExpectedMatches/ExpectedMatches';

const Main = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0); // scroll top, when open page
    }, []);

    useEffect(() => {
        if(localStorage.getItem('darkTheme') === 'true') {
            $('.sectionName').css({color: '#fff'});
            $('.pageName').css({color: '#fff'});
        }
        else {
            $('.sectionName').css({color: '#000'});
            $('.pageName').css({color: '#000'});
        }
    }, [JSON.parse(localStorage.getItem('darkTheme'))]);

    return (
        <div id='main'>
            <Helmet>
                <title>Актуальные новости, прямые трансляции матчей, результаты встреч и много другое - на Legendary Football</title>
                <meta name="description" content="Новости футбола, бесплатные трансляции матчей, подробные результаты и все, что нужно знать о мире футбола." />
                <meta name="keywords" content="трансляции матчей, смотреть футбол, legfootball главная, ожидаемые матчи, завершенные матчи, таблица уефа, таблица фифа, видео, блоги, турнирная таблица, таблица бомбардиров, новости футбола, результаты футбольных матчей, футбольные новости, футбол, расписание матчей, английская премьер лига, российская премьер лига, лига чемпионов, лига европы, лига конференции, чемпионат мира, чемпионат европы, ла лига, онлайн трансляция, серия а, футбол снг, российский футбол" />
            </Helmet>
            <h1 className="pageName">Главная</h1>
            <div className="mainSliderMatchesLive">
                <MainSlider />
                {/* <MatchesLive /> */}
                {/* <ExpectedMatches /> */}
                {/* <Standings7 /> */}
            </div>
            
            {/* <MatchesSlider /> */}
            <div className="endedForecast">
                <EndedMatches />
                <Forecasts />
            </div>
            <div className="transfers">
                <MainNews6 />
                <div className="transfersBroadcasts">
                    <TransferList />
                    <Broadcasts />
                </div>
            </div>
            <div id="videoBlogs">
                <VideoNews />
                <Blogs />
            </div>
            <Standings />
            <MainNews2 />
            <div className="newsStandings">
                <div className="newsMatchesSchedule">
                    <MainNews3 />
                    <TVSchedule />
                </div>
                <div className="standings">
                    <div>
                        <Standings4 />
                        <Standings5 />
                    </div>
                    <div>
                        <Standings6 />
                    </div>
                </div>
            </div>
            <TopScores />
            <div className="topScoresNews">
                <div className="topScores">
                    <TopScores2 />
                    <TopScores3 />
                </div>
                <div className="standingsNews">
                    <MainNews4 />
                    <div className="standings">
                        <Standings2 />
                        <Standings3 />
                    </div>
                </div>
            </div>
            <MainNews />
            <div className="uefaRanks">
                <UEFACountryRank />
            </div>
            <MainNews5 />
            <FifaRanking />
        </div>
    );
};

export default Main;