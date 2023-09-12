import React, { useEffect, useState } from 'react';
import './Map.css';

const { kakao } = window;
const API_KEY_WEATHER = '454424e4d734ed439e4de2476b24c478';

function Map() {
    const [loading, setLoading] = useState(true);
    const [posi, setPosi] = useState([0.0, 0.0]);
    const [targetLocation, setTargetLocation] = useState({});
    const [temperature, setTemperature] = useState(0);
    const [condition, setCondition] = useState();
    const [altCondition, setAltCondition] = useState();
    const [airPollution, setAirpollution] = useState([0.0, 0.0]);

    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // if (loading) {
        //     setInterval(500, setPosi([lat, lng]));
        //     setTimeout(2000, setLoading(false));
        // }

        // 위치 정보를 받아온 후에 지도 생성하기------------------
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 5,
        };

        const map = new kakao.maps.Map(container, options);
        getWeather(lat, lng);
        getAirPollution(lat, lng);
        // 지도에 마커를 생성하고 표시한다
        // 지도를 클릭한 위치에 표출할 마커입니다
        let marker = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter(),
        });

        // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
        });
    };

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
    /**
     *
     */

    const geoError = () => {
        alert("location system didn't work :(");
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
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
        /**
         * -----질문하기 ------------------
         * setPosi 이전에 렌더링 과정에서 console.log 를 실행해서 [0,0]이 나오는 건지
         * 즉 위의 await 전에 useEffect를 먼저 실행해서 그런건가?
         *
         */
        // console.log(posi);
    }, []);
    // if (!loading) {
    //     return <div id='loading'>로딩중입니다...</div>;
    // } else {
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
                    미세먼지 ? {airPollution[0]} <AirDesc /> 초미세먼지 ?{' '}
                    {airPollution[1]} <AirDesc1 />
                </p>
            </div>
        </div>
    );
}
// }

export default Map;
