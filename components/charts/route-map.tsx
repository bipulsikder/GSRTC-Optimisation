"use client"

import { useEffect, useRef } from "react"

interface RouteMapProps {
  optimizationRun?: boolean
  route?: string
}

export function RouteMap({ optimizationRun = false, route = "ahmedabad-surat" }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This is a placeholder for an actual map implementation
    // In a real application, you would use a mapping library like Mapbox, Google Maps, or Leaflet
    const canvas = document.createElement("canvas")
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight
    mapRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw a simple map visualization
    const drawMap = () => {
      if (!ctx) return

      // Background
      ctx.fillStyle = "hsl(210, 40%, 96.1%)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw cities
      const cities = [
        { name: "Ahmedabad", x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { name: "Surat", x: canvas.width * 0.6, y: canvas.height * 0.7 },
        { name: "Baroda", x: canvas.width * 0.4, y: canvas.height * 0.5 },
        { name: "Rajkot", x: canvas.width * 0.8, y: canvas.height * 0.4 },
      ]

      // Draw current route
      ctx.beginPath()
      ctx.moveTo(cities[0].x, cities[0].y)
      ctx.lineTo(cities[1].x, cities[1].y)
      ctx.strokeStyle = "hsl(215, 100%, 50%)"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw optimized route (different based on optimization run)
      ctx.beginPath()
      ctx.moveTo(cities[0].x, cities[0].y)

      if (optimizationRun) {
        // More optimized route after running optimization
        const midX = (cities[0].x + cities[2].x) / 2 + 20
        const midY = (cities[0].y + cities[2].y) / 2 - 20
        ctx.quadraticCurveTo(midX, midY, cities[2].x, cities[2].y)
        ctx.lineTo(cities[1].x, cities[1].y)
      } else {
        // Default optimized route suggestion
        ctx.lineTo(cities[2].x, cities[2].y)
        ctx.lineTo(cities[1].x, cities[1].y)
      }

      ctx.strokeStyle = "hsl(var(--destructive))"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // Draw cities
      cities.forEach((city) => {
        ctx.beginPath()
        ctx.arc(city.x, city.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = "hsl(215, 100%, 50%)"
        ctx.fill()

        ctx.font = "14px sans-serif"
        ctx.fillStyle = "hsl(var(--foreground))"
        ctx.textAlign = "center"
        ctx.fillText(city.name, city.x, city.y - 15)
      })

      // Draw legend
      ctx.font = "14px sans-serif"
      ctx.fillStyle = "hsl(var(--foreground))"
      ctx.textAlign = "left"

      ctx.beginPath()
      ctx.moveTo(canvas.width - 150, 20)
      ctx.lineTo(canvas.width - 100, 20)
      ctx.strokeStyle = "hsl(215, 100%, 50%)"
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fillText("Current Route", canvas.width - 95, 25)

      ctx.beginPath()
      ctx.moveTo(canvas.width - 150, 45)
      ctx.lineTo(canvas.width - 100, 45)
      ctx.strokeStyle = "hsl(var(--destructive))"
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillText("Optimized Route", canvas.width - 95, 50)

      // Add optimization status
      if (optimizationRun) {
        ctx.font = "bold 16px sans-serif"
        ctx.fillStyle = "hsl(215, 100%, 50%)"
        ctx.textAlign = "left"
        ctx.fillText("✓ Optimization Applied", 20, 30)

        ctx.font = "14px sans-serif"
        ctx.fillStyle = "hsl(var(--foreground))"
        ctx.fillText(`Time saved: ${route === "ahmedabad-surat" ? "30" : "20"} minutes`, 20, 55)
        ctx.fillText(`Distance reduced: ${route === "ahmedabad-surat" ? "15" : "10"} km`, 20, 75)
      }
    }

    drawMap()

    return () => {
      if (mapRef.current && canvas.parentNode === mapRef.current) {
        mapRef.current.removeChild(canvas)
      }
    }
  }, [optimizationRun, route])

  return <div ref={mapRef} className="w-full h-full bg-muted/20 rounded-md"></div>
}

