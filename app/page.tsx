import CryptoDashboardCard from "@/components/CryptoDashboardCard"
import LivePnL from "@/components/LivePnL"
import LivePrice from "@/components/LivePrice"
import LivePriceProvider from "@/components/LivePriceProvider"

const dashboardItems = [
  {
    instrument: "BTC",
    code: "BTCUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bitcoin.png",
    position: 0.03,
    averagePrice: 30000,
  },
  {
    instrument: "ETH",
    code: "ETHUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/ethereum.png",
    position: 0.5,
    averagePrice: 2000,
  },
]

export default function IndexPage() {
  console.log("refreshed Page")
  return (
    <LivePriceProvider>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex flex-wrap justify-center gap-2">
          {dashboardItems.map((item) => (
            <CryptoDashboardCard
              key={item.instrument}
              instrument={item.instrument}
              code={item.code}
              livePrice={<LivePrice code={item.code} />}
              livePnL={
                <LivePnL
                  code={item.code}
                  position={item.position}
                  averageCost={item.averagePrice}
                />
              }
              image={item.image}
            />
          ))}
        </div>
      </section>
    </LivePriceProvider>
  )
}
