import React, { useEffect, useState } from 'react';
import './ExtendedMatch.css';
import axios from 'axios';
import { Route, Routes, useParams } from 'react-router-dom';
import $ from 'jquery';
import {Helmet} from 'react-helmet-async';

import Summary from './Summary/Summary';
import Error from '../../Error/Error';

const ExtendedMatch = () => {
    const {id} = useParams();
    const[lLogo, setLLogo] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
                    params: {id},
                    headers: {
                      'X-RapidAPI-Key': '64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5',
                      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
                    }
                };

                const response = await axios.request(options);
	            console.log(response.data);
                setLLogo(response.data.response[0].league.logo);
                  
            } 
            catch (err) {
                console.log(err);
            }
        }

        // fetchData();
    }, [id]);

    return (
        <div id='extMatch'>
            <div className="head">
                <img src={lLogo} alt="leagu" />
            </div>
            <Routes>
                <Route path="/" element={<Summary />} />
    
                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default ExtendedMatch;