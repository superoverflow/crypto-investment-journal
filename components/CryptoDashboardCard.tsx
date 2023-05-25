"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, ArrowUp } from "lucide-react"
import useWebSocket from "react-use-websocket"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card> & {
  instrument: string
  image: string
  position: string
  change: number
}

const socketUrl = "wss://stream.binance.com:9443/ws"

function Price({ price }: { price: number }) {
  return <div>{price}</div>
}

export function CryptoDashboardCard({
  instrument,
  image,
  position,
  change,
  className,
  ...props
}: CardProps) {
  const [close, setClose] = useState(0)
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      const json = JSON.parse(event.data)
      setClose(json.c)
    },
  })
  useEffect(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: ["btcusdt@miniTicker"],
        id: 1,
      }),
    [sendJsonMessage]
  )

  return (
    <Card
      className={cn("w-[90%] min-w-[260px] sm:w-[380px]", className)}
      {...props}
    >
      <CardHeader className="place-content-between">
        <CardTitle>{instrument}</CardTitle>
        <Image src={image} alt={instrument} width={32} height={32} />
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <Price price={close} />
        <span className="text-xl font-bold">{position}</span>
        <div
          className={`${
            change >= 0 ? "text-green-500" : "text-red-500"
          } flex flex-row items-center gap-2 px-2`}
        >
          {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="inline-block align-bottom text-sm">{change}</span>
        </div>
      </CardContent>
    </Card>
  )
}
