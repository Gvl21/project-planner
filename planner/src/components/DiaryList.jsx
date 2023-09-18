import React, { useState, useReducer, useEffect, useContext } from 'react';
import { formatDate } from '../util';
import { DiaryContext, StateContext } from '../App';
import './DiaryList.css';

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'INIT':
//             return action.data;
//         case 'ADD':
//             const newState = {
//                 ...state,
//                 [action.date]: [...(state[action.date] || []), action.text],
//             };
//             localStorage.setItem('diaryData', JSON.stringify(newState));
//             return newState;

//         case 'DELETE': {
//             const { date, index } = action;
//             const updatedDiary = state[date].filter((_, idx) => idx !== index);
//             const newState = { ...state, [date]: updatedDiary };

//             return newState;
//         }
//         default:
//             return state;
//     }
// };

function DiaryList() {
    // const [diary, dispatch] = useReducer(reducer, {});
    // const [newText, setNewText] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const { date } = useContext(StateContext);
    const {
        diary,
        dispatch,
        newText,
        handleDelete,
        handleDiaryChange,
        handleDiarySubmit,
    } = useContext(DiaryContext);

    // useEffect(() => {
    //     localStorage.setItem('diaryData', JSON.stringify(diary));
    // }, [diary]);
    useEffect(() => {
        const storedData = localStorage.getItem('diaryData');
        if (!storedData) {
            setIsDataLoaded(true);
            return;
        }

        const localData = JSON.parse(storedData);
        if (localData.length === 0) {
            setIsDataLoaded(true);
            return;
        }
        dispatch({ type: 'INIT', data: localData });
        setIsDataLoaded(true);
    }, []);

    // const handleDiaryChange = (e) => {
    //     setNewText(e.target.value);
    // };

    // const handleDiarySubmit = (e) => {
    //     e.preventDefault();
    //     const formattedDate = formatDate(date);

    //     dispatch({ type: 'ADD', date: formattedDate, text: newText });

    //     setNewText('');
    // };

    // const handleDelete = (index) => {
    //     const formattedDate = formatDate(date);

    //     dispatch({ type: 'DELETE', date: formattedDate, index });
    // };

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
                            cols='40'
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
                    <ul id='diary-layer'>
                        {diary[formatDate(date)] &&
                            diary[formatDate(date)].map((e, idx) => (
                                <li id='diary-plate' key={idx}>
                                    {e}
                                    <button
                                        className='btnOrange btnMini'
                                        onClick={() => handleDelete(idx)}
                                    >
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
