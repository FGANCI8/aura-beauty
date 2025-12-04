import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import db from '@/lib/db';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { bookingId } = body;

        if (!bookingId) {
            return NextResponse.json({ error: 'ID do agendamento obrigatório' }, { status: 400 });
        }

        // Fetch booking details
        const booking = db.prepare(`
      SELECT a.*, s.name as service_name, s.price 
      FROM appointments a
      JOIN services s ON a.service_id = s.id
      WHERE a.id = ?
    `).get(bookingId);

        if (!booking) {
            return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 });
        }

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: booking.service_id.toString(),
                        title: booking.service_name,
                        quantity: 1,
                        unit_price: booking.price,
                    },
                ],
                payer: {
                    name: booking.client_name,
                    email: booking.email || 'cliente@email.com', // Fallback if email is missing
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/success`,
                    failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/failure`,
                    pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/pending`,
                },
                auto_return: 'approved',
                external_reference: booking.id.toString(),
                notification_url: process.env.WEBHOOK_URL,
            },
        });

        // Update booking with preference ID
        const updateStmt = db.prepare('UPDATE appointments SET payment_preference_id = ?, status = ? WHERE id = ?');
        updateStmt.run(result.id, 'pending', bookingId);

        return NextResponse.json({
            init_point: result.init_point,
            sandbox_init_point: result.sandbox_init_point,
            preference_id: result.id
        });

    } catch (error) {
        console.error('Erro ao criar preferência:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
