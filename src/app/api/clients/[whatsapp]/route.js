import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request, { params }) {
    try {
        const { whatsapp } = await params;

        // Get client booking history
        const bookings = db.prepare(`
      SELECT 
        a.id,
        a.date,
        a.time,
        a.status,
        a.notes,
        s.name as service_name,
        s.price
      FROM appointments a
      LEFT JOIN services s ON a.service_id = s.id
      WHERE a.whatsapp = ?
      ORDER BY datetime(a.date || ' ' || a.time) DESC
    `).all(whatsapp);

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching client history:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
