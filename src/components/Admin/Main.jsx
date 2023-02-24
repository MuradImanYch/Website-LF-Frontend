import React from 'react';
import './Main.css';
import { Link, Route, Routes } from 'react-router-dom';
import $ from 'jquery';
import { useState, useEffect } from 'react';

import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';
import AddNews from './AddNews/AddNews';
import EditDeleteNews from './EditDeleteNews/EditDeleteNews';
import Error from '../Error/Error';

import homeIco from '../../assets/ico/homeIco.webp';
import newsIco from '../../assets/ico/newspaperIco.webp';
import addIco from '../../assets/ico/add.webp';

const Main = () => {
    const[barState, setBarstate] = useState(true); 

    const menuToggle = () => {
        if($(window).width() <= 1024) { // for mobile
            setBarstate(!barState);
            if(barState) {
                $('.bar1Admin').css({'transform': 'rotate(-45deg) translate(-8px, 7px)'});
                $('.bar2Admin').css({'opacity': '0'});
                $('.bar3Admin').css({'transform': 'rotate(45deg) translate(-8px, -8px)'});
                $('.bar1Admin').css({'backgroundColor': '#000'});
                $('.bar2Admin').css({'backgroundColor': '#000'});
                $('.bar3Admin').css({'backgroundColor': '#000'});
                $('#adminNav').slideDown();
            }
            else {
                $('.bar1Admin').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('.bar2Admin').css({'opacity': '1'});
                $('.bar3Admin').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('.bar1Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
                $('.bar2Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
                $('.bar3Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
                $('#adminNav').slideUp();
            }
        }
    }

    useEffect(() => {
        if($(window).width() <= 1024) { // for mobile
            $('#adminNav a').click(() => {
                setBarstate(true);
                $('#adminNav').slideUp();
                $('.bar1Admin').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('.bar2Admin').css({'opacity': '1'});
                $('.bar3Admin').css({'transform': 'rotate(0deg) translate(0px, 0px)'});
                $('.bar1Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
                $('.bar2Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
                $('.bar3Admin').css({'backgroundColor': 'rgb(145, 99, 40)'});
            });
        }
    }, []);

    return (
        <div id='adminMain'>
            <div id="menuToggleAdminWrap">
                <div id="menuToggleAdmin" onClick={menuToggle}>
                    <div className="bar1Admin"></div>
                    <div className="bar2Admin"></div>
                    <div className="bar3Admin"></div>
                </div>
            </div>
            <div id="adminNav">
                <ul>
                    <li><Link to="/Website-LF-Frontend/admin/dashboard"><img src={homeIco} alt="ico" /> Главная панель</Link></li>
                    <li><Link to="/Website-LF-Frontend/admin/news"><img src={newsIco} alt="ico" /> Все новости</Link></li>
                    <li><Link to="/Website-LF-Frontend/admin/addnews"><img src={addIco} alt="ico" /> Добавить новость</Link></li>
                </ul>
            </div>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="news" element={<EditDeleteNews />} />
                <Route path="addnews" element={<AddNews />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </div>
    );
};

export default Main;