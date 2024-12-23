import React, { useEffect, useState } from 'react';
import './ExtendedBroadcast.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import $ from 'jquery';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet-async';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import '@videojs/themes/dist/forest/index.css';
import Preloader from '../../Preloader/Preloader';
import translate from 'translate';
import config from '../../../conf.json';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import logo from '../../../assets/ico/LF-Logo.png';

const ExtendedBroadcast = () => {
    const { id } = useParams();
    const [selected, setSelected] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [thread, setThread] = useState(0);
    const numArr = [18, 20, 21, 23, 24, 25]
    const [num, setNum] = useState(numArr[Math.floor(Math.random() * numArr.length - 1)]);
    const [player1Status, setPlayer1Status] = useState(true);
    const [translatedText, setTranslatedText] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNum(prevNum => prevNum - 1);
        }, 1000);
        $("html, body").animate({ scrollTop: 0 }, "fast");

        const fetchData = async () => {
            try {
                const response = await axios.get('/broadcasts/get');
                const data = response.data.find((obj) => {
                    return cyrillicToTranslit().transform(obj.id + '-' + obj.hName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + obj.aName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + obj.lName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh')).replace(/\s+/g, '-').toLowerCase() === id;
                });
                
                if (data) {
                    const hNameTranslated = config['correct-translations'][`${await translate(data.hName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(data.hName, {to: 'ru'})}`] : await translate(data.hName, {to: 'ru'});
                    const aNameTranslated = config['correct-translations'][`${await translate(data.aName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(data.aName, {to: 'ru'})}`] : await translate(data.aName, {to: 'ru'});
                    const lNameTranslated = config['correct-translations'][`${await translate(data.lName, {to: 'ru'})}`] ? config['correct-translations'][`${await translate(data.lName, {to: 'ru'})}`] : await translate(data.lName, {to: 'ru'});

                    setSelected({
                        ...data,
                        hName: hNameTranslated,
                        aName: aNameTranslated,
                        lName: lNameTranslated
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }

        // fetchData();
        setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        $(window).width() < 1024 && $('video').attr('src', selected && selected.broadcastLink?.split(' ')[thread].split('_flag_')[0]);
    }, [thread, selected]);

    const switchThr = (e) => {
        setPlayer1Status(true);
        $('.extendedBroadcast .nav ul li').css({ color: '#000', background: '#fff' });
        $(e.target).css({ background: 'rgb(204, 135, 45)', color: '#fff' });
        setThread($(e.target).index());
    }

    const reloadPage = () => {
        window.location.reload(true);
    }

    useEffect(() => {
        const translateText = async () => {
          try {
            const translated = await translate(window.location.pathname.split('/broadcast/watch/')[1].split('-').splice(1).join(' ').split(' ') // Разбиваем строку на массив слов
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Делаем первую букву каждого слова заглавной
            .join(' '), { to: 'ru' });
            setTranslatedText(translated);
          } catch (error) {
            console.error('Error translating text:', error);
          }
        };
    
        translateText();
    }, [translatedText]);

    return (
        <div className='extendedBroadcast'>
            <Helmet>
                <title>{`Смотреть онлайн трансляцию матча: ${selected && selected.hName !== undefined ? selected.hName : translatedText} - ${selected && selected.aName !== undefined ? selected.aName : ''} | ${selected && selected.lName !== undefined ? selected.lName : 'На разных языках'}`}</title>
                <meta name="description" content={`Смотреть онлайн трансляцию матча между командами ${selected && selected.hName !== undefined ? selected.hName : translatedText} и ${selected && selected.aName !== undefined ? selected.aName : ''} в турнире ${selected && selected.lName !== undefined ? selected.lName : 'На разных языках'}`} />
                <meta name="keywords" content={`${selected && selected.hName !== undefined ? selected.hName : translatedText} ${selected && selected.aName !== undefined ? selected.aName : null} смотреть онлайн, онлайн трансляция, бесплатно, без фризов, смотреть матч ${selected && selected.hName !== undefined ? selected.hName : null} ${selected && selected.aName !== undefined ? selected.aName : null}, ${selected && selected.lName !== undefined ? selected.lName : null}`} />
                <link rel="canonical" href={`https://legfootball.com/broadcast/watch/${cyrillicToTranslit().transform(selected && (selected && selected.id + '-' + selected.hName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + selected.aName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh') + '-' + selected.lName.replace(' ', '-').replace('ü', 'u').replace('ə', 'a').replace('ö', 'o').replace('ğ', 'gh').replace('ı', 'i').replace('ç', 'ch').replace('ş', 'sh')).replace(/\s+/g, '-').toLowerCase())}`} />
            </Helmet>
            <h1 style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className="pageName">{`Трансляция матча: ${selected && selected.hName !== undefined ? selected.hName : translatedText} - ${selected && selected.aName !== undefined ? selected.aName : ''} | ${selected && selected.lName !== undefined ? selected.lName : 'ЗАВЕРШЕНА!'}`} {selected && selected?.broadcastLink === null || selected?.broadcastLink === '' ? <span style={{ color: 'silver', letterSpacing: '1.3px' }}>[Трансляция пока не началась]</span> : <span style={{ color: 'red', letterSpacing: '1.3px' }}>[LIVE]</span>} <Link style={{color: 'blue', textDecoration: 'underline', textUnderlineOffset: '3px', fontSize: '0.8em'}} to={'/other/broadcasts'}>Доступные трансляции</Link> {num < 1 ? <button onClick={reloadPage}>Обновить трансляцию</button> : <span className='countdown' style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null}>Трансляция откроется примерно через {num} секунд</span>}</h1> <div style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null} className='info'><div className='infoIco' style={localStorage.getItem('darkTheme') === 'true' ? { color: '#fff' } : null}>i</div> Дождитесь отсчёта и обновите страницу, в противном случае нажмите на другой поток либо воспроизведите на втором плеере</div>

            <div className="row">
                <div>
                    <div className="nav">
                        <ul>
                            {selected && selected?.broadcastLink?.split(' ').map((e, i) => {
                                return <li style={{ position: 'relative' }} key={'thread' + i} onClick={switchThr}>Поток {i + 1} <img style={{ width: '20px', height: '13px', position: 'absolute', top: '-7px', right: '0' }} src={e.split('_flag_')[1]} /></li>
                            })}
                        </ul>
                    </div>

                    <div className='playerTitle' style={{ margin: '30px 0 20px 0' }}>Плеер 1</div>
                    {isVisible ? <div style={{ position: 'relative' }}>
                        {player1Status && <Preloader />}
                        <ReactPlayer onReady={() => { setTimeout(() => { setPlayer1Status(false) }, 3000) }} url={selected && selected.broadcastLink?.split(' ')[thread].split('_flag_')[0]} controls className="myVid" />
                        {/* <img
          src={logo}
          alt="Poster"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
            cursor: 'pointer',
            zIndex: 100,
          }}
        /> */}
                    </div> : $(window).width() > 1024 && <span style={{ color: '#000', fontSize: '2em' }}>Загрузка...</span>}

                    <div className='playerTitle' style={{ margin: '30px 0 20px 0' }}>Плеер 2</div>
                    {isVisible ? <video autoPlay id="myVid" className="video-js" controls preload="auto" data-setup="{}">
                        {player1Status && <Preloader />}
                        <source src={selected && selected.broadcastLink?.split(' ')[thread].split('_flag_')[0]} type="application/x-mpegURL" />
                        <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that
                            <a href="https://videojs.com/html5-video-support/" target={'__blank'}>supports HTML5 video</a>
                        </p>
                    </video> : $(window).width() < 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}

                    <div className='playerTitle' style={{ margin: '30px 0 20px 0' }}>Плеер 3</div>
                    {isVisible ? <Player>
                        {player1Status && <Preloader />}
                        <source src={selected && selected.broadcastLink?.split(' ')[thread].split('_flag_')[0]} />
                    </Player> : $(window).width() < 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default ExtendedBroadcast;
