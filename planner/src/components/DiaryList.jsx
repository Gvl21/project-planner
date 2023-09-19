import React, { useState, useEffect, useContext } from 'react';
import { formatDate } from '../util';
import { DiaryContext, StateContext } from '../App';
import './DiaryList.css';

function DiaryList() {
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

    if (!isDataLoaded) {
        return <div>로딩 중입니다.</div>;
    } else {
        return (
            <div>
                <div id='input-area'>
                    <h2>{formatDate(date).substring(4)}의 다이어리</h2>
                    <form onSubmit={handleDiarySubmit}>
                        <textarea
                            id='text-area'
                            rows='4'
                            cols='50'
                            placeholder='나의 하루는?'
                            value={newText}
                            onChange={handleDiaryChange}
                        />
                        <br />
                        <button className='btnMini btnBlueGreen' type='submit'>
                            저장
                        </button>
                    </form>
                </div>
                <div id='diary-area'>
                    <h2 id='diary-header'>나의 하루</h2>

                    <ul id='diary-layer'>
                        {diary[formatDate(date)] &&
                            diary[formatDate(date)].map((e, idx) => (
                                <li id='diary-plate' key={idx}>
                                    <div>{e}</div>
                                    <div>
                                        <button
                                            className='btnOrange btnMini'
                                            onClick={() => handleDelete(idx)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default DiaryList;
