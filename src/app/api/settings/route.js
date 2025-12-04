import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const settings = db.prepare('SELECT * FROM settings').all();
        // Convert array of {key, value} to object
        const settingsObj = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        // Don't expose password in GET
        delete settingsObj.admin_password;

        return NextResponse.json(settingsObj);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

        // Handle both single setting and bulk updates
        if (body.key && body.value !== undefined) {
            // Single setting update
            stmt.run(body.key, body.value);
        } else {
            // Bulk update
            Object.entries(body).forEach(([key, value]) => {
                stmt.run(key, String(value));
            });
        }

        // Log the action
        const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
        logStmt.run('UPDATE_SETTINGS', 'Configurações atualizadas');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
