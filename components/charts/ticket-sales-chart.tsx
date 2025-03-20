"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"

interface TicketSalesChartProps {
  forecastRun?: boolean
  route?: string
  busType?: string
  forecastPeriod?: string
}

export function TicketSalesChart({
  forecastRun = false,
  route = "all",
  busType = "all",
  forecastPeriod = "30",
}: TicketSalesChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Sample data for ticket sales forecast
    const labels = [
      "Mar 1",
      "Mar 8",
      "Mar 15",
      "Mar 22",
      "Mar 29",
      "Apr 5",
      "Apr 12",
      "Apr 19",
      "Apr 26",
      "May 3",
      "May 10",
      "May 17",
      "May 24",
      "May 31",
    ]

    // Base historical data
    const historicalData = [500, 480, 520, 550, 600, 580, 620, 650, 700, null, null, null, null, null]

    // Base forecast data
    let forecastData = [null, null, null, null, null, null, null, null, 700, 720, 750, 780, 800, 830]

    let confidenceUpper = [null, null, null, null, null, null, null, null, 720, 750, 790, 830, 860, 900]

    let confidenceLower = [null, null, null, null, null, null, null, null, 680, 690, 710, 730, 740, 760]

    // Adjust forecast based on parameters if forecast has been run
    if (forecastRun) {
      // Apply multipliers based on route and bus type
      let multiplier = 1.0

      if (route === "ahmedabad-surat") {
        multiplier *= 1.15 // 15% higher forecast for this popular route
      } else if (route === "surat-rajkot") {
        multiplier *= 0.9 // 10% lower forecast for this route
      }

      if (busType === "ac") {
        multiplier *= 1.1 // 10% higher for AC buses
      } else if (busType === "sleeper") {
        multiplier *= 1.2 // 20% higher for sleeper buses
      }

      // Apply forecast period adjustments
      if (forecastPeriod === "90") {
        // For longer forecasts, increase the growth rate
        forecastData = forecastData.map((val, i) =>
          val === null ? null : Math.round(val * multiplier * (1 + i * 0.01)),
        )

        confidenceUpper = confidenceUpper.map((val, i) =>
          val === null ? null : Math.round(val * multiplier * (1 + i * 0.015)),
        )

        confidenceLower = confidenceLower.map((val, i) =>
          val === null ? null : Math.round(val * multiplier * (1 + i * 0.005)),
        )
      } else {
        // For shorter forecasts, apply flat multiplier
        forecastData = forecastData.map((val) => (val === null ? null : Math.round(val * multiplier)))

        confidenceUpper = confidenceUpper.map((val) => (val === null ? null : Math.round(val * multiplier * 1.05)))

        confidenceLower = confidenceLower.map((val) => (val === null ? null : Math.round(val * multiplier * 0.95)))
      }
    }

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: "Historical Sales",
          data: historicalData,
          borderColor: "hsl(215, 100%, 50%)",
          backgroundColor: "hsl(215, 100%, 50%, 0.1)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "hsl(215, 100%, 50%)",
        },
        {
          label: "Forecasted Sales",
          data: forecastData,
          borderColor: "hsl(var(--destructive))",
          backgroundColor: "transparent",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "hsl(var(--destructive))",
        },
        {
          label: "Upper Confidence",
          data: confidenceUpper,
          borderColor: "transparent",
          backgroundColor: "hsl(var(--destructive) / 0.1)",
          borderWidth: 0,
          tension: 0.3,
          pointRadius: 0,
          fill: "+1",
        },
        {
          label: "Lower Confidence",
          data: confidenceLower,
          borderColor: "transparent",
          backgroundColor: "hsl(var(--destructive) / 0.1)",
          borderWidth: 0,
          tension: 0.3,
          pointRadius: 0,
          fill: false,
        },
      ],
    }

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: "hsl(var(--border) / 0.2)",
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            color: "hsl(var(--border) / 0.2)",
          },
          ticks: {
            callback: (value) => value.toString(),
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10,
            filter: (item) => {
              // Hide confidence bands from legend
              return !item.text.includes("Confidence")
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              if (context.dataset.label?.includes("Confidence")) {
                return null
              }
              return `${context.dataset.label}: ${context.parsed.y} tickets`
            },
          },
        },
      },
    }

    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data,
        options,
      })
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [forecastRun, route, busType, forecastPeriod])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

