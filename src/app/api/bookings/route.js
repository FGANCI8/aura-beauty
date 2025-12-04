import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stmt = db.prepare(`
      SELECT 
        a.id, 
        a.client_name, 
        a.whatsapp, 
        a.date, 
        a.time, 
        a.status, 
        s.name as service_name, 
        s.price 
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      ORDER BY a.date DESC, a.time DESC
    `);
        const bookings = stmt.all();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
