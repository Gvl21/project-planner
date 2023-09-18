import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import './CalenderDiary.css';
import DiaryList from './DiaryList';
import { StateContext } from '../App';
import styled from 'styled-components';

function CalendarDiary() {
    const { date, handleDateChange } = useContext(StateContext);

    return (
        <div id='calendar-parts'>
            <h1>내 다이어리</h1>
            <Calendar
                onChange={handleDateChange}
                value={date}
                formatDay={(locale, date) =>
                    date.toLocaleString('en', { day: 'numeric' })
                }
            />
            <div>
                <DiaryList />
            </div>
        </div>
    );
}
export default CalendarDiary;
