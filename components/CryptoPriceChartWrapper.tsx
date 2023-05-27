import dynamic from "next/dynamic"

// FIXME: https://github.com/recharts/recharts/issues/2850
const Chart = dynamic(() => import("@/components/CryptoPriceChart"), {
  ssr: false,
})

async function getData(symbol: string): Promise<number[][]> {
  const code = symbol.toUpperCase()
  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${code}&interval=1d&limit=100`
  )
  const json = await response.json()
  return json
}

async function ChartWrapper({
  width,
  height,
}: {
  width: number
  height: number
}) {
  console.log("refreshed Chart Wrapper")
  const data: number[][] = await getData("btcusdt")
  const chartData = data.map((elem) => ({close: elem[2]}))
  return <Chart width={width} height={height} chartData={chartData} />
}

export default ChartWrapper
