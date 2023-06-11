"use client"

import React, { useContext, useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"

import { DataContext } from "./LivePriceProvider"

function PnLWrapper({
  position,
  averageCost,
  code,
}: {
  position: number
  averageCost: number
  code: string
}) {
  const lastData = useContext(DataContext)
  const [lastPrice, setLastPrice] = useState(0.0)
  useEffect(() => {
    if (lastData?.s === code) {
      setLastPrice(parseFloat(lastData.c))
    }
  }, [lastData, code])
  const marketValue = position * lastPrice
  const change = position * (lastPrice - averageCost)

  return (
    <div className="flex place-content-between">
      <span className="text-xl font-bold">{marketValue.toFixed(2)}</span>
      <div
        className={cn(
          change >= 0 ? "text-green-500" : "text-red-500",
          "flex flex-row items-center gap-2 px-2"
        )}
      >
        {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        <span className="inline-block align-bottom text-sm">
          {change.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default PnLWrapper
