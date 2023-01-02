import React from 'react';
import './Main.css';

import MainSlider from './MainSlider/MainSlider';
import MatchesSlider from './MatchesSlider/MatchesSlider';
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
import Blogs from './Blogs/Blogs';
import TVSchedule from './TVSchedule/TVSchedule';
import FifaRanking from './FifaRanking/FifaRanking';

const Main = (props) => {

    return (
        <div id='main'>
            <h1 className="pageName">Главная</h1>
            <MainSlider />
            <MatchesSlider />
            <div className="endedForecast">
                <EndedMatches />
                <Forecasts />
            </div>
            <div className="transfers">
                <MainNews6 />
                <TransferList />
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