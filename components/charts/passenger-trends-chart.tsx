"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartData, type ChartOptions } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"
import { format, addDays, differenceInDays } from "date-fns"

interface PassengerTrendsChartProps {
  predictionRun?: boolean
  dateRange?: DateRange
}

export function PassengerTrendsChart({ predictionRun = false, dateRange }: PassengerTrendsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Generate labels based on date range
    let labels: string[] = []
    let actualData: number[] = []
    let predictedData: number[] = []
    let futureData: (number | null)[] = []

    // Default data (March)
    if (!dateRange?.from || !dateRange?.to) {
      labels = [
        "Mar 1",
        "Mar 2",
        "Mar 3",
        "Mar 4",
        "Mar 5",
        "Mar 6",
        "Mar 7",
        "Mar 8",
        "Mar 9",
        "Mar 10",
        "Mar 11",
        "Mar 12",
        "Mar 13",
        "Mar 14",
      ]

      actualData = [1200, 1350, 1450, 1800, 2100, 2400, 2300, 1900, 1700, 1600, 1550, 1700, 1850, 2000]
      predictedData = [1250, 1400, 1500, 1850, 2150, 2450, 2350, 1950, 1750, 1650, 1600, 1750, 1900, 2050]
      futureData = Array(7).fill(null).concat([2100, 2250, 2400, 2350, 2200, 2300, 2450])
    } else {
      // Generate data based on selected date range
      const startDate = dateRange.from
      const endDate = dateRange.to || dateRange.from
      const dayCount = Math.min(14, differenceInDays(endDate, startDate) + 1)

      for (let i = 0; i < dayCount; i++) {
        const currentDate = addDays(startDate, i)
        labels.push(format(currentDate, "MMM d"))

        // Generate data based on month
        const month = currentDate.getMonth()
        const dayOfMonth = currentDate.getDate()
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6

        // Base passenger count varies by month
        let baseCount = 1200
        if (month === 3) baseCount = 1500 // April
        if (month === 4) baseCount = 1800 // May
        if (month === 1) baseCount = 1000 // February

        // Weekend boost
        if (isWeekend) baseCount *= 1.3

        // Day of month pattern (higher in middle of month)
        const dayFactor = 1 + Math.sin((dayOfMonth / 31) * Math.PI) * 0.3

        const actualValue = Math.round(baseCount * dayFactor * (0.9 + Math.random() * 0.2))
        actualData.push(actualValue)

        // Predicted is slightly different
        predictedData.push(Math.round(actualValue * (1 + (Math.random() * 0.1 - 0.05))))

        // First half is historical, second half is future
        if (i < dayCount / 2) {
          futureData.push(null)
        } else {
          futureData.push(Math.round(actualValue * (1.1 + Math.random() * 0.1)))
        }
      }
    }

    // Adjust predicted data if prediction has been run
    if (predictionRun) {
      predictedData = predictedData.map((val) => Math.round(val * 1.1)) // 10% increase
      futureData = futureData.map((val) => (val === null ? null : Math.round((val as number) * 1.15))) // 15% higher forecast
    }

    const data: ChartData = {
      labels,
      datasets: [
        {
          label: "Actual Passengers",
          data: actualData,
          borderColor: "hsl(var(--primary))",
          backgroundColor: "hsl(var(--primary) / 0.1)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "hsl(var(--primary))",
        },
        {
          label: "Predicted Passengers",
          data: predictedData,
          borderColor: "hsl(var(--primary) / 0.5)",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.3,
          pointRadius: 0,
        },
        {
          label: "Future Forecast",
          data: futureData,
          borderColor: "hsl(var(--destructive))",
          backgroundColor: "hsl(var(--destructive) / 0.1)",
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "hsl(var(--destructive))",
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
          beginAtZero: true,
          grid: {
            color: "hsl(var(--border) / 0.2)",
          },
          ticks: {
            callback: (value) => value.toString(),
          },
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10,
          },
        },
        tooltip: {
          enabled: true,
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
  }, [predictionRun, dateRange])

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

