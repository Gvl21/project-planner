import React, { useEffect, useState } from 'react';
import './Map.css';

const { kakao } = window;
function Map() {
    const [posi, setPosi] = useState([0.0, 0.0]);

    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setPosi([lat, lng]);

        // 위치 정보를 받아온 후에 지도 생성
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 4,
        };
        const map = new kakao.maps.Map(container, options);
    };

    const geoError = () => {
        console.log("didn't work :(");
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
    }, []);

    return (
        <div id='map'>
            <div></div>
        </div>
    );
}

export default Map;
