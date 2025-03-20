"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"

interface DemandHeatmapProps {
  predictionRun?: boolean
  dateRange?: DateRange
}

export function DemandHeatmap({ predictionRun = false, dateRange }: DemandHeatmapProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Sample data for demand heatmap
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    // Generate heatmap data
    const generateHeatmapData = () => {
      const data = []

      // Adjust data based on date range
      let monthFactor = 1.0
      if (dateRange?.from) {
        const month = dateRange.from.getMonth()
        if (month === 3) monthFactor = 1.2 // April
        if (month === 4) monthFactor = 1.35 // May
        if (month === 1) monthFactor = 0.85 // February
      }

      for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < 24; j++) {
          // Morning peak (7-10 AM)
          let value = 20 + Math.random() * 30
          if (j >= 7 && j <= 10) {
            value = 70 + Math.random() * 30
          }
          // Evening peak (5-8 PM)
          if (j >= 17 && j <= 20) {
            value = 80 + Math.random() * 20
          }
          // Weekend patterns
          if ((i === 5 || i === 6) && j >= 9 && j <= 18) {
            value = 60 + Math.random() * 40
          }
          // Night time (11 PM - 5 AM)
          if (j >= 23 || j <= 5) {
            value = 10 + Math.random() * 20
          }

          // Apply month factor
          value *= monthFactor

          // If prediction has been run, increase values
          if (predictionRun) {
            value = value * 1.15 // 15% increase in demand after prediction
          }

          data.push({
            x: j,
            y: i,
            r: Math.max(5, Math.min(20, value / 5)), // Size based on value
            v: Math.round(value), // Store original value for tooltip
          })
        }
      }
      return data
    }

    const heatmapData = generateHeatmapData()

    const data: ChartData = {
      datasets: [
        {
          label: "Passenger Demand",
          data: heatmapData,
          backgroundColor(context) {
            const value = context.raw.v
            const alpha = Math.min(1, Math.max(0.1, value / 100))
            return `hsl(var(--primary) / ${alpha})`
          },
          borderColor: "transparent",
          pointRadius: 10, // Will be overridden by r value in data
          pointHoverRadius: 12,
        },
      ],
    }

    const options: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "linear",
          min: -0.5,
          max: 23.5,
          ticks: {
            stepSize: 3,
            callback: (value) => `${value}:00`,
          },
          title: {
            display: true,
            text: "Hour of Day",
          },
          grid: {
            display: false,
          },
        },
        y: {
          type: "linear",
          min: -0.5,
          max: 6.5,
          ticks: {
            stepSize: 1,
            callback: (value) => days[value],
          },
          title: {
            display: true,
            text: "Day of Week",
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: (items) => {
              const item = items[0]
              const x = Math.round(item.parsed.x)
              const y = Math.round(item.parsed.y)
              return `${days[y]} at ${x}:00`
            },
            label: (item) => {
              const value = item.raw.v
              return `Passenger Demand: ${value}%`
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
        type: "bubble", // Using bubble chart for heatmap visualization
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
  }, [predictionRun, dateRange])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

