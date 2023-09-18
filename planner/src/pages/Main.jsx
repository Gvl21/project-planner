import React from 'react';
import Clock from '../components/Clock';
import Map from '../components/Map';
import Weather from '../components/Weather';
import MiniDiary from '../components/MiniDiary';
import '../components/MiniDiary.css';

function Main() {
    return (
        <div>
            <Clock />
            <Weather />
            <div id='main-layer'>
                <Map />
                <MiniDiary />
            </div>
        </div>
    );
}

export default Main;
