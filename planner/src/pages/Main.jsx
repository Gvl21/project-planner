import React from 'react';
import Clock from '../components/Clock';
import Map from '../components/Map';
import Weather from '../components/Weather';
import MiniDiary from '../components/MiniDiary';

function Main() {
    return (
        <div>
            <Clock />
            <Weather />
            <Map />
            <MiniDiary />
        </div>
    );
}

export default Main;
