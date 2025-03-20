"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Database, Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { DemandHeatmap } from "@/components/charts/demand-heatmap"
import { PassengerTrendsChart } from "@/components/charts/passenger-trends-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DemandPredictionTable } from "@/components/tables/demand-prediction-table"
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

export function DemandPrediction() {
  const [isExporting, setIsExporting] = useState(false)
  const [isRunningPrediction, setIsRunningPrediction] = useState(false)
  const [route, setRoute] = useState("all")
  const [busType, setBusType] = useState("all")
  const [predictionWindow, setPredictionWindow] = useState("7")
  const [predictionRun, setPredictionRun] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 2, 1),
    to: new Date(2024, 2, 31),
  })
  const [dataRefreshKey, setDataRefreshKey] = useState(0)

  const handleExport = async () => {
    setIsExporting(true)

    // Sample data for export
    const data = [
      {
        date: "2024-04-01",
        route: "Ahmedabad-Surat",
        busType: "AC Bus",
        currentDemand: 150,
        predictedDemand: 165,
        change: 10,
        confidence: "High",
      },
      {
        date: "2024-04-02",
        route: "Ahmedabad-Surat",
        busType: "AC Bus",
        currentDemand: 145,
        predictedDemand: 170,
        change: 17.2,
        confidence: "High",
      },
      {
        date: "2024-04-03",
        route: "Ahmedabad-Surat",
        busType: "AC Bus",
        currentDemand: 155,
        predictedDemand: 180,
        change: 16.1,
        confidence: "Medium",
      },
      {
        date: "2024-04-01",
        route: "Ahmedabad-Baroda",
        busType: "Non-AC Bus",
        currentDemand: 120,
        predictedDemand: 115,
        change: -4.2,
        confidence: "High",
      },
    ]

    await exportToCSV(data, "demand-prediction")
    setIsExporting(false)
  }

  const runPrediction = () => {
    setIsRunningPrediction(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsRunningPrediction(false)
      setPredictionRun(true)
    }, 1500)
  }

  const handleDateChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange)
    // Trigger a refresh of the data by changing the key
    setDataRefreshKey((prev) => prev + 1)
  }

  // Sample dataset for demand prediction
  const demandDataset = [
    {
      date: "2024-04-01",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 150,
      predictedDemand: 165,
      change: 10,
      confidence: "High",
    },
    {
      date: "2024-04-02",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 145,
      predictedDemand: 170,
      change: 17.2,
      confidence: "High",
    },
    {
      date: "2024-04-03",
      route: "Ahmedabad-Surat",
      busType: "AC Bus",
      currentDemand: 155,
      predictedDemand: 180,
      change: 16.1,
      confidence: "Medium",
    },
    {
      date: "2024-04-01",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 120,
      predictedDemand: 115,
      change: -4.2,
      confidence: "High",
    },
    {
      date: "2024-04-02",
      route: "Ahmedabad-Baroda",
      busType: "Non-AC Bus",
      currentDemand: 125,
      predictedDemand: 120,
      change: -4,
      confidence: "High",
    },
    {
      date: "2024-04-03",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 80,
      predictedDemand: 95,
      change: 18.8,
      confidence: "Medium",
    },
    {
      date: "2024-04-04",
      route: "Surat-Rajkot",
      busType: "Sleeper",
      currentDemand: 85,
      predictedDemand: 100,
      change: 17.6,
      confidence: "Medium",
    },
    {
      date: "2024-04-05",
      route: "Rajkot-Jamnagar",
      busType: "AC Bus",
      currentDemand: 110,
      predictedDemand: 125,
      change: 13.6,
      confidence: "High",
    },
    {
      date: "2024-04-06",
      route: "Rajkot-Jamnagar",
      busType: "Non-AC Bus",
      currentDemand: 95,
      predictedDemand: 105,
      change: 10.5,
      confidence: "Medium",
    },
    {
      date: "2024-04-07",
      route: "Baroda-Surat",
      busType: "AC Bus",
      currentDemand: 130,
      predictedDemand: 145,
      change: 11.5,
      confidence: "High",
    },
  ]

  // Historical demand dataset
  const historicalDemandDataset = [
    { date: "2024-03-01", route: "Ahmedabad-Surat", busType: "AC Bus", passengers: 1200, occupancyRate: "78%" },
    { date: "2024-03-02", route: "Ahmedabad-Surat", busType: "AC Bus", passengers: 1350, occupancyRate: "85%" },
    { date: "2024-03-03", route: "Ahmedabad-Surat", busType: "AC Bus", passengers: 1450, occupancyRate: "92%" },
    { date: "2024-03-04", route: "Ahmedabad-Surat", busType: "AC Bus", passengers: 1800, occupancyRate: "95%" },
    { date: "2024-03-05", route: "Ahmedabad-Baroda", busType: "Non-AC Bus", passengers: 980, occupancyRate: "72%" },
    { date: "2024-03-06", route: "Ahmedabad-Baroda", busType: "Non-AC Bus", passengers: 1050, occupancyRate: "75%" },
    { date: "2024-03-07", route: "Surat-Rajkot", busType: "Sleeper", passengers: 750, occupancyRate: "85%" },
    { date: "2024-03-08", route: "Surat-Rajkot", busType: "Sleeper", passengers: 820, occupancyRate: "88%" },
    { date: "2024-03-09", route: "Rajkot-Jamnagar", busType: "Non-AC Bus", passengers: 550, occupancyRate: "65%" },
    { date: "2024-03-10", route: "Baroda-Surat", busType: "AC Bus", passengers: 920, occupancyRate: "73%" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Passenger Demand Prediction</h1>
          <p className="text-muted-foreground">AI-powered forecasting of passenger demand patterns</p>
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
                <DialogTitle>Demand Prediction Datasets</DialogTitle>
                <DialogDescription>High-quality datasets used for demand prediction</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="prediction" className="mt-4">
                <TabsList>
                  <TabsTrigger value="prediction">Prediction Data</TabsTrigger>
                  <TabsTrigger value="historical">Historical Data</TabsTrigger>
                </TabsList>
                <TabsContent value="prediction" className="mt-4">
                  <DatasetViewer data={demandDataset} title="Demand Prediction Dataset" />
                </TabsContent>
                <TabsContent value="historical" className="mt-4">
                  <DatasetViewer data={historicalDemandDataset} title="Historical Demand Dataset" />
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Prediction Controls</CardTitle>
            <CardDescription>Configure prediction parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="route">Route</Label>
              <Select defaultValue="all" value={route} onValueChange={setRoute}>
                <SelectTrigger id="route">
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  <SelectItem value="ahmedabad-surat">Ahmedabad-Surat</SelectItem>
                  <SelectItem value="ahmedabad-baroda">Ahmedabad-Baroda</SelectItem>
                  <SelectItem value="surat-rajkot">Surat-Rajkot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bus-type">Bus Type</Label>
              <Select defaultValue="all" value={busType} onValueChange={setBusType}>
                <SelectTrigger id="bus-type">
                  <SelectValue placeholder="Select bus type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ac">AC Bus</SelectItem>
                  <SelectItem value="non-ac">Non-AC Bus</SelectItem>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prediction-window">Prediction Window</Label>
              <Select defaultValue="7" value={predictionWindow} onValueChange={setPredictionWindow}>
                <SelectTrigger id="prediction-window">
                  <SelectValue placeholder="Select window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={runPrediction} disabled={isRunningPrediction}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isRunningPrediction ? "animate-spin" : ""}`} />
              {isRunningPrediction ? "Running..." : "Run Prediction"}
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <Tabs defaultValue="heatmap" className="space-y-4">
            <TabsList>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="table">Detailed Data</TabsTrigger>
            </TabsList>
            <TabsContent value="heatmap" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Demand Heatmap</CardTitle>
                  <CardDescription>
                    Hourly demand distribution across routes
                    {predictionRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest prediction)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <DemandHeatmap
                    predictionRun={predictionRun}
                    dateRange={dateRange}
                    key={`heatmap-${dataRefreshKey}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Passenger Trends</CardTitle>
                  <CardDescription>
                    Historical vs. Predicted passenger counts
                    {predictionRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest prediction)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <PassengerTrendsChart
                    predictionRun={predictionRun}
                    dateRange={dateRange}
                    key={`trends-${dataRefreshKey}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="table" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Prediction Data</CardTitle>
                  <CardDescription>
                    Tabular view of demand predictions
                    {predictionRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest prediction)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DemandPredictionTable
                    predictionRun={predictionRun}
                    route={route}
                    busType={busType}
                    dateRange={dateRange}
                    key={`table-${dataRefreshKey}`}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

