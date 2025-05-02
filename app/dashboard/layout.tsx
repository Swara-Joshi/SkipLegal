"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { MessageSquare, Upload, FileCheck, FileText, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    setIsMounted(true)
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  // Navigation items for the sidebar
  const navItems = [
    {
      title: "Chatbot",
      icon: MessageSquare,
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      title: "Document Upload",
      icon: Upload,
      href: "/dashboard/documents",
      isActive: pathname === "/dashboard/documents",
    },
    {
      title: "Case Status",
      icon: FileCheck,
      href: "/dashboard/case-status",
      isActive: pathname === "/dashboard/case-status",
    },
    {
      title: "Form Wizard",
      icon: FileText,
      href: "/dashboard/form-wizard",
      isActive: pathname === "/dashboard/form-wizard",
    },
  ]

  // Don't render anything until we've checked authentication
  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">SkipLegal</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <header className="border-b bg-background z-10">
            <div className="flex h-16 items-center px-4 md:px-6">
              <SidebarTrigger className="mr-2" />
              <div className="ml-auto flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User profile</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
