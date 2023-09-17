import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryList from './DiaryList';
import { formatDate } from './util';

function CalendarDiary() {
    const [date, setDate] = useState(new Date());
    // const [diary, setDiary] = useState({});
    // const [newText, setNewText] = useState('');

    const handleDateChange = (date) => {
        setDate(date);
    };

    // const handleDiaryChange = (e) => {
    //     setNewText(e.target.value);
    // };
    // const handleDiarySubmit = (e) => {
    //     e.preventDefault();
    //     const formattedDate = formatDate(date);
    //     const updatedDiary = {
    //         ...diary,
    //         [formattedDate]: [...(diary[formattedDate] || []), newText],
    //     };
    //     setDiary(updatedDiary);
    //     setNewText('');
    // };

    return (
        <div>
            <h1>다이어리 달력</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                formatDay={(locale, date) =>
                    date.toLocaleString('en', { day: 'numeric' })
                }
            />
            <DiaryList date={date} />
            {/* <div>
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
                            <li key={idx}>{e}</li>
                        ))}
                </ul>
            </div> */}
        </div>
    );
}
export default CalendarDiary;
