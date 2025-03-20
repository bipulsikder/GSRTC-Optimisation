"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"

interface FarePricingChartProps {
  showTrends?: boolean
  calculationRun?: boolean
  route?: string
  busType?: string
}

export function FarePricingChart({
  showTrends = false,
  calculationRun = false,
  route = "ahmedabad-surat",
  busType = "ac",
}: FarePricingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    let data: ChartData
    let options: ChartOptions

    if (showTrends) {
      // Show fare pricing trends over time
      const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      // Base data
      const currentFare = [300, 300, 320, 320, 320, 350, 350, 350, 380, 380, 380, 400]
      let suggestedFare = [310, 325, 340, 330, 345, 370, 360, 375, 400, 390, 405, 420]
      const competitorFare = [290, 295, 310, 315, 325, 340, 345, 355, 370, 375, 385, 395]

      // Adjust data based on calculation run
      if (calculationRun) {
        // More aggressive pricing strategy after calculation
        suggestedFare = suggestedFare.map((val, i) => {
          // Apply different strategies based on route and bus type
          if (route === "ahmedabad-surat" && busType === "ac") {
            return val * 1.08 // 8% increase for AC buses on popular route
          } else if (route === "surat-rajkot") {
            return val * 0.95 // 5% decrease to boost demand on this route
          } else {
            return val * 1.03 // 3% increase for other routes/types
          }
        })
      }

      data = {
        labels,
        datasets: [
          {
            label: "Current Fare",
            data: currentFare,
            borderColor: "hsl(215, 100%, 50%)",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
          },
          {
            label: "AI-Suggested Fare",
            data: suggestedFare,
            borderColor: "hsl(var(--destructive))",
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
          },
          {
            label: "Competitor Avg. Fare",
            data: competitorFare,
            borderColor: "hsl(var(--muted-foreground))",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      }

      options = {
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
              callback: (value) => `₹${value}`,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ₹${Math.round(context.parsed.y)}`,
            },
          },
        },
      }
    } else {
      // Show fare comparison by route
      const labels = ["Ahmedabad-Surat", "Ahmedabad-Baroda", "Surat-Rajkot", "Rajkot-Jamnagar", "Baroda-Surat"]

      // Base data
      const currentFare = [300, 150, 400, 250, 200]
      let suggestedFare = [320, 160, 380, 270, 210]

      // Adjust data based on calculation run
      if (calculationRun) {
        suggestedFare = [
          route === "ahmedabad-surat" && busType === "ac" ? 340 : 320, // Ahmedabad-Surat
          route === "ahmedabad-baroda" ? 170 : 160, // Ahmedabad-Baroda
          route === "surat-rajkot" ? 360 : 380, // Surat-Rajkot
          280, // Rajkot-Jamnagar
          220, // Baroda-Surat
        ]
      }

      data = {
        labels,
        datasets: [
          {
            label: "Current Fare",
            data: currentFare,
            backgroundColor: "hsl(215, 100%, 50%)",
            borderRadius: 4,
            barPercentage: 0.6,
          },
          {
            label: "AI-Suggested Fare",
            data: suggestedFare,
            backgroundColor: "hsl(var(--destructive))",
            borderRadius: 4,
            barPercentage: 0.6,
          },
        ],
      }

      options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "hsl(var(--border) / 0.2)",
            },
            ticks: {
              callback: (value) => `₹${value}`,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ₹${context.parsed.y}`,
            },
          },
        },
      }
    }

    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: showTrends ? "line" : "bar",
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
  }, [showTrends, calculationRun, route, busType])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

