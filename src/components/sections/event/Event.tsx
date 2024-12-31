import { FaEdit, FaTrash } from "react-icons/fa";
import CalendarContext from "@/hooks/useCalandarContext"
import React, { useContext } from "react"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EventForm } from "../calendar/EventForm";
import { CalendarContextType, Event } from "@/types";


export default function Events() {

    const { activeDate, events, setEvents, activeMonth, activeYear } = useContext(CalendarContext) as CalendarContextType;

    if (!activeDate) return null;

    const month = `${ activeYear }-${ activeMonth }`;
    const currMonthEvents = events[month] || {};
    const currDateEvent = currMonthEvents[activeDate] || [];

    const sortedEvents = currDateEvent.sort((a: Event, b: Event) => {
        const startTimeComparison = a.st_time.localeCompare(b.st_time);
        if (startTimeComparison !== 0) {
            return startTimeComparison; // Sort by start time first
        }
        return a.end_time.localeCompare(b.end_time); // If start times are the same, sort by end time
    });

    return (
        <aside className='flex-[1] overflow-y-auto  h-full p-2 w-full' >
            {
                sortedEvents.map((event: Event, i: number) => (
                    <EventCard setEvents={setEvents} activeDate={activeDate} activeMonth={activeMonth} activeYear={activeYear} eventDetails={event} key={i} />
                ))
            }
        </aside>
    )
}

function EventCard({ activeDate, setEvents, activeMonth, activeYear, eventDetails }: {
    activeDate: number;
    activeMonth: number;
    activeYear: number;
    setEvents: React.Dispatch<Record<string, Record<number, Event[]>> | {}>;
    eventDetails: Event
}) {

    const handleDeleteEvent = () => {

        const procede = window.confirm("You are about to delete a event.");
        if (!procede) return;
        const eventsData = JSON.parse(localStorage.getItem("events") || "{}");

        // since we are sorting events localy so have to check each thing;
        const updatedEvents = eventsData[activeYear][activeMonth][activeDate].filter(
            (event: Event) =>
                event.st_time !== eventDetails.st_time ||
                event.end_time !== eventDetails.end_time ||
                event.title !== eventDetails.title ||
                event.description !== eventDetails.description
        );

        eventsData[activeYear][activeMonth][activeDate] = updatedEvents;

        if (updatedEvents.length === 0) {
            delete eventsData[activeYear][activeMonth][activeDate];
        }

        if (Object.keys(eventsData[activeYear][activeMonth]).length === 0) {
            delete eventsData[activeYear][activeMonth];
        }

        if (Object.keys(eventsData[activeYear]).length === 0) {
            delete eventsData[activeYear];
        }
        setEvents(eventsData);
        localStorage.setItem("events", JSON.stringify(eventsData));
        alert("Event deleted successfully!");
    }

    return (
        <div className="text-gray-800 p-4 grid gap-y-2 my-2 rounded-md bg-slate-200 shadow-md hover:shadow-lg transition-shadow">
            <div>
                <h5 className="text-xs font-semibold">Event Title</h5>
                <h4 className="text-sm mt-1 pl-2">{eventDetails?.title}</h4>
            </div>
            {eventDetails?.description ? (
                <div>
                    <h5 className="text-xs font-semibold">Event Description</h5>
                    <h4 className="text-sm mt-1 pl-2">{eventDetails?.description}</h4>
                </div>
            ) : null}
            <div className="flex gap-x-3 mt-2">
                <h5 className="text-sm">{formatTime(eventDetails.st_time)}</h5>
                <h5 className="text-sm">{formatTime(eventDetails.end_time)}</h5>
            </div>
            <div className="flex justify-end gap-2 ">
                <Dialog>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-1 bg-blue-200 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            <FaEdit />
                            Edit
                        </button>
                    </DialogTrigger>
                    <EventForm eventDetails={eventDetails} date={activeDate} />
                </Dialog>

                <button
                    onClick={handleDeleteEvent}
                    type="button"
                    className="flex items-center gap-1 bg-red-200 text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                >
                    <FaTrash />
                    Delete
                </button>
            </div>
        </div>
    );
}

function formatTime(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    return `${ formattedHours.toString().padStart(2, "0") }:${ minutes.toString().padStart(2, "0") } ${ period }`;
}