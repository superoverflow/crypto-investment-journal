"use client"

import React, { useContext, useEffect, useState } from "react"
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

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
  const [lastPrice, setLastPrice] = useState<number>()
  useEffect(() => {
    if (lastData?.s === code) {
      setLastPrice(parseFloat(lastData.c))
    }
  }, [lastData, code])

  if (!lastPrice) return <Skeleton className="h-[20px] w-[260px] rounded-full" />

  const marketValue = position * lastPrice
  const change = position * (lastPrice - averageCost)

  return (
    <div className="flex place-content-between">
      <div className="flex items-center justify-center gap-1">
        <span className="align-middle text-xs text-slate-500">MV</span>
        <DollarSign size={14} />
        <span className="align-middle text-sm font-bold">
          {marketValue.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <span className="align-middle text-xs text-slate-500">P/L</span>
        <div
          className={cn(
            change >= 0 ? "text-green-500" : "text-red-500",
            "flex flex-row items-center gap-2 px-2"
          )}
        >
          {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="inline-block align-bottom text-sm">
            {change.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PnLWrapper
