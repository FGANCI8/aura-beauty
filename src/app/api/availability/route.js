import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (!date) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        const appointments = db.prepare('SELECT time FROM appointments WHERE date = ?').all(date);
        const bookedTimes = appointments.map(a => a.time);

        return NextResponse.json({ bookedTimes });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
