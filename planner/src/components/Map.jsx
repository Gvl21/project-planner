import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../App';
import './Map.css';

const { kakao } = window;

function Map() {
    const currentLocation = useContext(StateContext);
    const [targetLocation, setTargetLocation] = useState([0.0, 0.0]);
    const [checked, setChecked] = useState(false);

    let map;

    const mapMaker = () => {
        if (!currentLocation) return;
        const curLat = currentLocation[0];
        const curLng = currentLocation[1];
        const container = document.getElementById('map'),
            options = {
                center: new kakao.maps.LatLng(curLat, curLng),
                level: 5,
            };
        map = new kakao.maps.Map(container, options);

        getMarker();
    };

    const getMarker = () => {
        if (!map) {
            return;
        }
        let marker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        let curMarker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        curMarker.setMap(map);
        let checking = () => {
            marker.setMap(map);
            setChecked(true);
        };

        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            if (!checked) {
                checking();
            }
            marker.setPosition(latlng);

            let tempLat = latlng.getLat();
            let tempLng = latlng.getLng();
            setTargetLocation([tempLat, tempLng]);
        });
    };
    const routeHandler = () => {
        let request = new XMLHttpRequest();

        request.open(
            'POST',
            'https://api.openrouteservice.org/v2/directions/foot-walking/json'
        );

        request.setRequestHeader(
            'Accept',
            'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
        );
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader(
            'Authorization',
            '5b3ce3597851110001cf6248d734b8609a6b4b21992bb122f99e9996'
        );

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
            }
        };

        const body = `{"coordinates":[[${currentLocation[1]},${currentLocation[0]}],[${targetLocation[1]},${targetLocation[0]}]]}`;
        console.log(body);
        request.send(body);
    };

    useEffect(() => {
        mapMaker();
    }, [currentLocation]);

    useEffect(() => {
        console.log(targetLocation);
    }, [targetLocation]);

    return (
        <div id='map-layer'>
            <h3>현재 위치</h3>
            <div id='map'></div>
            <button onClick={routeHandler}>여기로 가보기</button>
        </div>
    );
}

export default Map;
