import dynamic from "next/dynamic"

// FIXME: https://github.com/recharts/recharts/issues/2850
const Chart = dynamic(() => import("@/components/CryptoPriceChart"), {
  ssr: false,
})

async function ChartWrapper({
  width,
  height,
}: {
  width: number
  height: number
}) {
  console.log("refreshed Chart Wrapper")
  return <Chart width={width} height={height} code={"BTCUSDT"} />
}

export default ChartWrapper
