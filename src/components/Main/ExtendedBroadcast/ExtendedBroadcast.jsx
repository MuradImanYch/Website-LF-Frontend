import React, { useEffect, useState } from 'react';
import './ExtendedBroadcast.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import ReactPlayer from 'react-player'

const ExtendedBroadcast = () => {
    const {id} = useParams();
    const[selected, setSelected] = useState();
    const[isVisible, setIsVisible] = useState(false);
    const[thread, setThread] = useState(0);

    useEffect(() => {
        $("html, body").animate({ scrollTop: 0 }, "fast");

        const fetchData = () => {
            axios.get('/broadcasts/get')
            .then(response => {
                setSelected(response.data.find((obj) => {
                    return obj.id === +id;
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
        $(window).width() < 1024 && $('video').attr('src', selected && selected.broadcastLink.split(' ')[thread]);
    }, [thread]);

    const switchThr = (e) => {
        $('.extendedBroadcast .nav ul li').css({color: '#000', background: '#fff'});
        $(e.target).css({background: 'rgb(204, 135, 45)', color: '#fff'});
        setThread($(e.target).index());
    }

    return (
        <div className='extendedBroadcast'>
            <h1 className="pageName">{`Трансляция матча: ${selected && selected.hName} - ${selected && selected.aName} | ${selected && selected.lName}`} {selected && selected.broadcastLink === null ? <span style={{color: 'silver', letterSpacing: '1.3px'}}>[Трансляция пока не началась]</span> : <span style={{color: 'red', letterSpacing: '1.3px'}}>[LIVE]</span>}</h1>

            <div className="nav">
                <ul>
                    {selected && selected.broadcastLink.split(' ').map((e, i) => {
                        return <li key={'thread' + i} onClick={switchThr}>Поток {i + 1}</li>
                    })}
                </ul>
            </div>

            {$(window).width() < 1024 && isVisible ? <video id="myVid" className="video-js" controls preload="auto" data-setup="{}">
                <source src={selected && selected.broadcastLink.split(' ')[thread]} type="application/x-mpegURL" />
                <p className="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that
                    <a href="https://videojs.com/html5-video-support/" target={'__blank'}>supports HTML5 video</a>
                </p>
            </video> : $(window).width() < 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}

            {$(window).width() > 1024 && isVisible ? <ReactPlayer url={selected && selected.broadcastLink.split(' ')[thread]} controls id="myVid" /> : $(window).width() > 1024 && <span style={{color: '#000', fontSize: '2em'}}>Загрузка...</span>}
        </div>
    );
};

export default ExtendedBroadcast;