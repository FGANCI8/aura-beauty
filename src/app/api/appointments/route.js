import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const appointments = db.prepare(`
      SELECT a.*, s.name as service_name 
      FROM appointments a 
      LEFT JOIN services s ON a.service_id = s.id
      ORDER BY a.date DESC, a.time DESC
    `).all();
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { client_name, whatsapp, email, service_id, date, time, notes } = body;

        const stmt = db.prepare(`
      INSERT INTO appointments (client_name, whatsapp, email, service_id, date, time, notes) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
        const info = stmt.run(client_name, whatsapp, email, service_id, date, time, notes);

        // Log the action
        const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
        logStmt.run('NOVO_AGENDAMENTO', `Cliente: ${client_name}, Serviço ID: ${service_id}`);

        return NextResponse.json({ id: info.lastInsertRowid, ...body });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
