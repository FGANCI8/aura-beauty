import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const testimonials = db.prepare('SELECT * FROM testimonials').all();
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { client_name, text, rating } = body;

        const stmt = db.prepare('INSERT INTO testimonials (client_name, text, rating) VALUES (?, ?, ?)');
        const info = stmt.run(client_name, text, rating);

        return NextResponse.json({ id: info.lastInsertRowid, ...body });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
