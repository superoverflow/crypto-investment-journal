"use client"

import React, { useContext, useEffect, useState } from "react"

import { DataContext, WSContext } from "./LivePriceProvider"
import type { WSData } from "./LivePriceProvider"

function Price({ code, lastData }: { code: string, lastData: WSData }){
  const [lastPrice, setLastPrice] = useState("0.0")
  useEffect(() => {
    if(lastData?.s === code) {
      setLastPrice(lastData.c)
    }
  }, [lastData, code])
  return <div>{lastPrice}</div>
}

function PriceWrapper({ code }: { code: string }) {
  const lastData = useContext(DataContext)
  return <Price code={code} lastData={lastData} />
}

function PriceSubscriber({ code }: { code: string }) {
  const { isReady, subscriptionFn } = useContext(WSContext)
  useEffect(() => {
    if (isReady && subscriptionFn) {
      subscriptionFn(code)
    }
  }, [code, isReady, subscriptionFn])

  return <PriceWrapper code={code} />
}

export default PriceSubscriber
