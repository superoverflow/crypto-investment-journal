import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json([
        {
            product: 'BTC',
            position: 1000,
            pnl: -100,
        },
        {
            product: 'XAU',
            position: 3000,
            pnl: 100,
        }
    ]);
}