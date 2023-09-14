import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

export const StateContext = React.createContext();

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
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
        console.log(currentLocation);
    }, [loading]);

    return (
        <StateContext.Provider value={currentLocation}>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Main />} />
                </Routes>
            </div>
        </StateContext.Provider>
    );
}

export default App;
