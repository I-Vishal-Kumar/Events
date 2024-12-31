import { useEffect, useState } from "react"
import { Event } from "@/types";

export const useEventForm = (eventDetails: Event | undefined, activeYear: number, activeMonth: number, date: number, setEvents: React.Dispatch<Record<string, Record<number, Event[]>> | {}>) => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);

        // Ensure end time is after start time
        if (endTime && newStartTime >= endTime) {
            setEndTime("");
        }
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

    const handleSubmit = () => {

        if (!startTime || !endTime || !title) {
            alert("Please fill in the required fields: Title, Start Time, and End Time.");
            return;
        }

        let event = {
            st_time: startTime,
            end_time: endTime,
            title,
        } as Event;

        if (description) event['description'] = description;

        const month = `${ activeYear }-${ activeMonth }`;

        // get existing events from localStorage
        const storedEvents = JSON.parse(localStorage.getItem("calendarEvents") || "{}");

        // set month and date structure if not present
        if (!storedEvents[month]) {
            storedEvents[month] = {};
        }

        if (!storedEvents[month][date]) {
            storedEvents[month][date] = [];
        }


        let isEditing = !!eventDetails;
        const existingEvents = storedEvents[month][date];

        const isOverlapping = existingEvents.some((existingEvent: Event) => {
            if (
                isEditing &&
                existingEvent.st_time === eventDetails?.st_time &&
                existingEvent.end_time === eventDetails.end_time &&
                existingEvent.title === eventDetails.title
            ) {
                return false; // Skip the current event being edited
            }

            return !(existingEvent.st_time >= endTime && existingEvent.end_time <= startTime)
        })

        if (isOverlapping) {
            alert("This event is overlapping with other events choose different time slot");
            return;
        }

        if (isEditing) {
            storedEvents[month][date] = existingEvents.map((existingEvent: Event) => {
                if (existingEvent.st_time === eventDetails?.st_time
                    && existingEvent.end_time === eventDetails.end_time
                    && existingEvent.title === eventDetails.title
                ) {
                    existingEvent = event;
                }
                return existingEvent;
            })
        } else {
            // Add the new event
            storedEvents[month][date].push(event);
        }

        setEvents(storedEvents);
        // Save back to localStorage
        localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));

        setStartTime("");
        setEndTime("");
        setTitle("");
        setDescription("");
        alert("Event saved successfully!");
    };

    useEffect(() => {
        if (eventDetails && Object.values(eventDetails || {}).length) {
            setStartTime(eventDetails.st_time);
            setEndTime(eventDetails.end_time);
            setTitle(eventDetails.title);
            setDescription(eventDetails.description || "");
        }
    }, [eventDetails]);

    return {
        handleDescriptionChange, handleEndTimeChange,
        handleStartTimeChange, handleSubmit, handleTitleChange, startTime, endTime,
        title, description
    }
}