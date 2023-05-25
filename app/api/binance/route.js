import { NextResponse } from 'next/server';
// import { Spot } from "@binance/connector"

export async function GET() {
    // const apiKey = process.env.BINANCE_API_KEY
    // const apiSecret =  process.env.BINANCE_API_SECRET
    // const client = new Spot(apiKey, apiSecret)
    
    // const response = await client.account()
    // const data = response.data
    return NextResponse.json({"data" : "TODO"});
}