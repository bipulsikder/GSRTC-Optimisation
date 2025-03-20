"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { FarePricingChart } from "@/components/charts/fare-pricing-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { FareComparisonTable } from "@/components/tables/fare-comparison-table"
import { exportToCSV } from "@/lib/export-utils"

export function FareEstimator() {
  const [isExporting, setIsExporting] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [route, setRoute] = useState("ahmedabad-surat")
  const [busType, setBusType] = useState("ac")
  const [demandSensitivity, setDemandSensitivity] = useState([50])
  const [competitorWeight, setCompetitorWeight] = useState([30])
  const [seasonalAdjustment, setSeasonalAdjustment] = useState([20])
  const [calculationRun, setCalculationRun] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Sample data for export
    const data = [
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
    ]

    await exportToCSV(data, "fare-estimation")
    setIsExporting(false)
  }

  const calculateOptimalFare = () => {
    setIsCalculating(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsCalculating(false)
      setCalculationRun(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dynamic Fare Price Estimator</h1>
          <p className="text-muted-foreground">AI-powered fare adjustment based on demand trends</p>
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
            <CardTitle>Fare Estimation Controls</CardTitle>
            <CardDescription>Configure fare pricing parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fare-route">Route</Label>
              <Select defaultValue="ahmedabad-surat" value={route} onValueChange={setRoute}>
                <SelectTrigger id="fare-route">
                  <SelectValue placeholder="Select route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahmedabad-surat">Ahmedabad-Surat</SelectItem>
                  <SelectItem value="ahmedabad-baroda">Ahmedabad-Baroda</SelectItem>
                  <SelectItem value="surat-rajkot">Surat-Rajkot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bus-type-fare">Bus Type</Label>
              <Select defaultValue="ac" value={busType} onValueChange={setBusType}>
                <SelectTrigger id="bus-type-fare">
                  <SelectValue placeholder="Select bus type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ac">AC Bus</SelectItem>
                  <SelectItem value="non-ac">Non-AC Bus</SelectItem>
                  <SelectItem value="sleeper">Sleeper</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Demand Sensitivity: {demandSensitivity}%</Label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={demandSensitivity}
                onValueChange={setDemandSensitivity}
              />
            </div>
            <div className="space-y-2">
              <Label>Competitor Pricing Weight: {competitorWeight}%</Label>
              <Slider
                defaultValue={[30]}
                max={100}
                step={1}
                value={competitorWeight}
                onValueChange={setCompetitorWeight}
              />
            </div>
            <div className="space-y-2">
              <Label>Seasonal Adjustment: {seasonalAdjustment}%</Label>
              <Slider
                defaultValue={[20]}
                max={100}
                step={1}
                value={seasonalAdjustment}
                onValueChange={setSeasonalAdjustment}
              />
            </div>
            <Button className="w-full" onClick={calculateOptimalFare} disabled={isCalculating}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isCalculating ? "animate-spin" : ""}`} />
              {isCalculating ? "Calculating..." : "Calculate Optimal Fare"}
            </Button>
          </CardContent>
        </Card>

        <div className="col-span-2">
          <Tabs defaultValue="comparison" className="space-y-4">
            <TabsList>
              <TabsTrigger value="comparison">Fare Comparison</TabsTrigger>
              <TabsTrigger value="trends">Pricing Trends</TabsTrigger>
              <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current vs. AI-Suggested Fares</CardTitle>
                  <CardDescription>
                    Comparison of current fares with AI-optimized pricing
                    {calculationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest calculation)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <FarePricingChart calculationRun={calculationRun} route={route} busType={busType} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fare Pricing Trends</CardTitle>
                  <CardDescription>
                    Historical fare pricing patterns
                    {calculationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest calculation)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="chart-container">
                  <FarePricingChart showTrends={true} calculationRun={calculationRun} route={route} busType={busType} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Fare Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive fare comparison by route and bus type
                    {calculationRun && (
                      <span className="ml-2 text-primary font-medium">(Updated with latest calculation)</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FareComparisonTable calculationRun={calculationRun} route={route} busType={busType} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

