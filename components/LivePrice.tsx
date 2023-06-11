"use client"

import React, { useContext, useEffect, useState } from "react"

import { DataContext, WSContext, type WSData } from "./LivePriceProvider"

function Price({ code, lastData }: { code: string; lastData: WSData }) {
  const [lastPrice, setLastPrice] = useState("0.0")
  useEffect(() => {
    if (lastData?.s === code) {
      setLastPrice(lastData.c)
    }
  }, [lastData, code])
  return (
    <div>
      {parseFloat(lastPrice).toLocaleString(undefined, {
        minimumFractionDigits: 4,
      })}
    </div>
  )
}

function PriceWrapper({ code }: { code: string }) {
  const lastData = useContext(DataContext)
  return <Price code={code} lastData={lastData} />
}

function PriceSubscriber({ code }: { code: string }) {
  const { setTickers } = useContext(WSContext)
  useEffect(() => {
    setTickers && setTickers((prev) => [...prev, code])
  }, [code, setTickers])
  return <PriceWrapper code={code} />
}

export default PriceSubscriber
