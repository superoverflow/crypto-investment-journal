import dynamic from "next/dynamic"
import { DashboardCard } from "@/components/DashboardCard"
import CryptoDashboardCard from '@/components/CryptoDashboardCard'

// const CryptoDashboardCard = dynamic(
//   () => import('@/components/CryptoDashboardCard'),
//   { ssr: false }
// )

const dashboardItems = [
  {
    instrument: "BTC",
    code: "BTCUSDT",
    image: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bitcoin.png",
    position: 1000,
    change: -300
  },
  {
    instrument: "ETH",
    code: "ETHUSDT",
    image: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/ethereum.png",
    position: 980,
    change: -200
  },
]

export default function IndexPage() {
  console.log("refreshed Page")
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-wrap justify-center gap-2">
        {dashboardItems.map((item) => (
          <CryptoDashboardCard
            key={item.instrument}
            instrument={item.instrument}
            code={item.code}
            image={item.image}
            position={item.position}
            change={item.change}
          />
        ))}
      </div>
    </section>
  )
}
