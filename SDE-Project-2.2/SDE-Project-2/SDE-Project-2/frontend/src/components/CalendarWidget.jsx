// src/components/CalendarWidget.jsx
import React, { useState, useMemo } from "react";
import "/src/styles/calendarWidget.css";

function CalendarDay({ day, active, onClick }) {
    return (
        <div
            className={`calendar-day ${active ? "active" : ""}`}
            onClick={onClick}
        >
            {day}
        </div>
    );
}

const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function CalendarWidget() {
    const today = new Date();
    const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
    const currentYear = today.getFullYear();

    // Store selected days per month: { [monthIndex]: [day1, day2, ...] }
    const [selectedDaysByMonth, setSelectedDaysByMonth] = useState({});

    // Compute number of days for the current month
    const daysInMonth = useMemo(() => {
        // JS trick: day 0 of next month = last day of current month
        return new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    }, [currentMonthIndex, currentYear]);

    const days = useMemo(
        () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
        [daysInMonth]
    );

    const selectedDaysForMonth = selectedDaysByMonth[currentMonthIndex] || [];

    const toggleDay = (day) => {
        setSelectedDaysByMonth((prev) => {
            const monthKey = currentMonthIndex;
            const prevDays = prev[monthKey] || [];
            let newDays;

            if (prevDays.includes(day)) {
                // clicked again → unselect
                newDays = prevDays.filter((d) => d !== day);
            } else {
                // first click → select
                newDays = [...prevDays, day];
            }

            return {
                ...prev,
                [monthKey]: newDays,
            };
        });
    };

    const goPrevMonth = () => {
        setCurrentMonthIndex((prev) => (prev + 11) % 12); // wrap around 0–11
    };

    const goNextMonth = () => {
        setCurrentMonthIndex((prev) => (prev + 1) % 12);
    };

    return (
        <div className="panel calendar">
            <div className="title">
                Reading Habits{" "}
                <span style={{ fontSize: 12, color: "#999" }}>
          {/* Month navigation with arrows, month label stays here */}
                    <button
                        type="button"
                        onClick={goPrevMonth}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            padding: 0,
                            marginRight: 4,
                            color: "#999",
                        }}
                    >
            ‹
          </button>
                    {MONTH_NAMES[currentMonthIndex]} ▾
          <button
              type="button"
              onClick={goNextMonth}
              style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: 4,
                  color: "#999",
              }}
          >
            ›
          </button>
        </span>
            </div>

            {/* Helper message */}
            <p className="calendar-helper-text">
                Click on the days on which you've read to keep track of your reading habits :)
            </p>

            <div className="calendar-grid">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                        key={"h" + i}
                        style={{ color: "#aaa", textAlign: "center", fontSize: 12 }}
                    >
                        {d}
                    </div>
                ))}

                {days.map((d) => (
                    <CalendarDay
                        key={d}
                        day={d}
                        active={selectedDaysForMonth.includes(d)}
                        onClick={() => toggleDay(d)}
                    />
                ))}
            </div>
        </div>
    );
}
