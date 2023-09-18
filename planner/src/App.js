import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Diary from './pages/Diary';

export const StateContext = React.createContext();

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
    };

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
            value={{ currentLocation, date, setDate, handleDateChange }}
        >
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/diary' element={<Diary />} />
                </Routes>
            </div>
        </StateContext.Provider>
    );
}

export default App;
