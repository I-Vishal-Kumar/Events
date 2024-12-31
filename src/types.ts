
export type Event = {
    st_time: string;
    end_time: string;
    title: string;
    description?: string
}

export interface CalendarContextType {
    activeDate: number | null;
    activeMonth: number;
    activeYear: number;
    daysInMonth: number[];
    events: Record<string, Record<number, Event[]>>;
    handleNextMonth: () => void;
    handlePrevMonth: () => void;
    setActiveDate: React.Dispatch<number | null>
    setEvents: React.Dispatch<Record<string, Record<number, Event[]>> | {}>
}