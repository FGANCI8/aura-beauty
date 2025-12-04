import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        // Get all unique clients from appointments with their statistics
        const clients = db.prepare(`
      SELECT 
        client_name,
        whatsapp,
        email,
        COUNT(*) as total_bookings,
        MAX(date || ' ' || time) as last_visit,
        SUM(CASE WHEN status = 'concluido' THEN 1 ELSE 0 END) as completed_bookings
      FROM appointments
      GROUP BY client_name, whatsapp
      ORDER BY MAX(datetime(date || ' ' || time)) DESC
    `).all();

        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
