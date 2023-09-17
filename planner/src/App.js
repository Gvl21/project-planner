import React, { useEffect, useReducer, useRef, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Diary from './pages/Diary';

function reducer(state, action) {
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }

        case 'CREATE': {
            const newState = [action.data, ...state];
            localStorage.setItem('diaryList', JSON.stringify(newState));
            return newState;
        }
        case 'UPDATE': {
            const newState = state.map((e) =>
                String(e.id) === String(action.data.id) ? { ...action.data } : e
            );
            localStorage.setItem('diaryList', JSON.stringify(newState));
            return newState;
        }
        case 'DELETE': {
            const newState = state.filter(
                (e) => String(e.id) !== String(action.id)
            );
            localStorage.setItem('diaryList', JSON.stringify(newState));
            return newState;
        }

        default:
            return state;
    }
}

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, []);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const idRef = useRef(1);

    const geoOk = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation([lat, lng]);
        setLoading(false);
    };
    const geoError = () => {
        alert('위치를 가져올 수 없습니다.');
    };

    const onCreate = (date, content) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current,
                date: new Date(date).getTime(),
                content,
            },
        });
        idRef.current += 1;
    };
    // 수정 함수
    const onUpdate = (id, date, content) => {
        dispatch({
            type: 'UPDATE',
            data: { id, date: new Date(date).getTime(), content },
        });
    };
    const onDelete = (id) => {
        dispatch({ type: 'DELETE', id });
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoOk, geoError);
    }, [loading]);

    return (
        <StateContext.Provider value={currentLocation}>
            <DispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
                <div className='App'>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/diary' element={<Diary />} />
                    </Routes>
                </div>
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export default App;
