import { useState } from "react";
import { getDaysInMonth } from "../utils/daysInMonth";

export const useCalendarMutation = () => {
    const currentDate = new Date();
    const [activeMonth, setActiveMonth] = useState<number>(currentDate.getMonth());
    const [activeYear, setActiveYear] = useState<number>(currentDate.getFullYear());

    const daysInMonth = getDaysInMonth(activeYear, activeMonth) as number[];

    const handleNextMonth = () => {
        if (activeMonth === 11) {
            setActiveMonth(0); // Reset month to January
            setActiveYear(activeYear + 1); // Increase the year
        } else {
            setActiveMonth(activeMonth + 1);
        }
    };

    const handlePrevMonth = () => {
        if (activeMonth === 0) {
            setActiveMonth(11); // Reset month to December
            setActiveYear(activeYear - 1); // Decrease the year
        } else {
            setActiveMonth(activeMonth - 1);
        }
    };

    return { activeMonth, activeYear, daysInMonth: daysInMonth || [], handleNextMonth, handlePrevMonth }
}