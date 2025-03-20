"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface DemandPredictionTableProps {
  predictionRun?: boolean
  route?: string
  busType?: string
}

export function DemandPredictionTable({
  predictionRun = false,
  route = "all",
  busType = "all",
}: DemandPredictionTableProps) {
  // Sample data for demand prediction
  const baseData = [
    {
      date: "Apr 1, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 150,
      predictedDemand: 165,
      change: 10,
      confidence: "High",
    },
    {
      date: "Apr 2, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 145,
      predictedDemand: 170,
      change: 17.2,
      confidence: "High",
    },
    {
      date: "Apr 3, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 155,
      predictedDemand: 180,
      change: 16.1,
      confidence: "Medium",
    },
    {
      date: "Apr 1, 2024",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 120,
      predictedDemand: 115,
      change: -4.2,
      confidence: "High",
    },
    {
      date: "Apr 2, 2024",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 125,
      predictedDemand: 120,
      change: -4,
      confidence: "High",
    },
    {
      date: "Apr 3, 2024",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 80,
      predictedDemand: 95,
      change: 18.8,
      confidence: "Medium",
    },
    {
      date: "Apr 4, 2024",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 85,
      predictedDemand: 100,
      change: 17.6,
      confidence: "Medium",
    },
  ]

  // Updated data after prediction run
  const updatedData = [
    {
      date: "Apr 1, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 150,
      predictedDemand: 185,
      change: 23.3,
      confidence: "High",
    },
    {
      date: "Apr 2, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 145,
      predictedDemand: 190,
      change: 31.0,
      confidence: "High",
    },
    {
      date: "Apr 3, 2024",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 155,
      predictedDemand: 200,
      change: 29.0,
      confidence: "High",
    },
    {
      date: "Apr 1, 2024",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 120,
      predictedDemand: 110,
      change: -8.3,
      confidence: "High",
    },
    {
      date: "Apr 2, 2024",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 125,
      predictedDemand: 115,
      change: -8.0,
      confidence: "High",
    },
    {
      date: "Apr 3, 2024",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 80,
      predictedDemand: 105,
      change: 31.3,
      confidence: "High",
    },
    {
      date: "Apr 4, 2024",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 85,
      predictedDemand: 110,
      change: 29.4,
      confidence: "High",
    },
  ]

  // Choose which data to display based on prediction run
  let demandData = predictionRun ? updatedData : baseData

  // Filter data based on route and bus type
  if (route !== "all") {
    demandData = demandData.filter((item) => item.route.toLowerCase() === route.replace("-", " ").toLowerCase())
  }

  if (busType !== "all") {
    const busTypeMap: Record<string, string> = {
      ac: "AC Bus",
      "non-ac": "Non-AC Bus",
      sleeper: "Sleeper",
    }

    demandData = demandData.filter((item) => item.busType === busTypeMap[busType])
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Bus Type</TableHead>
            <TableHead className="text-right">Current</TableHead>
            <TableHead className="text-right">Predicted</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead>Confidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demandData.length > 0 ? (
            demandData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.date}</TableCell>
                <TableCell>{row.route}</TableCell>
                <TableCell>{row.busType}</TableCell>
                <TableCell className="text-right">{row.currentDemand}</TableCell>
                <TableCell className="text-right">{row.predictedDemand}</TableCell>
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
                <TableCell>
                  <Badge variant={row.confidence === "High" ? "default" : "secondary"}>{row.confidence}</Badge>
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

