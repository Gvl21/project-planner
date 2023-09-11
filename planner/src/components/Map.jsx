import React, { useEffect, useState } from 'react';
import './Map.css';

const { kakao } = window;

function Map() {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(35.1531954, 129.1189465),
            level: 4,
        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id='map'>
            <div></div>
        </div>
    );
}

export default Map;
