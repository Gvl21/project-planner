import React, { useEffect, useState } from 'react';
import './Map.css';

const { kakao } = window;
const API_KEY_WEATHER = '454424e4d734ed439e4de2476b24c478';

function Map() {
    const [loading, setLoading] = useState(true);
    // const [posi, setPosi] = useState([0.0, 0.0]);
    const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState();
    const [altCondition, setAltCondition] = useState();
    const [airPollution, setAirpollution] = useState([0.0, 0.0]);

    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // setPosi([lat, lng]);

        // 위치 정보를 받아온 후에 지도 생성
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 4,
        };

        const map = new kakao.maps.Map(container, options);
        getWeather(lat, lng);
        getAirPollution(lat, lng);
    };

    //이어서 날씨정보도 가져옴
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
    /**
     *
     */

    const geoError = () => {
        console.log("didn't work :(");
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
        /**
         * -----질문하기 ------------------
         * setPosi 이전에 렌더링 과정에서 console.log 를 실행해서 [0,0]이 나오는 건지
         * 즉 위의 await 전에 useEffect를 먼저 실행해서 그런건가?
         *
         */
        // console.log(posi);
    }, []);

    return (
        <div>
            <div id='map'></div>
            <div>
                <p>지금 온도는 ? {temperature}</p>
                <p>
                    지금 날씨는 ?
                    <img
                        src={`http://openweathermap.org/img/w/${condition}.png`}
                        alt={altCondition}
                    />
                </p>
                <p>
                    미세먼지 ? {airPollution[0]} 초미세먼지 ? {airPollution[1]}
                </p>
            </div>
        </div>
    );
}

export default Map;
