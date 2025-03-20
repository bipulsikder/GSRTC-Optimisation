"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RouteOptimizationTableProps {
  optimizationRun?: boolean
  route?: string
  optimizationGoal?: string
}

export function RouteOptimizationTable({
  optimizationRun = false,
  route = "ahmedabad-surat",
  optimizationGoal = "time",
}: RouteOptimizationTableProps) {
  // Base data for route optimization
  const baseData = [
    {
      route: "Ahmedabad-Surat",
      currentTime: 240,
      optimizedTime: 210,
      timeSaving: 30,
      recommendation: "Add 2 More Buses",
      impact: "High",
    },
    {
      route: "Ahmedabad-Baroda",
      currentTime: 120,
      optimizedTime: 110,
      timeSaving: 10,
      recommendation: "No Change",
      impact: "Low",
    },
    {
      route: "Surat-Rajkot",
      currentTime: 300,
      optimizedTime: 270,
      timeSaving: 30,
      recommendation: "Adjust Timing",
      impact: "Medium",
    },
    {
      route: "Rajkot-Jamnagar",
      currentTime: 90,
      optimizedTime: 80,
      timeSaving: 10,
      recommendation: "No Change",
      impact: "Low",
    },
    {
      route: "Baroda-Surat",
      currentTime: 150,
      optimizedTime: 130,
      timeSaving: 20,
      recommendation: "Add 1 More Bus",
      impact: "Medium",
    },
  ]

  // Updated data after optimization run
  const updatedData = [
    {
      route: "Ahmedabad-Surat",
      currentTime: 240,
      optimizedTime: 195,
      timeSaving: 45,
      recommendation: "Add 3 More Buses",
      impact: "High",
    },
    {
      route: "Ahmedabad-Baroda",
      currentTime: 120,
      optimizedTime: 105,
      timeSaving: 15,
      recommendation: "Add 1 More Bus",
      impact: "Medium",
    },
    {
      route: "Surat-Rajkot",
      currentTime: 300,
      optimizedTime: 255,
      timeSaving: 45,
      recommendation: "Adjust Route & Timing",
      impact: "High",
    },
    {
      route: "Rajkot-Jamnagar",
      currentTime: 90,
      optimizedTime: 75,
      timeSaving: 15,
      recommendation: "Adjust Timing",
      impact: "Medium",
    },
    {
      route: "Baroda-Surat",
      currentTime: 150,
      optimizedTime: 125,
      timeSaving: 25,
      recommendation: "Add 2 More Buses",
      impact: "Medium",
    },
  ]

  // Choose which data to display based on optimization run
  let optimizationData = optimizationRun ? updatedData : baseData

  // Adjust recommendations based on optimization goal
  if (optimizationRun && optimizationGoal) {
    optimizationData = optimizationData.map((item) => {
      let recommendation = item.recommendation
      let impact = item.impact

      if (optimizationGoal === "cost") {
        if (item.route === "Ahmedabad-Surat") {
          recommendation = "Optimize Bus Schedule"
          impact = "High"
        } else if (item.route === "Surat-Rajkot") {
          recommendation = "Reduce Off-Peak Buses"
          impact = "Medium"
        }
      } else if (optimizationGoal === "revenue") {
        if (item.route === "Ahmedabad-Surat") {
          recommendation = "Add 3 More Buses + Adjust Fare"
          impact = "High"
        } else if (item.route === "Surat-Rajkot") {
          recommendation = "Add Premium Service"
          impact = "High"
        }
      } else if (optimizationGoal === "passengers") {
        if (item.route === "Ahmedabad-Surat") {
          recommendation = "Add 4 More Buses"
          impact = "High"
        } else if (item.route === "Surat-Rajkot") {
          recommendation = "Reduce Fare by 5%"
          impact = "High"
        }
      }

      return {
        ...item,
        recommendation,
        impact,
      }
    })
  }

  // Filter data to show only the selected route if specified
  if (route !== "all") {
    const routeFormatted = route
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-")

    optimizationData = optimizationData.filter((item) => item.route === routeFormatted)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead className="text-right">Current Time (mins)</TableHead>
            <TableHead className="text-right">Optimized Time (mins)</TableHead>
            <TableHead className="text-right">Time Saving (mins)</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimizationData.length > 0 ? (
            optimizationData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.route}</TableCell>
                <TableCell className="text-right">{row.currentTime}</TableCell>
                <TableCell className="text-right">{row.optimizedTime}</TableCell>
                <TableCell className="text-right text-emerald-500">{row.timeSaving}</TableCell>
                <TableCell>{row.recommendation}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.impact === "High" ? "default" : row.impact === "Medium" ? "secondary" : "outline"}
                  >
                    {row.impact}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                No data available for the selected route
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

