"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Bus, CreditCard, MapPin, Users } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface OverviewMetricsProps {
  dateRange?: DateRange
}

export function OverviewMetrics({ dateRange }: OverviewMetricsProps) {
  // Adjust metrics based on date range
  let passengerCount = 45231
  let passengerChange = 12.5
  let activeRoutes = 132
  let routeChange = 4.3
  let operationalBuses = 1024
  let busChange = -2.1
  let revenue = 32.5
  let revenueChange = 8.2

  // If date range is in April, show different metrics
  if (dateRange?.from && dateRange.to) {
    const fromMonth = dateRange.from.getMonth()
    const toMonth = dateRange.to.getMonth()

    if (fromMonth === 3 || toMonth === 3) {
      // April is month 3 (0-indexed)
      passengerCount = 48750
      passengerChange = 15.8
      activeRoutes = 138
      routeChange = 6.2
      operationalBuses = 1050
      busChange = 1.5
      revenue = 35.8
      revenueChange = 10.5
    } else if (fromMonth === 4 || toMonth === 4) {
      // May is month 4
      passengerCount = 52300
      passengerChange = 18.2
      activeRoutes = 142
      routeChange = 7.5
      operationalBuses = 1080
      busChange = 3.2
      revenue = 38.2
      revenueChange = 12.8
    } else if (fromMonth === 1 || toMonth === 1) {
      // February is month 1
      passengerCount = 42100
      passengerChange = 8.5
      activeRoutes = 128
      routeChange = 2.1
      operationalBuses = 1010
      busChange = -3.5
      revenue = 30.1
      revenueChange = 5.2
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{passengerCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 inline-flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />+{passengerChange}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRoutes}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 inline-flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />+{routeChange}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Operational Buses</CardTitle>
          <Bus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{operationalBuses.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <span className={`${busChange >= 0 ? "text-emerald-500" : "text-rose-500"} inline-flex items-center`}>
              {busChange >= 0 ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {busChange >= 0 ? "+" : ""}
              {busChange}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{revenue}M</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 inline-flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />+{revenueChange}%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

