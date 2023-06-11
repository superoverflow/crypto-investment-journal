"use client"

import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from "react"

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

type tickers = string[]

type WS = {
  setTickers: Dispatch<SetStateAction<tickers>> | null
}

const SOCKET_URL = "wss://stream.binance.com:9443/ws"

export const DataContext = createContext<WSData>(null)
export const WSContext = createContext<WS>({setTickers: null})

function LivePriceProvider({ children }: { children: React.ReactNode }) {
  console.log("re-render Context Provider")
  const ws = useRef<WebSocket | null>(null)
  const messageSeq = useRef<number>(0)
  const requestedTickers = useRef<tickers>([])
  
  const [isReady, setIsReady] = useState(false)
  const [tickers, setTickers] = useState<tickers>([])
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
    return () => socket.close()
  }, [])

  useEffect(() => {
    const subscribeTickers = setTimeout(() => {
      const sendFn = ws.current?.send.bind(ws.current)
      const newTickers = tickers.filter(
        (t) => !requestedTickers.current.includes(t)
      )
      const params = newTickers.map((t) => `${t.toLowerCase()}@miniTicker`)
      const data = {
        method: "SUBSCRIBE",
        params: params,
        id: messageSeq.current,
      }
      const jsonData = JSON.stringify(data)
      if (sendFn && isReady) {
        sendFn(jsonData)
        messageSeq.current += 1
        requestedTickers.current = tickers
        console.log({ jsonData })
      }
    }, 1000)

    return () => clearTimeout(subscribeTickers)
  }, [tickers, isReady])

  return (
    <WSContext.Provider value={{setTickers}}>
      <DataContext.Provider value={lastData}>
        {children}
      </DataContext.Provider>
    </WSContext.Provider>
  )
}

export default LivePriceProvider
