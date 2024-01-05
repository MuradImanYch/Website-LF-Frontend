import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Main.css';

import TransferNews from './TransferNews/TransferNews';
import TransferList from './TransferList/TransferList';
import Error from '../Error/Error';

// import MatchesSlider from '../Main/MatchesSlider/MatchesSlider';

const Main = () => {
    return (
        <div id='transfers'>
            {/* <MatchesSlider /> */}

            <Routes>
                <Route path="/news" element={<TransferNews />} />
                <Route path="/list" element={<TransferList/>} />

                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;