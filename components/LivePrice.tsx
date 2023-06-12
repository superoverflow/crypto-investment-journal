"use client"

import React, { useContext, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"


import { DataContext, WSContext, type WSData } from "./LivePriceProvider"

function Price({ code, lastData }: { code: string; lastData: WSData }) {
  const [lastPrice, setLastPrice] = useState<string>()
  useEffect(() => {
    if (lastData?.s === code) {
      setLastPrice(lastData.c)
    }
  }, [lastData, code])
  return lastPrice ? (
    <div>
      ${" "}
      {parseFloat(lastPrice).toLocaleString(undefined, {
        minimumFractionDigits: 4,
      })}
    </div>
  ) : (
    <Skeleton className="h-[20px] w-[100px] rounded-full" />
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
