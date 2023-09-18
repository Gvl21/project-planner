import React from 'react';
import CalendarDiary from '../components/CalendarDiary';
import { useNavigate } from 'react-router-dom';

function Diary() {
    const navigate = useNavigate();
    const goMain = () => {
        navigate('/');
    };

    return (
        <div>
            <CalendarDiary />
            <button
                id='navi-diary'
                className='btnMini btnOrange'
                onClick={goMain}
            >
                메인
                <br />
                페이지{'>>'}{' '}
            </button>
        </div>
    );
}

export default Diary;
