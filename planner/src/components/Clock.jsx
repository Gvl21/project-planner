import React, { useEffect, useState } from 'react';
import './Clock.css';

function Clock() {
    const [day, setDay] = useState(new Date());

    const SetDate = () => {
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, 0);
        const date = String(day.getDate()).padStart(2, 0);
        return `${year} - ${month} - ${date}`;
    };
    const SetSec = () => {
        const hour = String(day.getHours()).padStart(2, 0);
        const minute = String(day.getMinutes()).padStart(2, 0);
        const sec = String(day.getSeconds()).padStart(2, 0);
        return `${hour} : ${minute} : ${sec}`;
    };

    useEffect(() => {
        setInterval(() => setDay(new Date()), 1000);
    }, []);

    return (
        <div id='clock'>
            <div id='date-section'>
                <SetDate />
            </div>
            <div id='clock-section'>
                <SetSec />
            </div>
        </div>
    );
}

export default Clock;
