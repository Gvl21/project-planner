import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../App';
import './Map.css';

const { kakao } = window;
const API_KEY_AUTHERIZATION =
    '5b3ce3597851110001cf6248d734b8609a6b4b21992bb122f99e9996';

function Map() {
    const { currentLocation } = useContext(StateContext);
    const [targetLocation, setTargetLocation] = useState(null);
    const [marked, setMarked] = useState(false);
    const [routes, setRoutes] = useState(null);
    const [checked, setChecked] = useState(false);
    const [checkedTarget, setCT] = useState({});
    const [point, setPoint] = useState('');
    const [distance, setDistance] = useState(0);

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
    //?

    const getMarker = () => {
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
        let curMarker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        if (!map) {
            return;
        }
        if (checked && targetLocation) {
            marker.setMap(map);
            marker.setPosition(checkedTarget);
        }

        let marking = () => {
            marker.setMap(map);
            setMarked(true);
        };
        //
        curMarker.setMap(map);

        kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
            const latlng = mouseEvent.latLng;
            marking();
            marker.setPosition(latlng);
            setCT(marker.getPosition()); // LatLng 타입 데이터 리턴
            let tempLat = latlng.getLat();
            let tempLng = latlng.getLng();
            setTargetLocation([tempLat, tempLng]);
        });
    };

    /**
   * Decode an x,y or x,y,z encoded polylin
//    * @param {*} encodedPolyline
//    * @param {Boolean} includeElevation - true for x,y,z polyline
//    * @returns {Array} of coordinates
   */
    //// geometry 디코딩 함수
    const decoding = (encodedPolyline, includeElevation) => {
        // array that holds the points
        let points = [];
        let index = 0;
        const len = encodedPolyline.length;
        let lat = 0;
        let lng = 0;
        let ele = 0;
        while (index < len) {
            let b;
            let shift = 0;
            let result = 0;
            do {
                b = encodedPolyline.charAt(index++).charCodeAt(0) - 63; // finds ascii
                // and subtract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            shift = 0;
            result = 0;
            do {
                b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

            if (includeElevation) {
                shift = 0;
                result = 0;
                do {
                    b = encodedPolyline.charAt(index++).charCodeAt(0) - 63;
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                } while (b >= 0x20);
                ele += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            }
            try {
                let location = [lat / 1e5, lng / 1e5];
                if (includeElevation) location.push(ele / 100);
                points.push(location);
            } catch (e) {
                console.log('경로를 가져오지 못했습니다.');
            }
        }
        setChecked(true);
        return points;
    };
    // const mockUpHandler = () => {
    //     // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
    //     var linePath = [
    //         new kakao.maps.LatLng(35.14817, 129.11395),
    //         new kakao.maps.LatLng(35.14571, 129.11109),
    //     ];

    //     // 지도에 표시할 선을 생성합니다
    //     var polyline = new kakao.maps.Polyline({
    //         path: linePath, // 선을 구성하는 좌표배열 입니다
    //         strokeWeight: 5, // 선의 두께 입니다
    //         strokeColor: '#FFAE00', // 선의 색깔입니다
    //         strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    //         strokeStyle: 'solid', // 선의 스타일입니다
    //     });

    //     // 지도에 선을 표시합니다
    //     polyline.setMap(map);
    // };

    async function newHandler() {
        const url =
            'https://api.openrouteservice.org/v2/directions/foot-walking/json';

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Content-Type': 'application/json',
                Authorization: API_KEY_AUTHERIZATION,
            },
            body: `{"coordinates":[[${currentLocation[1]},${currentLocation[0]}],[${targetLocation[1]},${targetLocation[0]}]]}`,
        });
        const jsonData = await response.json();

        return jsonData;
    }

    async function routeHandler() {
        if (!targetLocation) {
            return;
        }
        const routeData = await newHandler();
        const arriveAt =
            routeData.routes[0].segments[0].steps.slice(-1)[0].instruction;
        const arrivePoint = arriveAt.substring(
            arriveAt.indexOf('t') + 1,
            arriveAt.indexOf(',')
        );
        const tempDistance = routeData.routes[0].summary.distance;

        setPoint(arrivePoint || '목적지');
        setDistance(tempDistance);

        const encodedRoute = routeData.routes[0].geometry;

        const decodedRoute = decoding(encodedRoute);

        // 선을 구성하는 좌표 배열입니다. 이 좌표들을 이어서 선을 표시합니다
        var linePath = decodedRoute.map((e) => {
            const [tempLocation0, tempLocation1] = e;
            return new kakao.maps.LatLng(tempLocation0, tempLocation1);
        });
        setRoutes(linePath);
    }

    const drawLine = () => {
        // 지도에 표시할 선을 생성합니다

        var polyline = new kakao.maps.Polyline({
            path: routes, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FFAE00', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
        });

        // 지도에 선을 표시합니
        polyline.setMap(map);
    };

    useEffect(() => {
        mapMaker();
    }, [currentLocation, routes]);

    useEffect(() => {}, []);
    useEffect(() => {
        drawLine();
    }, [routes]);

    return (
        <div id='map-layer'>
            <h3>현재 위치</h3>
            <div id='map'></div>
            <button onClick={routeHandler}>여기로 가보기</button>

            <>
                {distance > 0 ? (
                    <h3>
                        {point}까지 {distance}M 입니다
                    </h3>
                ) : (
                    <h3>거리를 측정합니다</h3>
                )}
            </>
        </div>
    );
}

export default Map;
