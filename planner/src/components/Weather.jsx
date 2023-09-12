import React, { useEffect, useState } from 'react';

const API_KEY_WEATHER = '454424e4d734ed439e4de2476b24c478';

function Weather({ currentLocation }) {
    const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState();
    const [altCondition, setAltCondition] = useState();
    const [airPollution, setAirpollution] = useState([0.0, 0.0]);
    const [loading, setLoading] = useState(true);

    // 이어서 날씨정보도 가져옴------------------------
    const getWeather = async (lat, lng) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lang=kr&lat=${lat}&lon=${lng}&appid=${API_KEY_WEATHER}&units=metric`;
        const response = await (await fetch(url)).json();
        setTemperature(response.main.temp);
        setCondition(response.weather[0].icon);
        setAltCondition(response.weather[0].description);
        console.log(response);
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
        } else return <span>나쁨</span>;
    };
    const AirDesc1 = () => {
        if (airPollution[1] >= 76) {
            return <span>매우 나쁨</span>;
        } else if (airPollution[1] >= 36) {
            return <span>나쁨</span>;
        } else if (airPollution[1] >= 16) {
            return <span>보통</span>;
        } else return <span>나쁨</span>;
    };
    useEffect(() => {
        if (!currentLocation) return;
        const lat = currentLocation[0];
        const lng = currentLocation[1];
        getWeather(lat, lng);
        getAirPollution(lat, lng);
    }, [currentLocation]);

    return (
        <div id='weather'>
            <p>지금 온도는 ? {temperature}</p>
            <p>
                지금 날씨는 ?
                <img
                    src={`http://openweathermap.org/img/w/${condition}.png`}
                    alt={altCondition}
                />
            </p>
            <p>
                미세먼지 ? {airPollution[0]} <AirDesc /> 초미세먼지 ?{' '}
                {airPollution[1]} <AirDesc1 />
            </p>
        </div>
    );
}

export default Weather;
