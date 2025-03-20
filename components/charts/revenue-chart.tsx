"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"

interface RevenueChartProps {
  dateRange?: DateRange
}

export function RevenueChart({ dateRange }: RevenueChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Default data for revenue analysis
    let labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    let acBusData = [4.2, 3.8, 5.1, 5.6, 6.2, 6.8]
    let nonAcBusData = [2.8, 2.5, 3.2, 3.5, 3.8, 4.1]
    let sleeperData = [1.5, 1.3, 1.8, 2.0, 2.2, 2.5]
    let targetData = [8.0, 8.0, 9.0, 10.0, 11.0, 12.0]

    // Adjust data based on date range
    if (dateRange?.from) {
      const month = dateRange.from.getMonth()

      if (month === 3) {
        // April
        // Show April to September
        labels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]
        acBusData = [5.6, 6.2, 6.8, 7.2, 7.5, 7.1]
        nonAcBusData = [3.5, 3.8, 4.1, 4.3, 4.5, 4.2]
        sleeperData = [2.0, 2.2, 2.5, 2.7, 2.8, 2.6]
        targetData = [10.0, 11.0, 12.0, 13.0, 14.0, 13.5]
      } else if (month === 4) {
        // May
        // Show May to October
        labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
        acBusData = [6.2, 6.8, 7.2, 7.5, 7.1, 6.5]
        nonAcBusData = [3.8, 4.1, 4.3, 4.5, 4.2, 3.9]
        sleeperData = [2.2, 2.5, 2.7, 2.8, 2.6, 2.3]
        targetData = [11.0, 12.0, 13.0, 14.0, 13.5, 12.5]
      } else if (month === 1) {
        // February
        // Show February to July
        labels = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"]
        acBusData = [3.8, 5.1, 5.6, 6.2, 6.8, 7.2]
        nonAcBusData = [2.5, 3.2, 3.5, 3.8, 4.1, 4.3]
        sleeperData = [1.3, 1.8, 2.0, 2.2, 2.5, 2.7]
        targetData = [8.0, 9.0, 10.0, 11.0, 12.0, 13.0]
      }
    }

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: "AC Bus",
          data: acBusData,
          backgroundColor: "hsl(215, 100%, 50%)",
          stack: "Stack 0",
        },
        {
          label: "Non-AC Bus",
          data: nonAcBusData,
          backgroundColor: "hsl(215, 100%, 70%)",
          stack: "Stack 0",
        },
        {
          label: "Sleeper",
          data: sleeperData,
          backgroundColor: "hsl(215, 100%, 90%)",
          stack: "Stack 0",
        },
        {
          label: "Total Revenue Target",
          data: targetData,
          type: "line",
          borderColor: "hsl(var(--destructive))",
          borderWidth: 2,
          pointBackgroundColor: "hsl(var(--destructive))",
          fill: false,
          tension: 0.4,
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
          grid: {
            color: "hsl(var(--border) / 0.2)",
          },
          ticks: {
            callback: (value) => `₹${value}M`,
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
            label: (context) => `${context.dataset.label}: ₹${context.parsed.y}M`,
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
  }, [dateRange])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

