import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const stmt = db.prepare('SELECT * FROM services ORDER BY category, name');
        const services = stmt.all();
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, price, duration, category, description } = body;

        if (!name || !price || !duration) {
            return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
        }

        const stmt = db.prepare(
            'INSERT INTO services (name, price, duration, category, description, is_active) VALUES (?, ?, ?, ?, ?, 1)'
        );
        const info = stmt.run(name, price, duration, category, description);

        return NextResponse.json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
