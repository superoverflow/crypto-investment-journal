"use client"

import { useEffect, useState } from "react"
import { Line, LineChart } from "recharts"

function Chart({ width, height }: { width: number; height: number }) {
  const [chartData, setChartData] = useState<{ close: number }[]>([])
  useEffect(() => {
    async function fetchData(code: string) {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${code}&interval=1d&limit=100`
      )
      console.log({ response })
      const json = await response.json()
      const closePrices = json.map((elem: any) => ({close: elem[2]}))
      setChartData(closePrices)
    }
    fetchData("BTCUSDT")
  }, [])

  return (
    <LineChart width={width} height={height} data={chartData}>
      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
    </LineChart>
  )
}

export default Chart
