import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import Weather from './components/Weather';

function App() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation([lat, lng]);
        setLoading(false);
        console.log(currentLocation);
    };
    const geoError = () => {
        alert('위치를 가져올 수 없습니다.');
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
    }, [loading]);

    return (
        <div className='App'>
            <Map currentLocation={currentLocation} />
            <Weather currentLocation={currentLocation} />
        </div>
    );
}

export default App;
