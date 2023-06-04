"use client"

import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"

const socketUrl = "wss://stream.binance.com:9443/ws"


// TODO: need to move ws to manage centrally
function Price({ code }: {code: string}) {
  const ticketCode = `${code.toLocaleLowerCase()}@miniTicker`
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
      params: [ticketCode],
      id: 1,
    })
  }, [sendJsonMessage, ticketCode])

  return (
    <div className="grow text-end font-semibold transition-colors">
      ${" "}
      {parseFloat(close).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}
    </div>
  )
}

export default Price
