import React from 'react';
import "/src/styles/calendarWidget.css";

function CalendarDay({ day, active }) {
  return <div className={`calendar-day ${active ? 'active' : ''}`}>{day}</div>;
}

export default function CalendarWidget() {
  // For demo, show days 1..30, active day 24 (like your Figma)
  const days = Array.from({length: 30}, (_, i) => i + 1);

  return (
    <div className="panel calendar">
      <div className="title">Reading Habits <span style={{fontSize:12, color:'#999'}}>Nov ▾</span></div>
      <div className="calendar-grid">
        {['S','M','T','W','T','F','S'].map((d, i) => <div key={'h'+i} style={{color:'#aaa', textAlign:'center', fontSize:12}}>{d}</div>)}
        {days.map((d) => (
          <CalendarDay key={d} day={d} active={d === 24} />
        ))}
      </div>
    </div>
  );
}
