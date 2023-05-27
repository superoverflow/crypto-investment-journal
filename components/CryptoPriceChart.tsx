"use client"

import { Line, LineChart } from "recharts"

function Chart({
  width,
  height,
  chartData,
}: {
  width: number
  height: number
  chartData: { close: number }[]
}) {
  console.log("refreshed Chart")
  return (
    <LineChart width={width} height={height} data={chartData}>
      <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
    </LineChart>
  )
}

export default Chart
