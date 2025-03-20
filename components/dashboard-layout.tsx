"use client"

import type { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <SidebarInset className="p-6 overflow-auto">{children}</SidebarInset>
    </div>
  )
}

