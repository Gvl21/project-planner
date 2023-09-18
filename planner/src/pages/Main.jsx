import React from 'react';
import Clock from '../components/Clock';
import Map from '../components/Map';
import Weather from '../components/Weather';
import MiniDiary from '../components/MiniDiary';
import '../components/MiniDiary.css';
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();
    const goDiary = () => {
        navigate('/diary');
    };
    return (
        <div>
            <Clock />
            <Weather />
            <div id='main-layer'>
                <Map />
                <MiniDiary />
            </div>
            {/* <button onClick={goDiary}/> */}
        </div>
    );
}

export default Main;
