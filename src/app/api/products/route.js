import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const products = db.prepare('SELECT * FROM products').all();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, brand, price, stock } = body;

        const stmt = db.prepare('INSERT INTO products (name, brand, price, stock) VALUES (?, ?, ?, ?)');
        const info = stmt.run(name, brand, price, stock);

        return NextResponse.json({ id: info.lastInsertRowid, ...body });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
