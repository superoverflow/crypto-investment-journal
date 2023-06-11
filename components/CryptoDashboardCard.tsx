import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "@/components/CryptoPriceChartWrapper"
import React from "react"

type CardProps = React.ComponentProps<typeof Card> & {
  instrument: string
  code: string
  image: string
  livePrice: React.ReactNode
  livePnL: React.ReactNode
}

export default function CryptoDashboardCard({
  instrument,
  code,
  image,
  livePrice,
  livePnL,
  className,
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-[300px]", className)} {...props}>
      <CardHeader className="flex items-center gap-4">
        <Image src={image} alt={instrument} width={32} height={32} />
        <CardTitle className="flex-auto">{instrument}</CardTitle>
        <div className="font-bold">{livePrice}</div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2">
        {/* @ts-expect-error Server Component */}
        <Chart width={260} height={100} code={code} />
        {livePnL}
      </CardContent>
    </Card>
  )
}
