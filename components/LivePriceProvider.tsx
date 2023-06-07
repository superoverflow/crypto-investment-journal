"use client"

import React, { createContext, useEffect, useRef, useState } from "react"

export type WSData = {
  E: number // timestamp     : 1686168483039
  c: string // closing price : "26475.52000000"
  e: string // event         : "24hrMiniTicker"
  h: string // high          : "27391.77000000"
  l: string // low           : "26236.00000000"
  o: string // open          : "27059.46000000"
  q: string // quote         : "1731743361.98734440"
  s: string // symbol        : "BTCUSDT"
  v: string // volume        : "64709.23177000"
} | null

type SubscribedTickers = string[]

type WS = {
  isReady: boolean
  subscriptionFn: (jsonMessage: any) => void
  subscribedTickers: SubscribedTickers
}

const SOCKET_URL = "wss://stream.binance.com:9443/ws"

export const DataContext = createContext<WSData>(null)
export const WSContext = createContext<WS>({
  isReady: false,
  subscriptionFn: () => {},
  subscribedTickers: []
})

function LivePriceProvider({ children }: { children: React.ReactNode }) {
  const ws = useRef<WebSocket | null>(null)
  const messageSeq = useRef(0)
  const [isReady, setIsReady] = useState(false)
  const [subscribedTickers, setSubscribedTickers] = useState<SubscribedTickers>([])
  const [lastData, setLastData] = useState<WSData | null>(null)

  useEffect(() => {
    const socket = new WebSocket(SOCKET_URL)
    ws.current = socket

    socket.onopen = () => setIsReady(true)
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data?.e === "24hrMiniTicker") {
        setLastData(data)
        console.log({ data })
      }
    }
    return () => {
      socket.close()
    }
  }, [])

  const subscriptionFn = (tickerCode: string) => {
    const sendFn = ws.current?.send.bind(ws.current)
    const data = {
      method: "SUBSCRIBE",
      params: [`${tickerCode.toLowerCase()}@miniTicker`],
      id: messageSeq.current,
    }
    const jsonData = JSON.stringify(data)
    if (sendFn && !subscribedTickers.includes(tickerCode)) {
      sendFn(jsonData)
      messageSeq.current += 1
      setSubscribedTickers((prev) => [...prev, tickerCode])
      console.log({ jsonData })
    }
  }

  return (
    <WSContext.Provider
      value={{
        isReady,
        subscriptionFn,
        subscribedTickers
      }}
    >
      <DataContext.Provider value={lastData}>{children}</DataContext.Provider>
    </WSContext.Provider>
  )
}

export default LivePriceProvider
