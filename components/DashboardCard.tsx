import Image from "next/image"
import { ArrowUp, ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card> & {
  instrument: string
  image: string
  position: string
  change: number
}

export function DashboardCard({
  instrument,
  image,
  position,
  change,
  className,
  ...props
}: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader className="place-content-between">
        <CardTitle>{instrument}</CardTitle>
        <Image
          src={image}
          alt={instrument}
          width={32}
          height={32}
        />
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <p className="text-xl font-bold">{position}</p>
        <div className="flex flex-row gap-2 px-2">
            {change >=0 ? <ArrowUp size={16} /> : <ArrowDown size={16}/>}
            <p className="text-sm">{change}</p>
        </div>
      </CardContent>
    </Card>
  )
}
