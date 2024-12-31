import { DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CalendarContext from "@/hooks/useCalandarContext";
import { useContext } from "react";
import { CalendarContextType, Event } from "@/types";
import { useEventForm } from "@/hooks/useEventForm";

export function EventForm({ eventDetails, date }: { eventDetails?: Event, date: number }) {
    const { activeMonth, activeYear, setEvents } = useContext(CalendarContext) as CalendarContextType;
    const {
        description, endTime, handleDescriptionChange, handleEndTimeChange,
        handleStartTimeChange, handleSubmit, handleTitleChange, startTime, title
    } = useEventForm(eventDetails, activeYear, activeMonth, date, setEvents);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription>{eventDetails ? "Editing event" : "Create a new event."}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 text-gray-800 py-4 w-full border-2">
                <div className=" w-[80%] my-0 mx-auto items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Event name
                    </Label>
                    <Input value={title} onChange={handleTitleChange} id="username" className="w-full mt-1" />
                </div>
                <div className=" w-[80%] my-0 mx-auto">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <textarea
                        onChange={handleDescriptionChange}
                        value={description}
                        className="w-full bg-transparent mt-1 ring-1 ring-gray-200 text-sm rounded-md p-2"
                        rows={3} id="description" aria-label="description" placeholder="(Optional) Enter a description" />
                </div>

                {/* End Time */}
                <div className="w-full flex justify-between px-4 items-center">
                    {/* Start Time */}
                    <div className="flex flex-col gap-y-1">
                        <Label htmlFor="start-time" className="text-left">
                            Start Time
                        </Label>
                        <input
                            aria-label="start-time"
                            className="bg-green-300 py-1 text-gray-800 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                            type="time"
                            id="start-time"
                            value={startTime}
                            onChange={handleStartTimeChange}
                        />
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-y-1">
                        <Label htmlFor="end-time" className="text-right">
                            End Time
                        </Label>
                        <input
                            aria-label="end-time"
                            className="bg-red-300 py-1 text-gray-800 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                            type="time"
                            id="end-time"
                            value={endTime}
                            onChange={handleEndTimeChange}
                            min={startTime} // Enforces end time is after start time
                        />
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit} type="submit">Save</Button>
            </DialogFooter>
        </DialogContent>
    )
}