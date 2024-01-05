import React, { useEffect, useState } from 'react';
import './ExtendedBroadcast.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import ReactPlayer from 'react-player';
import Helmet from 'react-helmet';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

import AdsenseAd300x250 from '../AdsenseAd300x250/AdsenseAd300x250';

const ExtendedBroadcast = () => {
    const {id} = useParams();
    const[selected, setSelected] = useState();
    const[isVisible, setIsVisible] = useState(false);
    const[thread, setThread] = useState(0);
    const numArr = [18, 20, 21, 23, 24, 25]
    const[num, setNum] = useState(numArr[Math.floor(Math.random() * numArr.length - 1)]);

    useEffect(() => {
        setInterval(() => {
            setNum(prevNum => prevNum - 1);
        }, 1000);
        $("html, body").animate({ scrollTop: 0 }, "fast");

        const fetchData = () => {
            axios.get('/broadcasts/get')
            .then(response => {
                setSelected(response.data.find((obj) => {
                    return obj.id + '-' + cyrillicToTranslit().transform(obj.hName + '-' + obj.aName + '-' + obj.lName).replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '-').toLowerCase() === id;
                }));
            })
            .catch(err => {
                console.log(err);
            });
        }
        
        fetchData();
        setTimeout(() => {
            setIsVisible(true);
        }, 2000);
    }, [id]);

    useEffect(() => {
        $(window).width() < 1024 && $('video').attr('src', selected && selected.broadcastLink?.split(' ')[thread]);
    }, [thread]);

    const switchThr = (e) => {
        $('.extendedBroadcast .nav ul li').css({color: '#000', background: '#fff'});
        $(e.target).css({background: 'rgb(204, 135, 45)', color: '#fff'});
        setThread($(e.target).index());
    }

    const reloadPage = () => {
        window.location.reload(true);
    }

    return (
        <div className='extendedBroadcast'>
            <Helmet>
                <title>{`Смотреть онлайн трансляцию матча: «${selected && selected.hName}» - «${selected && selected.aName}» | ${selected && selected.lName} - на Legendary Football`}</title>
                <meta name="description" content={`Смотреть онлайн трансляцию матча между командами «${selected && selected.hName}» и «${selected && selected.aName}» в турнире ${selected && selected.lName}`} />
                <meta name="keywords" content={`смотреть футбол, онлайн трансляции, бесплатно, без фризов, тв трансляции, смотреть матч, ${selected && selected.hName}, ${selected && selected.aName}, ${selected && selected.lName}`} />
            </Helmet>
            <h1 className="pageName">{`Трансляция матча: ${selected && selected.hName !== undefined ? selected.hName : ''} - ${selected && selected.aName !== undefined ? selected.aName : ''} | ${selected && selected.lName !== undefined ? selected.lName : 'Ссылка на трансляцию недействительна'}`} {selected && selected?.broadcastLink === null || selected?.broadcastLink === '' ? <span style={{color: 'silver', letterSpacing: '1.3px'}}>[Трансляция пока не началась]</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>[LIVE]</span>} {num < 1 ? <button onClick={reloadPage}>Обновить трансляцию</button> : <span className='countdown'>Трансляция откроется примерно через {num} секунд</span>}</h1> <div className='info'><div className='infoIco'>i</div> Дождитесь отсчёта и обновите страницу, либо нажмите на другой поток</div>

            <div className="row">
                <div>
                    <div className="nav">
                        <ul>
                            {selected && selected?.broadcastLink?.split(' ').map((e, i) => {
                                return <li key={'thread' + i} onClick={switchThr}>Поток {i + 1}</li>
                            })}
                        </ul>
                    </div>

                    {/* {$(window).width() < 1024 && isVisible ? <video autoPlay id="myVid" className="video-js" controls preload="auto" data-setup="{}">
                        <source src={selected && selected.broadcastLink?.split(' ')[thread]} type="application/x-mpegURL" />
                        <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that
                            <a href="https://videojs.com/html5-video-support/" target={'__blank'}>supports HTML5 video</a>
                        </p>
                    </video> : $(window).width() < 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>} */}

                    {$(window).width() < 1024 && isVisible ? <Player>
                        <source src={selected && selected.broadcastLink?.split(' ')[thread]} />
                    </Player> : $(window).width() < 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}

                    {$(window).width() > 1024 && isVisible ? <ReactPlayer url={selected && selected.broadcastLink?.split(' ')[thread]} controls id="myVid" /> : $(window).width() > 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}
                </div>
                <div>
                    <AdsenseAd300x250 />
                </div>
            </div>
        </div>
    );
};

export default ExtendedBroadcast;