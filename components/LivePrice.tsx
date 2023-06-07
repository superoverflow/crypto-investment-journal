"use client"

import React, { useContext, useEffect, useState } from "react"

import { DataContext, WSContext } from "./LivePriceProvider"
import type { WSData } from "./LivePriceProvider"

function Price({ code, lastData }: { code: string, lastData: WSData }){
  const [lastPrice, setLastPrice] = useState("0.0")
  if (lastData?.s === code) {
    setLastPrice(lastData?.c)
  }
  return <div>{lastPrice}</div>
}

function PriceWrapper({ code }: { code: string }) {
  const lastData = useContext(DataContext)
  // eslint-disable-next-line react/display-name
  const PriceMemo = React.memo(() => <Price code={code} lastData={lastData} />)
  return <PriceMemo />
}

function PriceSubscriber({ code }: { code: string }) {
  // eslint-disable-next-line react/display-name
  const PriceWrapperMemo = React.memo(() => <PriceWrapper code={code} />)
  const { isReady, subscriptionFn } = useContext(WSContext)
  useEffect(() => {
    if (isReady && subscriptionFn) {
      subscriptionFn(code)
    }
  }, [code, isReady, subscriptionFn])

  return <PriceWrapperMemo />
}

export default PriceSubscriber
