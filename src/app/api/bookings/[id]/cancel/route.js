import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { reason } = body;

        // Check if booking exists
        const booking = db.prepare('SELECT * FROM appointments WHERE id = ?').get(id);

        if (!booking) {
            return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
        }

        // Check if booking can be cancelled
        if (booking.status === 'cancelado') {
            return NextResponse.json({ error: 'Agendamento já está cancelado' }, { status: 400 });
        }

        if (booking.status === 'concluido') {
            return NextResponse.json({ error: 'Não é possível cancelar um agendamento concluído' }, { status: 400 });
        }

        // Update booking status
        const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
        const info = stmt.run('cancelado', id);

        if (info.changes === 0) {
            return NextResponse.json({ error: 'Erro ao cancelar agendamento' }, { status: 500 });
        }

        // Log the cancellation
        const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
        const logDetails = reason
            ? `Agendamento ${id} cancelado. Motivo: ${reason}`
            : `Agendamento ${id} cancelado`;
        logStmt.run('CANCEL_BOOKING', logDetails);

        return NextResponse.json({
            success: true,
            message: 'Agendamento cancelado com sucesso'
        });

    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
