import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DiaryList from './DiaryList';

function CalendarDiary() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
    };

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
        </div>
    );
}
export default CalendarDiary;
