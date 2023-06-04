"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Line, LineChart } from "recharts"

type ChartPrice = {
  close: number
}

async function fetchData(
  code: string,
  callback: Dispatch<SetStateAction<ChartPrice[]>>
) {
  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${code}&interval=1d&limit=100`
  )
  console.log({ response })
  const json = await response.json()
  const closePrices = json.map((elem: any) => ({ close: elem[2] }))
  callback(closePrices)
}

function Chart({
  width,
  height,
  code,
}: {
  width: number
  height: number
  code: string
}) {
  const [chartData, setChartData] = useState<ChartPrice[]>([])
  useEffect(() => {
    fetchData(code, setChartData)
  }, [code])

  return (
    <LineChart width={width} height={height} data={chartData}>
      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
    </LineChart>
  )
}

export default Chart
