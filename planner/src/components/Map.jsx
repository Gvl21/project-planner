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
        </div>
    );
}

export default Map;
