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
  {
    instrument: "ADA",
    code: "ADAUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/cardano.png",
    position: 3.01,
    averagePrice: 1.4,
  },
  {
    instrument: "BNB",
    code: "BNBUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/binance-coin.png",
    position: 0.03,
    averagePrice: 315.2,
  },
  {
    instrument: "SOL",
    code: "SOLUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/solana.png",
    position: 0.03,
    averagePrice: 315.2,
  },
  {
    instrument: "AVAX",
    code: "AVAXUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/avalanche.png",
    position: 0.03,
    averagePrice: 315.2,
  },
  {
    instrument: "GALA",
    code: "GALAUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/gala.png",
    position: 0.03,
    averagePrice: 0.87,
  },
  {
    instrument: "ICP",
    code: "ICPUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/internet-computer.png",
    position: 0.03,
    averagePrice: 0.87,
  },
  {
    instrument: "XRP",
    code: "XRPUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/xrp.png",
    position: 0.03,
    averagePrice: 0.87,
  },
  {
    instrument: "XLM",
    code: "XLMUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/stellar.png",
    position: 0.03,
    averagePrice: 0.87,
  },
  {
    instrument: "EOS",
    code: "EOSUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/eos.png",
    position: 0.03,
    averagePrice: 0.87,
  },
  {
    instrument: "ATOM",
    code: "ATOMUSDT",
    image:
      "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/cosmos.png",
    position: 0.03,
    averagePrice: 0.87,
  },
]

export default function IndexPage() {
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
