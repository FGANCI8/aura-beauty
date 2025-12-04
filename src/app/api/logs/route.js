import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const logs = db.prepare('SELECT * FROM logs ORDER BY timestamp DESC LIMIT 100').all();
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
