import { NextResponse } from 'next/server';

export async function GET(symbol) {
    const code = symbol.toUpperCase()
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${code}&interval=1d&limit=100`)
    const json = await response.json()
    
    return NextResponse.json({"data" : json});
}