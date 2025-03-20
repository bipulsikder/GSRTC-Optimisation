"use client"

import { BarChart3, Bus, CreditCard, Home, Map, Settings, Ticket } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Demand Prediction",
    icon: BarChart3,
    href: "/demand-prediction",
  },
  {
    title: "Route Optimization",
    icon: Map,
    href: "/route-optimization",
  },
  {
    title: "Fare Estimator",
    icon: CreditCard,
    href: "/fare-estimator",
  },
  {
    title: "Ticket Forecaster",
    icon: Ticket,
    href: "/ticket-forecaster",
  },
  {
    title: "Predictive Maintenace",
    icon: Bus,
    href: "",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
<SidebarHeader className="flex items-center justify-center py-4">
  <div className="flex items-center gap-2">
    <img
      src="https://gsrtc.in/site/downloads/images/logo.png"
      alt="GSRTC Logo"
      className="h-35 w-35"
    />

  </div>
</SidebarHeader>

      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

