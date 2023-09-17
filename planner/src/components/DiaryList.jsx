import React, { useState, useReducer, useEffect } from 'react';
import { formatDate } from './util';

// reducer 함수 정의
const diaryReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                [action.date]: [...(state[action.date] || []), action.text],
            };
        case 'LOAD':
            return action.data;
        case 'DELETE':
            const { date, index } = action;
            const updatedEntries = state[date].filter(
                (_, idx) => idx !== index
            );
            return {
                ...state,
                [date]: updatedEntries,
            };
        default:
            return state;
    }
};

function DiaryList({ date }) {
    const [diary, dispatch] = useReducer(diaryReducer, {});
    const [newText, setNewText] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('diaryData');
        if (storedData) {
            const localData = JSON.parse(storedData);
            if (localData.length === 0) {
                setIsDataLoaded(true);
                return;
            }
            dispatch({ type: 'LOAD', data: localData });
            setIsDataLoaded(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('diaryData', JSON.stringify(diary));
    }, [diary]);

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

    if (!isDataLoaded) {
        return <div>로딩 중입니다.</div>;
    } else {
        return (
            <div>
                <div>
                    <h2>{formatDate(date)}</h2>
                    <form onSubmit={handleDiarySubmit}>
                        <textarea
                            rows='4'
                            cols='50'
                            placeholder='나의 하루는?'
                            value={newText}
                            onChange={handleDiaryChange}
                        />
                        <br />
                        <button type='submit'>저장</button>
                    </form>
                </div>
                <div>
                    <h2>나의 하루</h2>
                    <ul>
                        {diary[formatDate(date)] &&
                            diary[formatDate(date)].map((e, idx) => (
                                <li key={idx}>
                                    {e}
                                    <button onClick={() => handleDelete(idx)}>
                                        삭제
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default DiaryList;
