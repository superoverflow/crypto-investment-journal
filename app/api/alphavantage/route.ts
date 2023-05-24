import { NextResponse } from 'next/server';


export async function GET() {
    const apiKey = process.env.ADVANTAGE_API_KEY
    const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`)
    const json = await response.json()
    return NextResponse.json(json);
}