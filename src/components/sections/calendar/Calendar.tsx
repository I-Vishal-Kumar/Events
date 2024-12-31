import { useContext } from "react"
import CalendarContext from "@/hooks/useCalandarContext";
import { RenderDateWithPopover } from "./RenderDateWithPopover";
import { CalendarContextType } from "@/types";

export default function Calendar() {

    const {
        activeMonth, activeYear, daysInMonth, handleNextMonth,
        handlePrevMonth, setActiveDate, events
    } = useContext(CalendarContext) as CalendarContextType;


    const month = `${ activeYear }-${ activeMonth }`;
    const currMonthEvents = events[month] || {};

    const getDensity = (date: number) => {
        const totalEvents = currMonthEvents[date] || [];
        if (totalEvents.length <= 2) return 'low';
        else if (totalEvents.length > 2 && totalEvents.length <= 5) return 'medium';
        else return 'high';
    }

    return (
        <section className='flex-[1] relative p-3 sm:flex-[2] h-full w-full flex flex-col justify-center' >
            <div className="flex justify-between mb-4 max-w-[600px] text-black">
                <button type="button" onClick={handlePrevMonth} className="px-4 py-2 bg-gray-300 rounded">Back</button>
                <h3>{new Date(activeYear, activeMonth).toLocaleString('default', { month: 'short', year: 'numeric' })}</h3>
                <button type="button" onClick={handleNextMonth} className="px-4 py-2 bg-gray-300 rounded">Next</button>
            </div>
            <div className="grid sm:h-[500px] max-h-[500px] sm:w-[600px] grid-cols-7 grid-row-5 border-2 border-gray-200 divide-x-2 divide-y-2 divide-solid w-full h-full">
                <Days />
                {
                    daysInMonth.map((date: number, i: number) => (
                        <RenderDateWithPopover
                            key={i}
                            setActiveDate={setActiveDate}
                            eventDensity={getDensity(date)}
                            hasEvent={!!(currMonthEvents[date]?.length)}
                            date={date} />
                    ))
                }
            </div>
        </section>
    )
}




function Days() {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
        <>
            {
                daysOfWeek.map(day => (
                    <div key={day} className="grid place-content-center">
                        <h5 className="text-gray-700">{day}</h5>
                    </div>
                ))
            }
        </>
    )
}


// {
//     month : {
//         date : [events],
//         date : [events],
//         date : [events],
//     }
// }

// events = {
//     st_time: "",
//     end_time: "",
//     title: "",
//     description: "" //optional
// }