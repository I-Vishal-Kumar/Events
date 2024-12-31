import { ReactNode, createContext, useEffect, useState } from "react";
import { useCalendarMutation } from "./useCalendarMutation";
import { CalendarContextType, Event } from "@/types";

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
    const [activeDate, setActiveDate] = useState<number | null>(null);
    const [events, setEvents] = useState<{} | Record<string, Record<number, Event[]>>>({});

    const {
        activeMonth, activeYear, daysInMonth,
        handleNextMonth, handlePrevMonth } = useCalendarMutation();

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('calendarEvents') || "{}");
        setEvents(events);
    }, []);

    return (
        <CalendarContext.Provider value={{ setEvents, daysInMonth, events, activeDate, setActiveDate, activeMonth, activeYear, handleNextMonth, handlePrevMonth }}>
            {children}
        </CalendarContext.Provider>
    )


}

export default CalendarContext;