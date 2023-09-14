import React from 'react';
import Clock from '../components/Clock';
import Map from '../components/Map';
import Weather from '../components/Weather';

function Main() {
    return (
        <div>
            <Clock />
            <Weather />
            <Map />
        </div>
    );
}

export default Main;
