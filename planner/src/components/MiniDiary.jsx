import React, { useContext, useEffect, useState } from 'react';
import { DiaryContext, StateContext } from '../App';
import { formatDate } from '../util';
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
                <div>
                    <p>오늘의 메모</p>
                    <input
                        placeholder='오늘의 메모'
                        value={newText}
                        onChange={handleDiaryChange}
                    />
                    <button type='submit' onClick={handleDiarySubmit}>
                        저장
                    </button>
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

export default MiniDiary;
