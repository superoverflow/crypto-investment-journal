import dynamic from "next/dynamic"

// FIXME: https://github.com/recharts/recharts/issues/2850
const Chart = dynamic(() => import("@/components/CryptoPriceChart"), {
  ssr: false,
})

async function ChartWrapper({
  code,
  width,
  height,
}: {
  code: string
  width: number
  height: number
}) {
  const ticker = code.toLocaleUpperCase()
  return <Chart width={width} height={height} code={ticker} />
}

export default ChartWrapper
