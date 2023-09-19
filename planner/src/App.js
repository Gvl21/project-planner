import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Diary from './pages/Diary';
import { formatDate } from './util';
import styled from 'styled-components';

import img1 from './images/bg_1.jpg';
import img2 from './images/bg_2.jpg';
import img3 from './images/bg_3.jpg';
import img4 from './images/bg_4.jpg';

const backgroundArr = [img1, img2, img3, img4];
const randomIndex = Math.floor(Math.random() * backgroundArr.length);
const backgroundImg = backgroundArr[randomIndex];

export const StateContext = React.createContext();
export const DiaryContext = React.createContext();
// 다이어리 관련 리듀서 ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return action.data;
        case 'ADD':
            const newState = {
                ...state,
                [action.date]: [...(state[action.date] || []), action.text],
            };
            localStorage.setItem('diaryData', JSON.stringify(newState));
            return newState;

        case 'DELETE': {
            const { date, index } = action;
            const updatedDiary = state[date].filter((_, idx) => idx !== index);
            const newState = { ...state, [date]: updatedDiary };
            localStorage.setItem('diaryData', JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
};
const Container = styled.div`
    background-image: url(${backgroundImg});
    position: absolute;
    margin: 0px;
    top: 8%;
    left: 0;
    width: 100vw;
    height: 84vh;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    opacity: 0.7;
`;
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
    };
    // 다이어리 관련 파트 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const [diary, dispatch] = useReducer(reducer, {});
    const [newText, setNewText] = useState('');

    const handleDiaryChange = (e) => {
        setNewText(e.target.value);
    };

    const handleDiarySubmit = (e) => {
        e.preventDefault();
        const formattedDate = formatDate(date);

        dispatch({ type: 'ADD', date: formattedDate, text: newText });

        setNewText('');
    };
    const handleDelete = (index) => {
        const formattedDate = formatDate(date);

        dispatch({ type: 'DELETE', date: formattedDate, index });
    };

    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation([lat, lng]);
        setLoading(false);
    };
    const geoError = () => {
        alert('위치를 가져올 수 없습니다.');
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
    }, [loading]);

    return (
        <StateContext.Provider
            value={{
                currentLocation,
                date,
                setDate,
                formatDate,
                handleDateChange,
            }}
        >
            <DiaryContext.Provider
                value={{
                    diary,
                    dispatch,
                    newText,
                    setNewText,
                    handleDiaryChange,
                    handleDiarySubmit,
                    handleDelete,
                }}
            >
                <div className='App'>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/diary' element={<Diary />} />
                    </Routes>
                </div>
                <Container></Container>
            </DiaryContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
