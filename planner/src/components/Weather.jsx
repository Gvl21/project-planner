import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../App';
import './Weather.css';
import styled from 'styled-components';

const API_KEY_WEATHER = '454424e4d734ed439e4de2476b24c478';

const Container = styled.div`
    color: white;
`;

function Weather() {
    const { currentLocation } = useContext(StateContext);
    const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState();
    const [altCondition, setAltCondition] = useState();
    const [airPollution, setAirpollution] = useState([0.0, 0.0]);
    const [city, setCity] = useState();
    // 이어서 날씨정보도 가져옴------------------------
    const getWeather = async (lat, lng) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lang=kr&lat=${lat}&lon=${lng}&appid=${API_KEY_WEATHER}&units=metric`;
        const response = await (await fetch(url)).json();
        setTemperature(response.main.temp);
        setCity(response.name);
        setCondition(response.weather[0].icon);
        setAltCondition(response.weather[0].main);
    };
    const getAirPollution = async (lat, lng) => {
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${API_KEY_WEATHER}&units=metric`;
        const response = await (await fetch(url)).json();
        const pm2_5 = response.list[0].components.pm2_5;
        const pm10 = response.list[0].components.pm10;
        setAirpollution([pm10, pm2_5]);
    };
    const AirDesc = () => {
        if (airPollution[0] >= 76) {
            return <span>매우 나쁨</span>;
        } else if (airPollution[0] >= 36) {
            return <span>나쁨</span>;
        } else if (airPollution[0] >= 16) {
            return <span>보통</span>;
        } else return <span>좋음</span>;
    };
    const AirDesc1 = () => {
        if (airPollution[1] >= 76) {
            return <span>매우 나쁨</span>;
        } else if (airPollution[1] >= 36) {
            return <span>나쁨</span>;
        } else if (airPollution[1] >= 16) {
            return <span>보통</span>;
        } else return <span>좋음</span>;
    };
    const Message = () => {
        if (airPollution[0] >= 76 || airPollution[1] >= 66) {
            return (
                <p>
                    미세먼지가 너무 심해요. <br />
                    외출하지마세요.
                </p>
            );
        } else if (airPollution[0] >= 36 || airPollution[1] >= 36) {
            return (
                <p>
                    미세먼지가 심해요. <br />
                    마스크 챙기세요.
                </p>
            );
        } else return <p>오늘도 즐거운 산책!</p>;
    };
    // const Message1 = () => {
    //     if (altCondition === 'Rain' || altCondition === 'Drizzle') {
    //         return <p>비오니 우산 챙기세요!</p>;
    //     } else if (altCondition === 'Thunderstorm') {
    //         return <p>날씨가 안 좋아요, 천둥번개 조심하세요.</p>;
    //     } else if (altCondition === 'Snow') {
    //         return <p>눈이다!</p>;
    //     } else return <p>테스트!</p>;
    // };

    useEffect(() => {
        if (!currentLocation) return;
        const lat = currentLocation[0];
        const lng = currentLocation[1];
        getWeather(lat, lng);
        getAirPollution(lat, lng);
    }, [currentLocation]);

    return (
        <div id='weather'>
            {' '}
            <Container>
                <div id='weather-header'>
                    <Message />
                    {/* <Message1 /> */}
                    <p id='condition'>
                        날씨 :
                        <img
                            src={`http://openweathermap.org/img/w/${condition}.png`}
                            alt={altCondition}
                        />
                    </p>
                </div>
                <div id='weather-side'>
                    <p>
                        {city}의 기온 : {temperature}
                    </p>

                    <p>
                        미세먼지 : <AirDesc />
                        <span className='air-pol'>{airPollution[0]}</span>
                    </p>
                    <p>
                        {' '}
                        초미세먼지 : <AirDesc1 />
                        <span className='air-pol'>{airPollution[1]}</span>
                    </p>
                </div>
            </Container>
        </div>
    );
}

export default Weather;
