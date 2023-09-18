import React, { useContext, useEffect, useState } from 'react';
import { DiaryContext, StateContext } from '../App';
import { formatDate } from '../util';
import './MiniDiary.css';

function MiniDiary() {
    const {
        diary,
        newText,
        setNewText,
        handleDelete,
        dispatch,
        handleDiarySubmit,
    } = useContext(DiaryContext);
    const { date } = useContext(StateContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const handleDiaryChange = (e) => {
        setNewText(e.target.value);
    };
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleDiarySubmit(e);
        }
    };

    const MiniList = () => {
        return (
            <div id='diary-part'>
                <h2>나의 하루</h2>
                <ul>
                    {diary[formatDate(date)] &&
                        diary[formatDate(date)].slice(0, 7).map((e, idx) => (
                            <li key={idx}>
                                {e}
                                <button
                                    className='btnMini btnLightBlue'
                                    onClick={() => handleDelete(idx)}
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

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
            <div id='mini-diary'>
                <form id='submit-part'>
                    <h2>오늘의 메모</h2>
                    <input
                        placeholder='오늘의 메모'
                        value={newText}
                        onChange={handleDiaryChange}
                        onKeyDown={handleEnter}
                    />
                    <button
                        className='btnMini btnPurple'
                        type='submit'
                        onClick={handleDiarySubmit}
                    >
                        저장
                    </button>
                </form>
                <MiniList />
                {/* <div id='diary-part'>
                    <h2>나의 하루</h2>
                    <ul>
                        {diary[formatDate(date)] &&
                            diary[formatDate(date)].map((e, idx) => (
                                <li key={idx}>
                                    {e}
                                    <button
                                        className='btnMini btnLightBlue'
                                        onClick={() => handleDelete(idx)}
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div> */}
            </div>
        );
    }
}

export default MiniDiary;
