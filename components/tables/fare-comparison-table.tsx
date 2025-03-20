"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface FareComparisonTableProps {
  calculationRun?: boolean
  route?: string
  busType?: string
}

export function FareComparisonTable({
  calculationRun = false,
  route = "ahmedabad-surat",
  busType = "ac",
}: FareComparisonTableProps) {
  // Base data for fare comparison
  const baseData = [
    {
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentFare: 300,
      suggestedFare: 320,
      change: 6.7,
      competitorFare: 310,
      recommendation: "Increase",
    },
    {
      route: "Ahmedabad-Surat",
      busType: "Non-AC Bus",
      currentFare: 150,
      suggestedFare: 160,
      change: 6.7,
      competitorFare: 155,
      recommendation: "Increase",
    },
    {
      route: "Ahmedabad-Baroda",
      busType: "AC Bus",
      currentFare: 200,
      suggestedFare: 190,
      change: -5,
      competitorFare: 185,
      recommendation: "Decrease",
    },
    {
      route: "Surat-Rajkot",
      busType: "AC Bus",
      currentFare: 400,
      suggestedFare: 380,
      change: -5,
      competitorFare: 370,
      recommendation: "Decrease",
    },
    {
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentFare: 500,
      suggestedFare: 530,
      change: 6,
      competitorFare: 520,
      recommendation: "Increase",
    },
  ]

  // Updated data after calculation run
  const updatedData = [
    {
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentFare: 300,
      suggestedFare: 340,
      change: 13.3,
      competitorFare: 310,
      recommendation: "Increase",
    },
    {
      route: "Ahmedabad-Surat",
      busType: "Non-AC Bus",
      currentFare: 150,
      suggestedFare: 170,
      change: 13.3,
      competitorFare: 155,
      recommendation: "Increase",
    },
    {
      route: "Ahmedabad-Baroda",
      busType: "AC Bus",
      currentFare: 200,
      suggestedFare: 180,
      change: -10,
      competitorFare: 185,
      recommendation: "Decrease",
    },
    {
      route: "Surat-Rajkot",
      busType: "AC Bus",
      currentFare: 400,
      suggestedFare: 360,
      change: -10,
      competitorFare: 370,
      recommendation: "Decrease",
    },
    {
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentFare: 500,
      suggestedFare: 550,
      change: 10,
      competitorFare: 520,
      recommendation: "Increase",
    },
  ]

  // Choose which data to display based on calculation run
  let fareData = calculationRun ? updatedData : baseData

  // Filter data based on route and bus type
  const routeFormatted = route
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-")

  const busTypeMap: Record<string, string> = {
    ac: "AC Bus",
    "non-ac": "Non-AC Bus",
    sleeper: "Sleeper",
  }

  fareData = fareData.filter((item) => {
    const routeMatch = route === "all" || item.route === routeFormatted
    const busTypeMatch = busType === "all" || item.busType === busTypeMap[busType]
    return routeMatch && busTypeMatch
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Bus Type</TableHead>
            <TableHead className="text-right">Current Fare (₹)</TableHead>
            <TableHead className="text-right">Suggested Fare (₹)</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Competitor Fare (₹)</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fareData.length > 0 ? (
            fareData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.route}</TableCell>
                <TableCell>{row.busType}</TableCell>
                <TableCell className="text-right">{row.currentFare}</TableCell>
                <TableCell className="text-right">{row.suggestedFare}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`flex items-center justify-end ${row.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {row.change >= 0 ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(row.change).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">{row.competitorFare}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      row.recommendation === "Increase"
                        ? "default"
                        : row.recommendation === "Decrease"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {row.recommendation}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No data available for the selected filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

