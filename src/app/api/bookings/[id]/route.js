import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!['confirmado', 'cancelado', 'concluido'].includes(status)) {
            return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
        }

        const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
        const info = stmt.run(status, id);

        if (info.changes === 0) {
            return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
        }

        // Log the action
        const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
        logStmt.run('UPDATE_BOOKING', `Agendamento ${id} atualizado para ${status}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
