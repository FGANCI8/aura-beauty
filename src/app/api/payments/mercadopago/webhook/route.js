import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import db from '@/lib/db';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export async function POST(request) {
    try {
        const url = new URL(request.url);
        const topic = url.searchParams.get('topic') || url.searchParams.get('type');
        const id = url.searchParams.get('id') || url.searchParams.get('data.id');

        if (topic === 'payment') {
            const payment = new Payment(client);
            const paymentData = await payment.get({ id });

            const bookingId = paymentData.external_reference;
            const status = paymentData.status;

            let newStatus = 'pending';
            if (status === 'approved') newStatus = 'paid';
            if (status === 'rejected' || status === 'cancelled') newStatus = 'cancelled';

            if (bookingId) {
                const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
                stmt.run(newStatus, bookingId);

                const logStmt = db.prepare('INSERT INTO logs (action, details) VALUES (?, ?)');
                logStmt.run('PAYMENT_WEBHOOK', `Booking ${bookingId} status updated to ${newStatus} via webhook`);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
