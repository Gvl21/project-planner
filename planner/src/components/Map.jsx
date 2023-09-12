import React, { useEffect, useState } from 'react';
import './Map.css';

const { kakao } = window;

function Map({ currentLocation }) {
    const [loading, setLoading] = useState(true);
    // const [posi, setPosi] = useState([0.0, 0.0]);
    const [targetLocation, setTargetLocation] = useState([0.0, 0.0]);
    const [checked, setChecked] = useState(false);

    const mapMaker = () => {
        if (!currentLocation) return;
        const curLat = currentLocation[0];
        const curLng = currentLocation[1];
        const container = document.getElementById('map'),
            options = {
                center: new kakao.maps.LatLng(curLat, curLng),
                level: 5,
            };
        console.log(options);
        const map = new kakao.maps.Map(container, options);
    };

    // 위치 정보를 받아온 후에 지도 생성하기-----------------

    // const getMarker = () => {
    //     let marker = new kakao.maps.Marker({
    //         // 지도 중심좌표에 마커를 생성합니다
    //         position: map.getCenter(),
    //     });
    //     let checking = () => {
    //         marker.setMap(map);
    //         setChecked(true);
    //     };

    //     // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
    //     kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
    //         // 클릭한 위도, 경도 정보를 가져옵니다
    //         const latlng = mouseEvent.latLng;
    //         if (!checked) {
    //             checking();
    //         }
    //         marker.setPosition(latlng);

    //         let tempLat = latlng.getLat();
    //         let tempLng = latlng.getLng();
    //         /////////// 왜 값이 갱신이 안될까 ///////////////
    //         setTargetLocation([tempLat, tempLng]);

    //         console.log(targetLocation);
    //         console.log(tempLat);
    //     });
    // };

    // 지도에 마커를 생성하고 표시한다
    // 지도를 클릭한 위치에 표출할 마커입니다

    /**
     *
     */

    useEffect(() => {
        mapMaker();
    }, [currentLocation]);
    /**
     * -----질문하기 ------------------
     * setPosi 이전에 렌더링 과정에서 console.log 를 실행해서 [0,0]이 나오는 건지
     * 즉 위의 await 전에 useEffect를 먼저 실행해서 그런건가?
     *
     */
    // console.log(posi);

    // if (!loading) {
    //     return <div id='loading'>로딩중입니다...</div>;
    // } else {
    return (
        <div>
            <div id='map'></div>
        </div>
    );
}

// }

export default Map;
