import { DashboardCard } from "@/components/DashboardCard"

const dashboardItems = [
  {
    instrument: "BTC",
    image: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/bitcoin.png",
    position: "£ 1,000",
    change: -300
  },
  {
    instrument: "ETH",
    image: "https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/32/ethereum.png",
    position: "£ 980",
    change: -200
  },
  {
    instrument: "XAU",
    image: "https://assets.xm-cdn.com/static/research-portal/instruments_icons/gold.svg",
    position: "£ 3,080",
    change: 20
  },
  {
    instrument: "XAG",
    image: "https://assets.xm-cdn.com/static/research-portal/instruments_icons/silver.svg",
    position: "£ 2,050",
    change: -520
  },
]

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-wrap gap-4">
        {dashboardItems.map((item) => (
          <DashboardCard
            instrument={item.instrument}
            image={item.image}
            position={item.position}
            change={item.change}
          />
        ))}
      </div>
    </section>
  )
}
