"use client"

import { useState, useEffect } from "react"
import useWebSocket from "react-use-websocket"

const socketUrl = "wss://stream.binance.com:9443/ws"

function Price() {
  const [close, setClose] = useState("0.00")

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      console.log({ event })
      const json = JSON.parse(event.data)
      setClose(json.c)
    },
  })

  useEffect(() => {
    sendJsonMessage({
      method: "SUBSCRIBE",
      params: ["btcusdt@miniTicker"],
      id: 1,
    })
  }, [sendJsonMessage])

  return (
    <div className="grow text-end font-semibold transition-colors">
      $ {parseFloat(close).toLocaleString()}
    </div>
  )
}

export default Price