import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Main.css';

import LeagueAll from './LeagueAll/LeagueAll';
import Rpl from './Rpl/Rpl';
import Error from '../Error/Error';

import MatchesSlider from '../Main/MatchesSlider/MatchesSlider';

const Main = (props) => {
    return (
        <div id="league">
            <MatchesSlider />

            <Routes>
                <Route path="/" element={<LeagueAll leagues={props.leagues} />} />
                <Route path="/rpl" element={<Rpl />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;