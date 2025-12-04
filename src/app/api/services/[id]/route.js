import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, price, duration, category, description, is_active } = body;

        const stmt = db.prepare(`
      UPDATE services 
      SET name = ?, price = ?, duration = ?, category = ?, description = ?, is_active = ?
      WHERE id = ?
    `);

        const info = stmt.run(name, price, duration, category, description, is_active, id);

        if (info.changes === 0) {
            return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        // Soft delete (just set is_active to 0) or hard delete?
        // Let's do hard delete for now, but check for dependencies if needed.
        // Actually, safer to just set is_active = 0 if there are appointments.
        // For simplicity in this task, let's do a hard delete but we might want to change to soft delete later.
        // Given the requirements "Deactivate/Remove", let's implement DELETE as hard delete, and PUT can handle deactivation.

        const stmt = db.prepare('DELETE FROM services WHERE id = ?');
        const info = stmt.run(id);

        if (info.changes === 0) {
            return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
