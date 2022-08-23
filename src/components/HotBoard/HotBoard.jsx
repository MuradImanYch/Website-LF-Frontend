import React, { useEffect, useState } from 'react';
import './HotBoard.css';
import $ from 'jquery';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

function HotBoard(props) {
    const[arrowToggle, setArrowToggle] = useState(true);
    const[fixturesLive, setFixtureLive] = useState();
    const[live, setLive] = useState("0");
    const[loopCenter, setLoopCenter] = useState(true);
    let leagId = [];
    let uniqLeagId;
    const[leagueOption, setLeagueOption] = useState();
    const[all, setAll] = useState('Матчей нет');
    const[switchLeague, setSwitchLeague] = useState("");

    const arrowToggleFunc = () => { // arrow toggle function
        setArrowToggle(!arrowToggle);
        if(arrowToggle) {
            $('#hotBoard .arrowWrap .innerWrap i').css({'transform': 'rotate(180deg)'});
            $('#hotBoard .slideWrap .col:first-child img, #hotBoard .slideWrap .col:last-child img').show();
            $('#hotBoard .slideWrap .col:nth-child(2) img').show();
            $('#hotBoard .slideWrap .periodTimeWrap').css({'display': 'flex'});
            $('#hotBoard .slideWrap .scoreWrap').css({'fontSize': '1.3em'});
            $('#hotBoard, #hotBoard .swiper-wrapper, #hotBoard .swiper-slide, #hotBoard .slideWrap, #hotBoard progress').animate({'minHeight': '85px'});
            $('#hotBoard .swiper-container').animate({'maxHeight': '85px'});
        }
        else {
            $('#hotBoard .arrowWrap .innerWrap i').css({'transform': 'rotate(0deg)'});
            $('#hotBoard .slideWrap .col:first-child img, #hotBoard .slideWrap .col:last-child img').hide();
            $('#hotBoard .slideWrap .col:nth-child(2) img').hide();
            $('#hotBoard .slideWrap .periodTimeWrap').css({'display': 'none'});
            $('#hotBoard .slideWrap .scoreWrap').css({'fontSize': '0.8em'});
            $('#hotBoard, #hotBoard .swiper-wrapper, #hotBoard .swiper-slide, #hotBoard .slideWrap, #hotBoard progress').animate({'minHeight': '30px'});
            $('#hotBoard .swiper-container').animate({'maxHeight': '30px'});
        }
    }

    const leagueSwitch = (e) => { // league switcher 
        setSwitchLeague(e.target.value);
        if(!arrowToggle) {
            $('#hotBoard .slideWrap .col:first-child img, #hotBoard .slideWrap .col:last-child img').show();
            $('#hotBoard .slideWrap .col:nth-child(2) img').show();
            $('#hotBoard .slideWrap .periodTimeWrap').css({'display': 'flex'});
            $('#hotBoard .slideWrap .scoreWrap').css({'fontSize': '1.3em'});
            $('#hotBoard, #hotBoard .swiper-wrapper, #hotBoard .swiper-slide, #hotBoard .slideWrap, #hotBoard progress').animate({'minHeight': '85px'});
            $('#hotBoard .swiper-container').animate({'maxHeight': '85px'});
        }
    }

    const fetchItems = async () => { // fetch from API FOOTBALL (Live matches)
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": `https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all${switchLeague}`,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "64ba7a5252msh7ee95ca829ca2e4p126736jsn8b074c27e2a5"
            }
        };
        $.ajax(settings).done(function (response) {
            if(response.results < 6) { // check count of live matches for loop & center true/false
                setLoopCenter(false);
            }

            if(response.results > 0) { // check count of live matches for > 0
                $('#hotBoard .arrowWrap .innerWrap span').css({'color': 'red'});
                $('#hotBoard .arrowWrap .innerWrap span').css({'boxShadow': ' 0px 0px 3px red'});
                $('#hotBoard .arrowWrap .innerWrap select').css({'boxShadow': ' 0px 0px 3px red'});
                setAll('Все');
            }

            setLive(response.results); // live count of matches

            response.response && response.response.map((e) => { // push league id in arr
                leagId.push({id: e.league.id, name: e.league.country + ' | ' + e.league.name});
            });
            
            uniqLeagId = [...new Map(leagId.map((item) => [item["id"], item])).values()]; // sorting unique id in arr
            
            setLeagueOption(uniqLeagId.map((e) => { // set league select option JSX
                return <option value={'&league=' + e.id} key={e.id} id={'league' + e.id}>
                            {e.name}
                        </option>
            }));

            if(!arrowToggle) { // correct display when the slider is expanded
                setTimeout(() => {
                    $('#hotBoard .slideWrap .col:first-child img, #hotBoard .slideWrap .col:last-child img').show();
                    $('#hotBoard .slideWrap .col:nth-child(2) img').show();
                    $('#hotBoard .slideWrap .periodTimeWrap').css({'display': 'flex'});
                    $('#hotBoard .slideWrap .scoreWrap').css({'fontSize': '1.3em'});
                    $('#hotBoard, #hotBoard .swiper-wrapper, #hotBoard .swiper-slide, #hotBoard .slideWrap, #hotBoard progress').animate({'minHeight': '85px'});
                    $('#hotBoard .swiper-container').animate({'maxHeight': '85px'});
                });
            }

            setFixtureLive(response.response && response.response.map((liveFx) => { 
                return <SwiperSlide key={liveFx.fixture.id} id={'fx'+liveFx.fixture.id}>
                        <progress max="90" value={liveFx.fixture.status.elapsed}></progress> 
                            <div className="slideWrap">
                                <div className="col">
                                    <img src={liveFx.teams.home.logo} alt="hLogo" title={liveFx.teams.home.name} />
                                    <span title={liveFx.teams.home.name}>{liveFx.teams.home.name}</span>
                                </div>
                                <div className="col">
                                    <img src={liveFx.league.logo} alt="lLogo" title={liveFx.league.country + ' | ' + liveFx.league.name + ' | ' + liveFx.league.round} />
                                    <div className='scoreWrap'>
                                        <span>{liveFx.goals.home}</span>
                                        <span>-</span>
                                        <span>{liveFx.goals.away}</span>
                                    </div>
                                    <div className='periodTimeWrap'>
                                        <span className='period'>{liveFx.fixture.status.short}</span>
                                        <span className='time'>{liveFx.fixture.status.elapsed}</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={liveFx.teams.away.logo} alt="aLogo" title={liveFx.teams.away.name} />
                                    <span title={liveFx.teams.away.name}>{liveFx.teams.away.name}</span>
                                </div>
                            </div>
                        </SwiperSlide>
            }));
        });
    }
    /* useEffect(() => {
        fetchItems();
        setInterval(() => {
            fetchItems();
        }, 60000);
    }, [switchLeague]); */


    return (
        <div id="hotBoard">
            <Swiper grabCursor={true} centeredSlides={loopCenter} speed={6000} loop={loopCenter} autoplay={{delay: 1, disableOnInteraction: false}} slidesPerView={2} breakpoints={{768: {slidesPerView: 4}, 1200: {slidesPerView: 5}, 280: {slidesPerView: 1}, 370: {slidesPerView: 2}, 1920: {slidesPerView: 6}}} freeMode={true}>
                {fixturesLive}    
            </Swiper>
            <div className="arrowWrap">
                <div className="innerWrap">
                    <span title='Live'>{live}</span>
                    <i className="fas fa-chevron-down" onClick={arrowToggleFunc}></i>
                    <select onChange={leagueSwitch} name="leaguesOpt" id="leaguesOpt">
                        <option value="">{all}</option>
                        {leagueOption}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default HotBoard;