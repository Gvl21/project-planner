import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import './CalenderDiary.css';
import DiaryList from './DiaryList';
import { StateContext } from '../App';

function CalendarDiary() {
    const { date, handleDateChange } = useContext(StateContext);

    return (
        <div id='calendar-parts'>
            <div id='calendar-layer'>
                <h1>내 다이어리</h1>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    calendarType={'gregory'}
                    formatDay={(locale, date) =>
                        date.toLocaleString('en', { day: 'numeric' })
                    }
                />
            </div>
            <div>
                <DiaryList />
            </div>
        </div>
    );
}
export default CalendarDiary;
