"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewMetrics } from "@/components/overview-metrics"
import { PassengerTrendsChart } from "@/components/charts/passenger-trends-chart"
import { RoutePerformanceChart } from "@/components/charts/route-performance-chart"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { DemandHeatmap } from "@/components/charts/demand-heatmap"
import { Button } from "@/components/ui/button"
import { Download, Database } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { exportToCSV } from "@/lib/export-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DatasetViewer } from "@/components/dataset-viewer"
import type { DateRange } from "react-day-picker"

export function DashboardOverview() {
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 2, 1),
    to: new Date(2024, 2, 31),
  })
  const [dataRefreshKey, setDataRefreshKey] = useState(0)

  const handleExport = async () => {
    setIsExporting(true)

    // Sample data for export
    const data = [
      { date: "2024-03-01", route: "Ahmedabad-Surat", passengers: 150, revenue: 45000 },
      { date: "2024-03-01", route: "Ahmedabad-Baroda", passengers: 120, revenue: 18000 },
      { date: "2024-03-01", route: "Surat-Rajkot", passengers: 80, revenue: 32000 },
      { date: "2024-03-02", route: "Ahmedabad-Surat", passengers: 145, revenue: 43500 },
      { date: "2024-03-02", route: "Ahmedabad-Baroda", passengers: 125, revenue: 18750 },
      { date: "2024-03-02", route: "Surat-Rajkot", passengers: 85, revenue: 34000 },
    ]

    await exportToCSV(data, "dashboard-overview")
    setIsExporting(false)
  }

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange)
    // Trigger a refresh of the data by changing the key
    setDataRefreshKey((prev) => prev + 1)
  }

  // Sample datasets for the dashboard
  const passengerDataset = [
    { date: "2024-03-01", route: "Ahmedabad-Surat", passengers: 1200, busType: "AC" },
    { date: "2024-03-02", route: "Ahmedabad-Surat", passengers: 1350, busType: "AC" },
    { date: "2024-03-03", route: "Ahmedabad-Surat", passengers: 1450, busType: "AC" },
    { date: "2024-03-04", route: "Ahmedabad-Surat", passengers: 1800, busType: "AC" },
    { date: "2024-03-05", route: "Ahmedabad-Surat", passengers: 2100, busType: "AC" },
    { date: "2024-03-06", route: "Ahmedabad-Baroda", passengers: 980, busType: "Non-AC" },
    { date: "2024-03-07", route: "Ahmedabad-Baroda", passengers: 1050, busType: "Non-AC" },
    { date: "2024-03-08", route: "Surat-Rajkot", passengers: 750, busType: "Sleeper" },
    { date: "2024-03-09", route: "Surat-Rajkot", passengers: 820, busType: "Sleeper" },
    { date: "2024-03-10", route: "Rajkot-Jamnagar", passengers: 550, busType: "Non-AC" },
  ]

  const revenueDataset = [
    { month: "Jan", acBus: 4.2, nonAcBus: 2.8, sleeper: 1.5, total: 8.5 },
    { month: "Feb", acBus: 3.8, nonAcBus: 2.5, sleeper: 1.3, total: 7.6 },
    { month: "Mar", acBus: 5.1, nonAcBus: 3.2, sleeper: 1.8, total: 10.1 },
    { month: "Apr", acBus: 5.6, nonAcBus: 3.5, sleeper: 2.0, total: 11.1 },
    { month: "May", acBus: 6.2, nonAcBus: 3.8, sleeper: 2.2, total: 12.2 },
    { month: "Jun", acBus: 6.8, nonAcBus: 4.1, sleeper: 2.5, total: 13.4 },
  ]

  const routeDataset = [
    { route: "Ahmedabad-Surat", efficiencyScore: 85, targetScore: 90, busesPerDay: 45, avgOccupancy: "78%" },
    { route: "Ahmedabad-Baroda", efficiencyScore: 78, targetScore: 90, busesPerDay: 32, avgOccupancy: "72%" },
    { route: "Surat-Rajkot", efficiencyScore: 92, targetScore: 90, busesPerDay: 28, avgOccupancy: "85%" },
    { route: "Rajkot-Jamnagar", efficiencyScore: 65, targetScore: 90, busesPerDay: 18, avgOccupancy: "60%" },
    { route: "Baroda-Surat", efficiencyScore: 73, targetScore: 90, busesPerDay: 25, avgOccupancy: "68%" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">AI-powered insights for GSRTC operations</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange onDateChange={handleDateChange} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Database className="mr-2 h-4 w-4" />
                View Datasets
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Dashboard Datasets</DialogTitle>
                <DialogDescription>High-quality datasets used for analytics and visualization</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="passengers" className="mt-4">
                <TabsList>
                  <TabsTrigger value="passengers">Passenger Data</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue Data</TabsTrigger>
                  <TabsTrigger value="routes">Route Data</TabsTrigger>
                </TabsList>
                <TabsContent value="passengers" className="mt-4">
                  <DatasetViewer data={passengerDataset} title="Passenger Trends Dataset" />
                </TabsContent>
                <TabsContent value="revenue" className="mt-4">
                  <DatasetViewer data={revenueDataset} title="Revenue Analysis Dataset" />
                </TabsContent>
                <TabsContent value="routes" className="mt-4">
                  <DatasetViewer data={routeDataset} title="Route Performance Dataset" />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <OverviewMetrics dateRange={dateRange} key={`metrics-${dataRefreshKey}`} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="demand">Demand</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Passenger Trends</CardTitle>
                <CardDescription>Daily passenger count across all routes</CardDescription>
              </CardHeader>
              <CardContent className="chart-container">
                <PassengerTrendsChart dateRange={dateRange} key={`trends-${dataRefreshKey}`} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue breakdown by bus type</CardDescription>
              </CardHeader>
              <CardContent className="chart-container">
                <RevenueChart dateRange={dateRange} key={`revenue-${dataRefreshKey}`} />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>Efficiency metrics for top routes</CardDescription>
              </CardHeader>
              <CardContent className="chart-container">
                <RoutePerformanceChart dateRange={dateRange} key={`performance-${dataRefreshKey}`} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Passenger Demand Heatmap</CardTitle>
                <CardDescription>Hourly demand distribution</CardDescription>
              </CardHeader>
              <CardContent className="chart-container">
                <DemandHeatmap dateRange={dateRange} key={`heatmap-${dataRefreshKey}`} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
              <CardDescription>AI-suggested route improvements</CardDescription>
            </CardHeader>
            <CardContent className="chart-container">
              <RoutePerformanceChart dateRange={dateRange} key={`routes-${dataRefreshKey}`} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demand" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demand Patterns</CardTitle>
              <CardDescription>Passenger demand by time and location</CardDescription>
            </CardHeader>
            <CardContent className="chart-container">
              <DemandHeatmap dateRange={dateRange} key={`demand-${dataRefreshKey}`} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Insights</CardTitle>
              <CardDescription>Revenue breakdown and forecasts</CardDescription>
            </CardHeader>
            <CardContent className="chart-container">
              <RevenueChart dateRange={dateRange} key={`revenue-insights-${dataRefreshKey}`} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

