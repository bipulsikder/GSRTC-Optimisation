"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface TicketForecastTableProps {
  forecastRun?: boolean
  route?: string
  busType?: string
}

export function TicketForecastTable({ forecastRun = false, route = "all", busType = "all" }: TicketForecastTableProps) {
  // Base data for ticket forecast
  const baseData = [
    {
      date: "Apr 10, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 550,
      currentCapacity: 500,
      capacityGap: 50,
      recommendation: "Add 2 Buses",
      priority: "High",
    },
    {
      date: "Apr 11, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 580,
      currentCapacity: 500,
      capacityGap: 80,
      recommendation: "Add 3 Buses",
      priority: "High",
    },
    {
      date: "Apr 12, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 600,
      currentCapacity: 500,
      capacityGap: 100,
      recommendation: "Add 4 Buses",
      priority: "Critical",
    },
    {
      date: "Apr 10, 2024",
      route: "Ahmedabad-Baroda",
      predictedDemand: 420,
      currentCapacity: 450,
      capacityGap: -30,
      recommendation: "No Change",
      priority: "Low",
    },
    {
      date: "Apr 15, 2024",
      route: "Surat-Rajkot",
      predictedDemand: 350,
      currentCapacity: 300,
      capacityGap: 50,
      recommendation: "Add 2 Buses",
      priority: "Medium",
    },
    {
      date: "Apr 20, 2024",
      route: "Rajkot-Jamnagar",
      predictedDemand: 200,
      currentCapacity: 225,
      capacityGap: -25,
      recommendation: "Reduce 1 Bus",
      priority: "Low",
    },
  ]

  // Updated data after forecast run
  const updatedData = [
    {
      date: "Apr 10, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 620,
      currentCapacity: 500,
      capacityGap: 120,
      recommendation: "Add 5 Buses",
      priority: "Critical",
    },
    {
      date: "Apr 11, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 650,
      currentCapacity: 500,
      capacityGap: 150,
      recommendation: "Add 6 Buses",
      priority: "Critical",
    },
    {
      date: "Apr 12, 2024",
      route: "Ahmedabad-Surat",
      predictedDemand: 680,
      currentCapacity: 500,
      capacityGap: 180,
      recommendation: "Add 7 Buses",
      priority: "Critical",
    },
    {
      date: "Apr 10, 2024",
      route: "Ahmedabad-Baroda",
      predictedDemand: 400,
      currentCapacity: 450,
      capacityGap: -50,
      recommendation: "Reduce 2 Buses",
      priority: "Medium",
    },
    {
      date: "Apr 15, 2024",
      route: "Surat-Rajkot",
      predictedDemand: 380,
      currentCapacity: 300,
      capacityGap: 80,
      recommendation: "Add 3 Buses",
      priority: "High",
    },
    {
      date: "Apr 20, 2024",
      route: "Rajkot-Jamnagar",
      predictedDemand: 210,
      currentCapacity: 225,
      capacityGap: -15,
      recommendation: "No Change",
      priority: "Low",
    },
  ]

  // Choose which data to display based on forecast run
  let forecastData = forecastRun ? updatedData : baseData

  // Filter data based on route and bus type
  if (route !== "all") {
    const routeFormatted = route
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-")

    forecastData = forecastData.filter((item) => item.route === routeFormatted)
  }

  // In a real app, we would filter by bus type as well
  // For this demo, we'll just show all data since the sample doesn't include bus type

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Route</TableHead>
            <TableHead className="text-right">Predicted Demand</TableHead>
            <TableHead className="text-right">Current Capacity</TableHead>
            <TableHead className="text-right">Capacity Gap</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData.length > 0 ? (
            forecastData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.date}</TableCell>
                <TableCell>{row.route}</TableCell>
                <TableCell className="text-right">{row.predictedDemand}</TableCell>
                <TableCell className="text-right">{row.currentCapacity}</TableCell>
                <TableCell className="text-right">
  <span className={`flex items-center justify-end ${
    row.capacityGap > 0 ? "text-rose-500" 
    : row.capacityGap < 0 ? "text-emerald-500" 
    : "text-muted-foreground"
  }`}>
    {row.capacityGap > 0 ? (
      <ArrowUpIcon className="mr-1 h-4 w-4" />
    ) : row.capacityGap < 0 ? (
      <ArrowDownIcon className="mr-1 h-4 w-4" />
    ) : null}
    {Math.abs(row.capacityGap)}
  </span>
</TableCell>

                <TableCell>{row.recommendation}</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      row.priority === "Critical" 
                        ? "destructive" 
                        : row.priority === "High" 
                          ? "default" 
                          : row.priority === "Medium"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {row.priority}
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
  );
}

