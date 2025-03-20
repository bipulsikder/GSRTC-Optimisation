"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { RouteMap } from "@/components/charts/route-map"
import { RoutePerformanceChart } from "@/components/charts/route-performance-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RouteOptimizationTable } from "@/components/tables/route-optimization-table"
import { exportToCSV } from "@/lib/export-utils"

export function RouteOptimization() {
  const [isExporting, setIsExporting] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [route, setRoute] = useState("ahmedabad-surat")
  const [optimizationGoal, setOptimizationGoal] = useState("time")
  const [trafficConditions, setTrafficConditions] = useState("normal")
  const [optimizationRun, setOptimizationRun] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Sample data for export
    const data = [
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
        route: "Surat-Rajkot",
        currentTime: 300,
        optimizedTime: 270,
        timeSaving: 30,
        recommendation: "Adjust Timing",
        impact: "Medium",
      },
    ]

    await exportToCSV(data, "route-optimization")
    setIsExporting(false)
  }

  const optimizeRoutes = () => {
    setIsOptimizing(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsOptimizing(false)
      setOptimizationRun(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route Optimization</h1>
          <p className="text-muted-foreground">AI-powered route suggestions and efficiency analysis</p>
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
            <CardTitle>Optimization Controls</CardTitle>
            <CardDescription>Configure route optimization parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="route-select">Route</Label>
              <Select defaultValue="ahmedabad-surat" value={route} onValueChange={setRoute}>
                <SelectTrigger id="route-select">
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmedabad-surat">Ahmedabad-Surat</SelectItem>
                  <SelectItem value="ahmedabad-baroda">Ahmedabad-Baroda</SelectItem>
                  <SelectItem value="surat-rajkot">Surat-Rajkot</SelectItem>
                  <SelectItem value="rajkot-jamnagar">Rajkot-Jamnagar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="optimization-goal">Optimization Goal</Label>
              <Select defaultValue="time" value={optimizationGoal} onValueChange={setOptimizationGoal}>
                <SelectTrigger id="optimization-goal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">Minimize Travel Time</SelectItem>
                  <SelectItem value="cost">Minimize Operational Cost</SelectItem>
                  <SelectItem value="revenue">Maximize Revenue</SelectItem>
                  <SelectItem value="passengers">Maximize Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="traffic-conditions">Traffic Conditions</Label>
              <Select defaultValue="normal" value={trafficConditions} onValueChange={setTrafficConditions}>
                <SelectTrigger id="traffic-conditions">
                  <SelectValue placeholder="Select conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="peak">Peak Hours</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={optimizeRoutes} disabled={isOptimizing}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isOptimizing ? "animate-spin" : ""}`} />
              {isOptimizing ? "Optimizing..." : "Optimize Routes"}
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <Tabs defaultValue="map" className="space-y-4">
            <TabsList>
              <TabsTrigger value="map">Route Map</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Route Map</CardTitle>
                  <CardDescription>
                    Current vs. optimized route visualization
                    {optimizationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest optimization)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <RouteMap optimizationRun={optimizationRun} route={route} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Route Performance Metrics</CardTitle>
                  <CardDescription>
                    Efficiency analysis of current routes
                    {optimizationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest optimization)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <RoutePerformanceChart optimizationRun={optimizationRun} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recommendations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>
                    Suggested route improvements
                    {optimizationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest optimization)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RouteOptimizationTable
                    optimizationRun={optimizationRun}
                    route={route}
                    optimizationGoal={optimizationGoal}
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

