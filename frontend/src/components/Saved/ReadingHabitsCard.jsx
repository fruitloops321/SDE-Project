// src/components/ReadingHabitsCard.jsx
import React, { useMemo, useState, useEffect } from "react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function makeStorageKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `readingHabits-${year}-${month}`;
}

function getMonthMeta(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0–11

    const firstDayWeekIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDayWeekIndex, daysInMonth };
}

export default function ReadingHabitsCard() {
    const [currentDate] = useState(() => new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    // ----- load saved “read” days for this month from localStorage -----
    const [readDays, setReadDays] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(makeStorageKey(new Date()));
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    // persist whenever readDays changes
    useEffect(() => {
        try {
            localStorage.setItem(makeStorageKey(currentDate), JSON.stringify(readDays));
        } catch {
            // ignore storage errors
        }
    }, [readDays, currentDate]);

    const { firstDayWeekIndex, daysInMonth } = useMemo(
        () => getMonthMeta(currentDate),
        [currentDate]
    );

    const monthLabel = useMemo(
        () =>
            currentDate.toLocaleString(undefined, {
                month: "short",
            }),
        [currentDate]
    );

    const yearLabel = currentDate.getFullYear();

    const isDayRead = (day) => readDays.includes(day);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const handleMarkRead = () => {
        if (!selectedDay) return;

        setReadDays((prev) =>
            prev.includes(selectedDay)
                ? prev.filter((d) => d !== selectedDay) // toggle OFF
                : [...prev, selectedDay] // toggle ON
        );
    };

    const buttonLabel = (() => {
        if (!selectedDay) return "Select a day";
        return isDayRead(selectedDay) ? "Maybe Not" : "I read today";
    })();

    const buttonDisabled = !selectedDay;

    // build grid cells (empty + days)
    const cells = [];
    for (let i = 0; i < firstDayWeekIndex; i += 1) {
        cells.push({ key: `empty-${i}`, type: "empty" });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
        cells.push({ key: `day-${day}`, type: "day", day });
    }

    return (
        <div className="panel reading-habits-panel inner-card">
            <div className="reading-habits-card">
                {/* Header */}
                <div className="reading-habits-header">
                    <div className="reading-habits-title">Reading Habits</div>
                    <div className="reading-habits-month">
                        {monthLabel} {yearLabel} ▾
                    </div>
                </div>

                {/* Calendar grid */}
                <div className="reading-habits-grid">
                    {WEEKDAYS.map((w) => (
                        <div key={w} className="reading-habits-weekday">
                            {w}
                        </div>
                    ))}

                    {cells.map((cell) =>
                        cell.type === "empty" ? (
                            <div key={cell.key} className="reading-habits-day empty" />
                        ) : (
                            <button
                                key={cell.key}
                                type="button"
                                className={[
                                    "reading-habits-day",
                                    isDayRead(cell.day) ? "read" : "",
                                    selectedDay === cell.day ? "selected" : "",
                                ]
                                    .join(" ")
                                    .trim()}
                                onClick={() => handleDayClick(cell.day)}
                            >
                                {cell.day}
                            </button>
                        )
                    )}
                </div>

                {/* Footer: action button */}
                <div className="reading-habits-footer">
                    <button
                        type="button"
                        className="reading-habits-button"
                        onClick={handleMarkRead}
                        disabled={buttonDisabled}
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
