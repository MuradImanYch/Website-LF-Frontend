import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './Main.css';

import LeagueAll from './LeagueAll/LeagueAll';

import Error from '../Error/Error';

import MatchesSlider from '../Main/MatchesSlider/MatchesSlider';

import Rpl from './Rpl/Rpl';
import RplStandings from './Rpl/Standings/Standings';
import RplFixtures from './Rpl/Fixtures/Fixtures';
import RplResults from './Rpl/Results/Results';
import RplTopScores from './Rpl/TopScores/TopScores';

import Epl from './Epl/Epl';
import EplStandings from './Epl/Standings/Standings';
import EplFixtures from './Epl/Fixtures/Fixtures';
import EplResults from './Epl/Results/Results';
import EplTopScores from './Epl/TopScores/TopScores';

import Laliga from './Laliga/Laliga';
import LaligaStandings from './Laliga/Standings/Standings';
import LaligaFixtures from './Laliga/Fixtures/Fixtures';
import LaligaResults from './Laliga/Results/Results';
import LaligaTopScores from './Laliga/TopScores/TopScores';

import Seriea from './Seriea/Seriea';
import SerieaStandings from './Seriea/Standings/Standings';
import SerieaFixtures from './Seriea/Fixtures/Fixtures';
import SerieaResults from './Seriea/Results/Results';
import SerieaTopScores from './Seriea/TopScores/TopScores';

import Bundesliga from './Bundesliga/Bundesliga';
import BundesligaStandings from './Bundesliga/Standings/Standings';
import BundesligaFixtures from './Bundesliga/Fixtures/Fixtures';
import BundesligaResults from './Bundesliga/Results/Results';
import BundesligaTopScores from './Bundesliga/TopScores/TopScores';

import Ligue1 from './Ligue1/Ligue1';
import Ligue1Standings from './Ligue1/Standings/Standings';
import Ligue1Fixtures from './Ligue1/Fixtures/Fixtures';
import Ligue1Results from './Ligue1/Results/Results';
import Ligue1TopScores from './Ligue1/TopScores/TopScores';

import Ucl from './Ucl/Ucl';
import UclStandings from './Ucl/Standings/Standings';
import UclFixtures from './Ucl/Fixtures/Fixtures';
import UclResults from './Ucl/Results/Results';
import UclTopScores from './Ucl/TopScores/TopScores';

import Uel from './Uel/Uel';
import UelStandings from './Uel/Standings/Standings';
import UelFixtures from './Uel/Fixtures/Fixtures';
import UelResults from './Uel/Results/Results';
import UelTopScores from './Uel/TopScores/TopScores';

import Uecl from './Uecl/Uecl';
import UeclStandings from './Uecl/Standings/Standings';
import UeclFixtures from './Uecl/Fixtures/Fixtures';
import UeclResults from './Uecl/Results/Results';
import UeclTopScores from './Uecl/TopScores/TopScores';

import EuQual from './EuQual/EuQual';
import EuQualStandings from './EuQual/Standings/Standings';
import EuQualFixtures from './EuQual/Fixtures/Fixtures';
import EuQualResults from './EuQual/Results/Results';
import EuQualTopScores from './EuQual/TopScores/TopScores';

import Unl from './Unl/Unl';
import UnlStandings from './Unl/Standings/Standings';
import UnlFixtures from './Unl/Fixtures/Fixtures';
import UnlResults from './Unl/Results/Results';
import UnlTopScores from './Unl/TopScores/TopScores';

const Main = (props) => {
    return (
        <div id="league">
            <MatchesSlider />

            <Routes>
                <Route path="/" element={<LeagueAll leagues={props.leagues} />} />

                <Route path="/rpl" element={<Rpl />} />
                <Route path="/rpl/standings" element={<RplStandings />} />
                <Route path="/rpl/fixtures" element={<RplFixtures />} />
                <Route path="/rpl/results" element={<RplResults />} />
                <Route path="/rpl/topscores" element={<RplTopScores />} />

                <Route path="/epl" element={<Epl />} />
                <Route path="/epl/standings" element={<EplStandings />} />
                <Route path="/epl/fixtures" element={<EplFixtures />} />
                <Route path="/epl/results" element={<EplResults />} />
                <Route path="/epl/topscores" element={<EplTopScores />} />

                <Route path="/laliga" element={<Laliga />} />
                <Route path="/laliga/standings" element={<LaligaStandings />} />
                <Route path="/laliga/fixtures" element={<LaligaFixtures />} />
                <Route path="/laliga/results" element={<LaligaResults />} />
                <Route path="/laliga/topscores" element={<LaligaTopScores />} />

                <Route path="/seriea" element={<Seriea />} />
                <Route path="/seriea/standings" element={<SerieaStandings />} />
                <Route path="/seriea/fixtures" element={<SerieaFixtures />} />
                <Route path="/seriea/results" element={<SerieaResults />} />
                <Route path="/seriea/topscores" element={<SerieaTopScores />} />

                <Route path="/bundesliga" element={<Bundesliga />} />
                <Route path="/bundesliga/standings" element={<BundesligaStandings />} />
                <Route path="/bundesliga/fixtures" element={<BundesligaFixtures />} />
                <Route path="/bundesliga/results" element={<BundesligaResults />} />
                <Route path="/bundesliga/topscores" element={<BundesligaTopScores />} />

                <Route path="/ligue1" element={<Ligue1 />} />
                <Route path="/ligue1/standings" element={<Ligue1Standings />} />
                <Route path="/ligue1/fixtures" element={<Ligue1Fixtures />} />
                <Route path="/ligue1/results" element={<Ligue1Results />} />
                <Route path="/ligue1/topscores" element={<Ligue1TopScores />} />

                <Route path="/ucl" element={<Ucl />} />
                <Route path="/ucl/standings" element={<UclStandings />} />
                <Route path="/ucl/fixtures" element={<UclFixtures />} />
                <Route path="/ucl/results" element={<UclResults />} />
                <Route path="/ucl/topscores" element={<UclTopScores />} />

                <Route path="/uel" element={<Uel />} />
                <Route path="/uel/standings" element={<UelStandings />} />
                <Route path="/uel/fixtures" element={<UelFixtures />} />
                <Route path="/uel/results" element={<UelResults />} />
                <Route path="/uel/topscores" element={<UelTopScores />} />

                <Route path="/uecl" element={<Uecl />} />
                <Route path="/uecl/standings" element={<UeclStandings />} />
                <Route path="/uecl/fixtures" element={<UeclFixtures />} />
                <Route path="/uecl/results" element={<UeclResults />} />
                <Route path="/uecl/topscores" element={<UeclTopScores />} />

                <Route path="/eu-qualification" element={<EuQual />} />
                <Route path="/eu-qualification/standings" element={<EuQualStandings />} />
                <Route path="/eu-qualification/fixtures" element={<EuQualFixtures />} />
                <Route path="/eu-qualification/results" element={<EuQualResults />} />
                <Route path="/eu-qualification/topscores" element={<EuQualTopScores />} />

                <Route path="/unl" element={<Unl />} />
                <Route path="/unl/standings" element={<UnlStandings />} />
                <Route path="/unl/fixtures" element={<UnlFixtures />} />
                <Route path="/unl/results" element={<UnlResults />} />
                <Route path="/unl/topscores" element={<UnlTopScores />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;