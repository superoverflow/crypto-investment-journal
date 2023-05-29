import Image from "next/image"
import { ArrowDown, ArrowUp } from "lucide-react"

import Chart from '@/components/CryptoPriceChartWrapper'
import Price from '@/components/CryptoLivePrice'

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card> & {
  instrument: string
  image: string
  position: string
  change: number
}



export default function CryptoDashboardCard({
  instrument,
  image,
  position,
  change,
  className,
  ...props
}: CardProps) {

  console.log("refreshed Card")
  return (
    <Card
      className={cn("w-[340px]", className)}
      {...props}
    >
      <CardHeader className="flex items-center gap-4">
        <Image src={image} alt={instrument} width={32} height={32} />
        <CardTitle>{instrument}</CardTitle>
        <Price />
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2">
        {/* @ts-expect-error Server Component */}
        <Chart width={300} height={100} />
        <div className="flex place-content-between">
          <span className="text-xl font-bold">{position}</span>
          <div
            className={`${
              change >= 0 ? "text-green-500" : "text-red-500"
            } flex flex-row items-center gap-2 px-2`}
          >
            {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            <span className="inline-block align-bottom text-sm">{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
