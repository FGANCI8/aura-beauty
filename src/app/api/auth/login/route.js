import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        const adminPassword = db.prepare("SELECT value FROM settings WHERE key = 'admin_password'").get();

        if (password === adminPassword.value) {
            // Set a simple session cookie
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            // Log login
            const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
            logStmt.run('LOGIN_ADMIN', 'Sucesso');

            return NextResponse.json({ success: true });
        } else {
            // Log failed attempt
            const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
            logStmt.run('LOGIN_FALHA', 'Senha incorreta');

            return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
