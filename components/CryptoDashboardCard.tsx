import Image from "next/image"
import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Price from "@/components/CryptoLivePrice"
import Chart from "@/components/CryptoPriceChartWrapper"

type CardProps = React.ComponentProps<typeof Card> & {
  instrument: string
  code: string
  image: string
  position: number
  change: number
}

export default function CryptoDashboardCard({
  instrument,
  code,
  image,
  position,
  change,
  className,
  ...props
}: CardProps) {
  console.log("refreshed Card")
  return (
    <Card className={cn("w-[300px]", className)} {...props}>
      <CardHeader className="flex items-center gap-4">
        <Image src={image} alt={instrument} width={32} height={32} />
        <CardTitle>{instrument}</CardTitle>
        <Price code={code} />
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2">
        {/* @ts-expect-error Server Component */}
        <Chart width={260} height={100} code={code} />
        <div className="flex place-content-between">
          <span className="text-xl font-bold">{position}</span>
          <div
            className={cn(
              change >= 0 ? "text-green-500" : "text-red-500",
              "flex flex-row items-center gap-2 px-2"
            )}
          >
            {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="inline-block align-bottom text-sm">{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
