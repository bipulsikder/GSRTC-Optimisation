"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"

interface RoutePerformanceChartProps {
  optimizationRun?: boolean
  dateRange?: DateRange
}

export function RoutePerformanceChart({ optimizationRun = false, dateRange }: RoutePerformanceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Sample data for route performance
    const labels = ["Ahmedabad-Surat", "Ahmedabad-Baroda", "Surat-Rajkot", "Rajkot-Jamnagar", "Baroda-Surat"]

    // Adjust efficiency scores based on date range
    let monthFactor = 1.0
    if (dateRange?.from) {
      const month = dateRange.from.getMonth()
      if (month === 3) monthFactor = 1.08 // April: 8% better
      if (month === 4) monthFactor = 1.12 // May: 12% better
      if (month === 1) monthFactor = 0.95 // February: 5% worse
    }

    // Adjust efficiency scores if optimization has been run
    const baseScores = [85, 78, 92, 65, 73]
    const efficiencyScores = optimizationRun
      ? baseScores.map((score) => Math.min(98, Math.round(score * 1.1))) // Improved scores after optimization
      : baseScores.map((score) => Math.round(score * monthFactor)) // Original scores adjusted by month

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: "Efficiency Score",
          data: efficiencyScores,
          backgroundColor: "hsl(var(--primary))",
          borderRadius: 4,
          barPercentage: 0.6,
        },
        {
          label: "Target Score",
          data: [90, 90, 90, 90, 90],
          backgroundColor: "transparent",
          borderColor: "hsl(var(--destructive))",
          borderWidth: 2,
          borderDash: [5, 5],
          type: "line",
          pointRadius: 0,
        },
      ],
    }

    const options: ChartOptions = {
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
          max: 100,
          grid: {
            color: "hsl(var(--border) / 0.2)",
          },
          ticks: {
            callback: (value) => `${value}%`,
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
            label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
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
        type: "bar",
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
  }, [optimizationRun, dateRange])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

