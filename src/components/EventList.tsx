import prisma from '@/lib/prisma';
import React from 'react'

const lamaSky = "#C3EBFA";
const lamaPurple = "#CFCEFF";

export default async function EventList({ dateParam }: { dateParam: string | undefined }) {

    const selectedDate = dateParam ? new Date(dateParam + "T00:00:00") : new Date();

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);


    const data = await prisma.event.findMany({
        where: {
            AND: [
                { startTime: { lte: endOfDay } },   // Event started before or on this day
                { endTime: { gte: startOfDay } },   // Event ends on or after this day
            ]
        }
    });


    return data.map((event, index) => (
        <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4"
            style={{
                borderTopColor: index % 2 === 0 ? lamaSky : lamaPurple,
            }}
        >
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                {/* <span className="text-gray-400 text-xs">
                    {event.startTime.toLocaleTimeString("en-UK", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </span> */}
            </div>
            <p className="mt-2 text-gray-500 text-sm">
                From: {new Date(event.startTime).toLocaleString("en-CA", {
                    day: "2-digit", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                })}
                <br />
                To: {new Date(event.endTime).toLocaleString("en-CA", {
                    day: "2-digit", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                })}
            </p>

            <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
        </div>
    ));
}
