import React from 'react';
import './Main.css';
import { Route, Routes } from 'react-router-dom';

import OtherNews from './OtherNews/OtherNews';
import Blogs from './Blogs/Blogs';
import Video from './Video/Video';
import UEFACountryRank from './UEFACountryRank/UEFACountryRank';
import FifaRanking from './FifaRanking/FifaRanking';
import TVSchedule from './TVSchedule/TVSchedule';
import Odds from './Odds/Odds';
import Broadcasts from './Broadcasts/Broadcasts';
import Error from '../Error/Error';

import MatchesSlider from '../Main/MatchesSlider/MatchesSlider';

const Main = () => {
    return (
        <div id="other">
            <MatchesSlider />

            <Routes>
                <Route path="/news" element={<OtherNews />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/video" element={<Video />} />
                <Route path="/uefa-country-ranking" element={<UEFACountryRank />} />
                <Route path="/fifa-ranking" element={<FifaRanking />} />
                <Route path="/tvschedule" element={<TVSchedule />} />
                <Route path="/odds" element={<Odds />} />
                <Route path="/broadcasts" element={<Broadcasts />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;