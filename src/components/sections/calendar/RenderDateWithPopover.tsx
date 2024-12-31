import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import React from "react";
import { FaCircle, FaPlus, FaEye } from "react-icons/fa6";
import { EventForm } from "./EventForm";

export function RenderDateWithPopover({ setActiveDate, date, hasEvent, eventDensity }: { setActiveDate: React.Dispatch<number | null>, date: number, hasEvent: boolean; eventDensity: 'low' | 'medium' | 'high' }) {

    // prevent popover mounting if no date is available 
    if (!date) return <div className="relative hover:scale-100 grid grid-cols-1 grid-rows-1 p-1 hover:shadow-md text-gray-500 font-medium group"></div>

    const color = ({
        low: 'text-green-400',
        medium: 'text-orange-400',
        high: 'text-red-400',
    })[eventDensity];

    const helperText = ({
        low: 'less than 3 events',
        medium: 'More than 2 events',
        high: 'More Than 5 events',
    })[eventDensity];


    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative hover:scale-100 grid grid-cols-1 grid-rows-1 p-1 hover:shadow-md text-gray-500 font-medium group">
                    {date}
                    {hasEvent && (<RenderStatusWithToolTip color={color} helperText={helperText} />)}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit px-6 p-2">
                <div className="grid w-fit gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Event Details</h4>
                    </div>
                    <div className="grid gap-2 p-1">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="flex cursor-pointer hover:shadow-sm hover:scale-[1.02] w-full items-center gap-4">
                                    <h4 className="flex-[2]">Add new Event</h4>
                                    <FaPlus className="text-green-500" />
                                </div>
                            </DialogTrigger>
                            <EventForm date={date} />
                        </Dialog>
                        {
                            // show view event only if availabe
                            hasEvent && (
                                <div onClick={() => setActiveDate(date)} className="flex cursor-pointer hover:shadow-sm hover:scale-[1.02] w-full items-center gap-4">
                                    <h4 className="flex-[2]">View Event</h4>
                                    <FaEye className="text-blue-500" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

function RenderStatusWithToolTip({ color, helperText }: { color: string, helperText: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="absolute cursor-help top-1 right-1">
                        <FaCircle className={`text-[0.5rem] ${ color }`} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{helperText}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}