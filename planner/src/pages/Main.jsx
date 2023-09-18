import React from 'react';
import Clock from '../components/Clock';
import Map from '../components/Map';
import Weather from '../components/Weather';
import MiniDiary from '../components/MiniDiary';
import '../components/MiniDiary.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
            <button
                id='navi-main'
                className='btnMini btnOrange'
                onClick={goDiary}
            >
                {' '}
                다이어리
                <br /> 페이지{'>>'}{' '}
            </button>
        </div>
    );
}

export default Main;
