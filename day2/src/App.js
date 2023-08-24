import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import './Calendar.css'

function App() {
  const [mood, setMood] = useState({});
  const [date, setDates] = useState('');

  const setMoodForDate = (date, moodColor) => {
    setMood((prevMoodData) => ({
      ...prevMoodData,
      [date.toISOString().split('T')[0]]: moodColor,
    }));
  };

  const handleClick = (event) => {
    const moodColor = event.target.id;
    if (date){
      setMoodForDate(date,moodColor);
    }
    
  };

  function tileClassName({date, view}){
        if (view === "month") { 
          const moodColor = mood[date.toISOString().split('T')[0]];
          if (moodColor) {
              return moodColor;
          }
        }   
       
  };

  return (
    <div className="calendar">
      <div className="title"> <h1> MOOD CALENDAR</h1></div>
      <div className="container">
        <div className='moods' id='angry' onClick={handleClick}></div>
        <div className='moods' id='annoyed' onClick={handleClick} ></div>
        <div className='moods' id='sad' onClick={handleClick}></div>
        <div className='moods' id='nervous' onClick={handleClick}></div>
        <div className='moods' id='calm' onClick={handleClick}></div>
        <div className='moods' id='happy' onClick={handleClick}></div>
      </div>
      <div className="container1">
        <div className='mood-text'>Angry </div>
        <div className='mood-text'>Annoyed </div>
        <div className='mood-text'>Sad </div>
        <div className='mood-text'>Nervous </div>
        <div className='mood-text'>Calm </div>
        <div className='mood-text'>Happy </div>
      </div>
      <div className="container2">
        <p>* Instructions: Pick a date then pick a color *</p>
      </div>
      <Calendar 
        defaultView='month'
        onClickDay={setDates}
        tileClassName={tileClassName}
        />

      
    </div>
  );
}

export default App;
//




