import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../App';
import './Map.css';

const { kakao } = window;
const API_KEY_AUTHERIZATION =
    '5b3ce3597851110001cf6248d734b8609a6b4b21992bb122f99e9996';

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

        let curMarker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        let imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
            imageSize = new kakao.maps.Size(28, 32);
        // imageOption = { offset: new kakao.maps.Point(27, 69) }
        let markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize
            // imageOption
        );
        let marker = new kakao.maps.Marker({
            position: map.getCenter(),
            image: markerImage,
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
        request.setRequestHeader('Authorization', API_KEY_AUTHERIZATION);

        request.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
                // var linePath = [
                //     new kakao.maps.LatLng(33.452344169439975, 126.56878163224233),
                //     new kakao.maps.LatLng(33.452739313807456, 126.5709308145358),
                //     new kakao.maps.LatLng(33.45178067090639, 126.5726886938753)
                // ];

                // // 지도에 표시할 선을 생성합니다
                // var polyline = new kakao.maps.Polyline({
                //     path: linePath, // 선을 구성하는 좌표배열 입니다
                //     strokeWeight: 5, // 선의 두께 입니다
                //     strokeColor: '#FFAE00', // 선의 색깔입니다
                //     strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                //     strokeStyle: 'solid' // 선의 스타일입니다
                // });

                // // 지도에 선을 표시합니다
                // polyline.setMap(map);
            }
        };
        const body = `{"coordinates":[[${currentLocation[1]},${currentLocation[0]}],[${targetLocation[1]},${targetLocation[0]}]]}`;

        request.send(body);
    };

    const drawLine = () => {};
    useEffect(() => {
        mapMaker();
    }, [currentLocation]);

    useEffect(() => {
        console.log(targetLocation);
    }, [targetLocation]);
    useEffect(() => {
        drawLine();
    }, []);

    return (
        <div id='map-layer'>
            <h3>현재 위치</h3>
            <div id='map'></div>
            <button onClick={routeHandler}>여기로 가보기</button>
        </div>
    );
}

export default Map;
