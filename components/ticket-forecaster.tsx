"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { TicketSalesChart } from "@/components/charts/ticket-sales-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { TicketForecastTable } from "@/components/tables/ticket-forecast-table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, TrendingUp } from "lucide-react"
import { exportToCSV } from "@/lib/export-utils"

export function TicketForecaster() {
  const [isExporting, setIsExporting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [route, setRoute] = useState("all")
  const [busType, setBusType] = useState("all")
  const [forecastPeriod, setForecastPeriod] = useState("30")
  const [forecastModel, setForecastModel] = useState("arima")
  const [forecastRun, setForecastRun] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Sample data for export
    const data = [
      {
        date: "2024-04-10",
        route: "Ahmedabad-Surat",
        predictedDemand: 550,
        currentCapacity: 500,
        capacityGap: 50,
        recommendation: "Add 2 Buses",
        priority: "High",
      },
      {
        date: "2024-04-11",
        route: "Ahmedabad-Surat",
        predictedDemand: 580,
        currentCapacity: 500,
        capacityGap: 80,
        recommendation: "Add 3 Buses",
        priority: "High",
      },
      {
        date: "2024-04-12",
        route: "Ahmedabad-Surat",
        predictedDemand: 600,
        currentCapacity: 500,
        capacityGap: 100,
        recommendation: "Add 4 Buses",
        priority: "Critical",
      },
    ]

    await exportToCSV(data, "ticket-forecast")
    setIsExporting(false)
  }

  const generateForecast = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false)
      setForecastRun(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Demand Forecaster</h1>
          <p className="text-muted-foreground">Predicts future ticket sales trends using historical data</p>
        </div>
        <div className="flex items-center gap-4">
          <DatePickerWithRange />
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Forecast Controls</CardTitle>
            <CardDescription>Configure ticket forecasting parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket-route">Route</Label>
              <Select defaultValue="all" value={route} onValueChange={setRoute}>
                <SelectTrigger id="ticket-route">
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
              <Label htmlFor="ticket-bus-type">Bus Type</Label>
              <Select defaultValue="all" value={busType} onValueChange={setBusType}>
                <SelectTrigger id="ticket-bus-type">
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
              <Label htmlFor="forecast-period">Forecast Period</Label>
              <Select defaultValue="30" value={forecastPeriod} onValueChange={setForecastPeriod}>
                <SelectTrigger id="forecast-period">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="180">180 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="forecast-model">Forecast Model</Label>
              <Select defaultValue="arima" value={forecastModel} onValueChange={setForecastModel}>
                <SelectTrigger id="forecast-model">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="prophet">Prophet</SelectItem>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                  <SelectItem value="ensemble">Ensemble Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={generateForecast} disabled={isGenerating}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Generate Forecast"}
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <Tabs defaultValue="forecast" className="space-y-4">
            <TabsList>
              <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
              <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
              <TabsTrigger value="alerts">Demand Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value="forecast" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Sales Forecast</CardTitle>
                  <CardDescription>
                    Historical and predicted ticket sales
                    {forecastRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest forecast)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <TicketSalesChart
                    forecastRun={forecastRun}
                    route={route}
                    busType={busType}
                    forecastPeriod={forecastPeriod}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="capacity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Capacity Planning</CardTitle>
                  <CardDescription>
                    Recommended bus allocation based on forecasted demand
                    {forecastRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest forecast)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TicketForecastTable forecastRun={forecastRun} route={route} busType={busType} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="alerts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Alerts</CardTitle>
                  <CardDescription>
                    High demand periods requiring attention
                    {forecastRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest forecast)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {forecastRun ? (
                    <>
                      <Alert variant="default" className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-800">Critical Demand Alert</AlertTitle>
                        <AlertDescription className="text-amber-700">
                          {route === "all" || route === "ahmedabad-surat"
                            ? "Ahmedabad-Surat route is expected to see 45% higher demand on April 10-12, 2024 due to upcoming festival. Consider adding 5 additional buses."
                            : `${route
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(
                                  "-",
                                )} route is expected to see 30% higher demand next week. Consider adding additional buses.`}
                        </AlertDescription>
                      </Alert>
                      <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Demand Trend Alert</AlertTitle>
                        <AlertDescription className="text-blue-700">
                          {busType === "all" || busType === "sleeper"
                            ? "Sleeper buses on Surat-Rajkot route are showing consistently increasing demand (20% month-over-month). Consider permanent capacity increase."
                            : `${busType.toUpperCase()} buses are showing consistently increasing demand (18% month-over-month). Consider permanent capacity increase.`}
                        </AlertDescription>
                      </Alert>
                      <Alert variant="default" className="bg-green-50 border-green-200">
                        <AlertCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Weekend Demand Alert</AlertTitle>
                        <AlertDescription className="text-green-700">
                          All routes to tourist destinations are showing 30-45% higher demand for upcoming weekends.
                          Optimize pricing and add capacity.
                        </AlertDescription>
                      </Alert>
                    </>
                  ) : (
                    <>
                      <Alert variant="default" className="bg-gray-50 border-gray-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>High Demand Alert</AlertTitle>
                        <AlertDescription>
                          Ahmedabad-Surat route is expected to see 35% higher demand on April 10-12, 2024 due to
                          upcoming festival. Consider adding 4 additional buses.
                        </AlertDescription>
                      </Alert>
                      <Alert variant="default" className="bg-gray-50 border-gray-200">
                        <TrendingUp className="h-4 w-4" />
                        <AlertTitle>Demand Trend Alert</AlertTitle>
                        <AlertDescription>
                          Sleeper buses on Surat-Rajkot route are showing consistently increasing demand (15%
                          month-over-month). Consider permanent capacity increase.
                        </AlertDescription>
                      </Alert>
                      <Alert variant="default" className="bg-gray-50 border-gray-200">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Weekend Demand Alert</AlertTitle>
                        <AlertDescription>
                          All routes to tourist destinations are showing 25-40% higher demand for upcoming weekends.
                          Optimize pricing and add capacity.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

