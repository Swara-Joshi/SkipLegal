"use client"

import type React from "react"

import { useState } from "react"
import { Clock, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for case status
const mockCases = [
  {
    id: "IOE0123456789",
    type: "I-485 Application to Register Permanent Residence",
    status: "in-progress",
    lastUpdated: "2025-04-15",
    timeline: [
      {
        date: "2025-04-15",
        status: "Case is being actively reviewed",
        description: "Your case is being actively reviewed. We will notify you if we need anything from you.",
      },
      {
        date: "2025-03-20",
        status: "Biometrics appointment completed",
        description: "We received your biometrics and are processing your case.",
      },
      {
        date: "2025-02-10",
        status: "Biometrics appointment scheduled",
        description: "We scheduled your biometrics appointment for March 20, 2025.",
      },
      {
        date: "2025-01-05",
        status: "Case received",
        description: "We received your Form I-485 and sent you a receipt notice.",
      },
    ],
  },
  {
    id: "IOE9876543210",
    type: "I-130 Petition for Alien Relative",
    status: "approved",
    lastUpdated: "2025-03-10",
    timeline: [
      {
        date: "2025-03-10",
        status: "Case approved",
        description: "We approved your Form I-130. We will mail you an approval notice.",
      },
      {
        date: "2025-02-15",
        status: "Case is being actively reviewed",
        description: "Your case is being actively reviewed. We will notify you if we need anything from you.",
      },
      {
        date: "2024-12-20",
        status: "Case received",
        description: "We received your Form I-130 and sent you a receipt notice.",
      },
    ],
  },
]

type Case = {
  id: string
  type: string
  status: "in-progress" | "approved" | "denied" | "rfe"
  lastUpdated: string
  timeline: {
    date: string
    status: string
    description: string
  }[]
}

export default function CaseStatusPage() {
  const [cases, setCases] = useState<Case[]>(mockCases)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      // In a real app, this would search for the case in a database
      // For this demo, we'll just show the existing cases
    }, 1000)
  }

  const getStatusIcon = (status: Case["status"]) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "denied":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "rfe":
        return <HelpCircle className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusText = (status: Case["status"]) => {
    switch (status) {
      case "in-progress":
        return "In Progress"
      case "approved":
        return "Approved"
      case "denied":
        return "Denied"
      case "rfe":
        return "RFE Issued"
      default:
        return status
    }
  }

  const getStatusColor = (status: Case["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "denied":
        return "bg-red-100 text-red-800"
      case "rfe":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Case Status Tracker</CardTitle>
          <CardDescription>Track the status of your immigration cases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter receipt number (e.g., IOE0123456789)"
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>

          {/* Case list */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4 mt-4">
              {cases.map((caseItem) => (
                <div key={caseItem.id} className="rounded-lg border p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(caseItem.status)}
                        <h3 className="font-medium">{caseItem.type}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Receipt Number: {caseItem.id}</p>
                    </div>
                    <Badge className={getStatusColor(caseItem.status)}>{getStatusText(caseItem.status)}</Badge>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Case Timeline</h4>
                    <div className="space-y-3">
                      {caseItem.timeline.map((event, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <div
                                className={
                                  index === 0
                                    ? "h-2 w-2 rounded-full bg-background"
                                    : "h-2 w-2 rounded-full bg-primary-foreground"
                                }
                              />
                            </div>
                            {index < caseItem.timeline.length - 1 && <div className="h-full w-px bg-border" />}
                          </div>
                          <div className="pb-6">
                            <p className="text-sm font-medium">{event.status}</p>
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                            <p className="mt-1 text-sm">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="active" className="space-y-4 mt-4">
              {cases
                .filter((c) => c.status === "in-progress" || c.status === "rfe")
                .map((caseItem) => (
                  <div key={caseItem.id} className="rounded-lg border p-4 space-y-4">
                    {/* Same content as above */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(caseItem.status)}
                          <h3 className="font-medium">{caseItem.type}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Receipt Number: {caseItem.id}</p>
                      </div>
                      <Badge className={getStatusColor(caseItem.status)}>{getStatusText(caseItem.status)}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Case Timeline</h4>
                      <div className="space-y-3">
                        {caseItem.timeline.map((event, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                <div
                                  className={
                                    index === 0
                                      ? "h-2 w-2 rounded-full bg-background"
                                      : "h-2 w-2 rounded-full bg-primary-foreground"
                                  }
                                />
                              </div>
                              {index < caseItem.timeline.length - 1 && <div className="h-full w-px bg-border" />}
                            </div>
                            <div className="pb-6">
                              <p className="text-sm font-medium">{event.status}</p>
                              <p className="text-xs text-muted-foreground">{event.date}</p>
                              <p className="mt-1 text-sm">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-4">
              {cases
                .filter((c) => c.status === "approved" || c.status === "denied")
                .map((caseItem) => (
                  <div key={caseItem.id} className="rounded-lg border p-4 space-y-4">
                    {/* Same content as above */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(caseItem.status)}
                          <h3 className="font-medium">{caseItem.type}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Receipt Number: {caseItem.id}</p>
                      </div>
                      <Badge className={getStatusColor(caseItem.status)}>{getStatusText(caseItem.status)}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Case Timeline</h4>
                      <div className="space-y-3">
                        {caseItem.timeline.map((event, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                                <div
                                  className={
                                    index === 0
                                      ? "h-2 w-2 rounded-full bg-background"
                                      : "h-2 w-2 rounded-full bg-primary-foreground"
                                  }
                                />
                              </div>
                              {index < caseItem.timeline.length - 1 && <div className="h-full w-px bg-border" />}
                            </div>
                            <div className="pb-6">
                              <p className="text-sm font-medium">{event.status}</p>
                              <p className="text-xs text-muted-foreground">{event.date}</p>
                              <p className="mt-1 text-sm">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
