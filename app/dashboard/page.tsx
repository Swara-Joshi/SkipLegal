"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for chat history
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your SkipLegal assistant. How can I help with your immigration questions today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
]

// Mock data for previous conversations
const previousConversations = [
  {
    id: "conv-1",
    title: "Green Card Application",
    date: "May 1, 2025",
    preview: "I need help with my green card application...",
    messages: [
      {
        id: 101,
        role: "user",
        content: "I need help with my green card application. What documents do I need for a family-based petition?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        id: 102,
        role: "assistant",
        content:
          "For a family-based green card petition, you'll need to submit Form I-130 (Petition for Alien Relative) along with supporting documents such as birth certificates, marriage certificates, and proof of your relationship. The specific requirements depend on your relationship with the petitioner. Would you like me to provide more details about a specific category?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60).toISOString(),
      },
      {
        id: 103,
        role: "user",
        content: "Yes, I'm applying through my spouse who is a U.S. citizen. What specific documents do we need?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5).toISOString(),
      },
      {
        id: 104,
        role: "assistant",
        content:
          "For a spouse-based petition where your spouse is a U.S. citizen, you'll need:\n\n1. Form I-130 and I-130A\n2. Filing fee payment\n3. Proof of your spouse's U.S. citizenship (passport, birth certificate, or naturalization certificate)\n4. Marriage certificate\n5. Proof that any previous marriages were legally terminated (divorce decrees or death certificates)\n6. Passport-style photos of both you and your spouse\n7. Evidence of bona fide marriage (joint bank accounts, lease agreements, photos together, etc.)\n8. If you're already in the U.S., you may file Form I-485 concurrently\n\nWould you like information about the I-485 process as well?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 6).toISOString(),
      },
    ],
  },
  {
    id: "conv-2",
    title: "Visa Extension Question",
    date: "April 28, 2025",
    preview: "My H-1B visa is expiring soon...",
    messages: [
      {
        id: 201,
        role: "user",
        content: "My H-1B visa is expiring soon. How do I apply for an extension?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
      },
      {
        id: 202,
        role: "assistant",
        content:
          "To extend your H-1B visa, your employer needs to file Form I-129 (Petition for Nonimmigrant Worker) with USCIS. This should be filed before your current H-1B status expires, ideally at least 6 months before expiration. The extension can be requested for up to 3 years, not exceeding the 6-year maximum stay on H-1B status. Would you like more specific information about the process?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000 * 60).toISOString(),
      },
    ],
  },
  {
    id: "conv-3",
    title: "Citizenship Requirements",
    date: "April 25, 2025",
    preview: "What are the requirements for U.S. citizenship?",
    messages: [
      {
        id: 301,
        role: "user",
        content: "What are the requirements for U.S. citizenship?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
      },
      {
        id: 302,
        role: "assistant",
        content:
          "To be eligible for U.S. citizenship through naturalization, you generally need to:\n\n1. Be a permanent resident (green card holder) for at least 5 years (or 3 years if married to a U.S. citizen)\n2. Be at least 18 years old\n3. Demonstrate continuous residence in the U.S.\n4. Show physical presence in the U.S. for at least half of the required period\n5. Live in the state where you apply for at least 3 months\n6. Demonstrate good moral character\n7. Pass an English language test (reading, writing, speaking)\n8. Pass a civics test about U.S. history and government\n9. Pledge allegiance to the U.S.\n\nThere are exceptions and special provisions for certain groups. Would you like more information about any specific requirement?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8 + 1000 * 60).toISOString(),
      },
      {
        id: 303,
        role: "user",
        content: "What does 'continuous residence' mean exactly?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8 + 1000 * 60 * 5).toISOString(),
      },
      {
        id: 304,
        role: "assistant",
        content:
          "'Continuous residence' means that you have maintained your permanent home in the United States without leaving for extended periods. Specifically:\n\n- You should not have been outside the U.S. for more than 6 months at a time during the required period (5 years or 3 years)\n- Trips longer than 6 months but less than 1 year may disrupt continuous residence unless you can provide evidence that you maintained ties to the U.S. and intended to return\n- Trips of 1 year or longer will generally break continuous residence unless you qualify for certain exceptions (like working for the U.S. government abroad)\n\nIf your continuous residence is broken, you typically need to wait until you have established the full required period of continuous residence again before applying for citizenship.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8 + 1000 * 60 * 6).toISOString(),
      },
    ],
  },
]

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
}

type Conversation = {
  id: string
  title: string
  date: string
  preview: string
  messages: Message[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>(previousConversations)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're concerned about your immigration status. Based on what you've shared, you might be eligible for adjustment of status under section 245(i) of the Immigration and Nationality Act.",
        "For your green card application, you'll need to submit Form I-485 along with supporting documents like your birth certificate, passport, and evidence of your relationship with the petitioner.",
        "The processing time for family-based green cards currently ranges from 8-14 months, depending on your service center and category.",
        "For RFEs, it's important to respond comprehensively and within the deadline. Make sure to address each point specifically with supporting evidence.",
        "Your case appears to be in the normal processing timeline. USCIS is currently processing applications filed around the same time as yours.",
      ]

      // Select a random response
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const assistantMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleSelectConversation = (conversationId: string) => {
    const selected = conversations.find((conv) => conv.id === conversationId)
    if (selected) {
      setMessages(selected.messages)
      setActiveConversation(conversationId)
    }
  }

  const handleStartNewChat = () => {
    setMessages(initialMessages)
    setActiveConversation(null)
  }

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Chat History Sidebar */}
        <div className="md:col-span-1">
          <Card className="border shadow-sm h-[calc(100vh-150px)]">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Chat History</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-auto h-[calc(100%-120px)]">
              <div className="px-2 pb-2">
                <Button variant="outline" className="w-full justify-start mb-2" onClick={handleStartNewChat}>
                  <span className="mr-2">+</span> New Conversation
                </Button>
              </div>
              <div className="space-y-1 px-2">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                        activeConversation === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleSelectConversation(conversation.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-medium truncate">{conversation.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {conversation.date}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground truncate mt-1">{conversation.preview}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="md:col-span-2">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Immigration Assistant</CardTitle>
              <CardDescription>Ask questions about your immigration process and get instant answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[calc(100vh-300px)]">
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start max-w-[80%]">
                        {message.role === "assistant" && (
                          <Avatar className="mr-2 mt-0.5">
                            <AvatarFallback>SL</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="ml-2 mt-0.5">
                            <AvatarFallback>ME</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2 rounded-lg bg-muted px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">Typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
