import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Main.css';

import NewsAll from '../News/NewsAll/NewsAll';
import RplNews from '../News/RplNews/RplNews';
import EplNews from '../News/EplNews/EplNews';
import LaligaNews from '../News/LaligaNews/LaligaNews';
import SerieaNews from '../News/SerieaNews/SerieaNews';
import BundesligaNews from '../News/BundesligaNews/BundesligaNews';
import Ligue1News from '../News/Ligue1News/Ligue1News';
import UclNews from '../News/UclNews/UclNews';
import UelNews from '../News/UelNews/UelNews';
import UeclNews from '../News/UeclNews/UeclNews';
import UnlNews from '../News/UnlNews/UnlNews';
import WcNews from '../News/WcNews/WcNews';
import EcNews from '../News/EcNews/EcNews';
import Error from '../Error/Error';

import MatchesSlider from '../Main/MatchesSlider/MatchesSlider';

const Main = () => {
    return (
        <div id='news'>
            <MatchesSlider />
            
            <Routes>
                <Route path="/" element={<NewsAll />} />
                <Route path="rpl" element={<RplNews />} />
                <Route path="epl" element={<EplNews />} />
                <Route path="laliga" element={<LaligaNews />} />
                <Route path="seriea" element={<SerieaNews />} />
                <Route path="bundesliga" element={<BundesligaNews />} />
                <Route path="ligue1" element={<Ligue1News />} />
                <Route path="ucl" element={<UclNews />} />
                <Route path="uel" element={<UelNews />} />
                <Route path="uecl" element={<UeclNews />} />
                <Route path="unl" element={<UnlNews />} />
                <Route path="wc" element={<WcNews />} />
                <Route path="ec" element={<EcNews />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;