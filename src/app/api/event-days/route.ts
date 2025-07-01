import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time part

    const events = await prisma.event.findMany({
        where: {
            endTime: { gte: today }, // exclude fully past events
        },
        select: { startTime: true, endTime: true },
    });

    const days = new Set<string>();

    for (const event of events) {
        const start = new Date(event.startTime);
        const end = new Date(event.endTime);

        // Cap the range to only valid days
        const current = new Date(start);
        current.setHours(0, 0, 0, 0);

        const validEnd = new Date(end);
        validEnd.setHours(0, 0, 0, 0);

        while (current <= validEnd) {
            //   const dateStr = current.toISOString().split("T")[0];
            const dateStr = current.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
            days.add(dateStr);
            current.setDate(current.getDate() + 1);
        }
    }

    return NextResponse.json(
        Array.from(days).map(date => ({ date }))
    );
}
