import {
  Chart as ChartJS,
  type ChartData as ChartJSData,
  type ChartOptions as ChartJSOptions,
  type ChartDataset as ChartJSDataset,
  type ChartTooltipItem as ChartJSTooltipItem,
  registerables,
} from "chart.js"

ChartJS.register(...registerables)

export type ChartData = ChartJSData<"bar" | "line" | "bubble", number[], string>
export type ChartOptions = ChartJSOptions<"bar" | "line" | "bubble">
export type ChartDataset = ChartJSDataset<"bar" | "line" | "bubble", number[]>
export type ChartTooltipItem = ChartJSTooltipItem<"bar" | "line" | "bubble">

export { ChartJS as Chart }

