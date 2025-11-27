"use client"

import * as React from "react"
import { Sidebar } from "@/components/chat/sidebar"
import { ChatInput } from "@/components/chat/chat-input"
import { MessageList } from "@/components/chat/message-list"
import { Suggestions } from "@/components/chat/suggestions"
import { TopBar } from "@/components/chat/top-bar"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import type { Message } from "@/lib/types"
import { mockConversation, mockConversationAlternative } from "@/lib/mock-data"

export default function ChatPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const isMobile = useIsMobile()

  const handleNewChat = () => {
    setMessages([])
    setActiveChatId(null)
    setIsMobileMenuOpen(false)
  }

  const handleHistorySelect = (id: string) => {
    setActiveChatId(id)
    // Simulate loading a different conversation based on ID
    // For demo purposes, we toggle between two mock conversations
    if (id === "2") {
      setMessages(mockConversationAlternative)
    } else {
      setMessages(mockConversation)
    }
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const handleSend = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    const responseText =
      "Based on the Arcutis HR policies, I can help you with that. The remote work policy allows for flexible arrangements with manager approval. Employees are expected to maintain core hours between 10 AM and 3 PM. For leave balances, you accrue 1.67 days per month, totaling 20 days annually. Please refer to the Employee Handbook for more specific details regarding holidays and sick leave."

    // Add empty bot message first
    const botMessageId = (Date.now() + 1).toString()
    setMessages((prev) => [
      ...prev,
      {
        id: botMessageId,
        role: "assistant",
        content: "",
      },
    ])

    // Stream the text
    let i = 0
    const interval = setInterval(() => {
      if (i < responseText.length) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMessageId ? { ...msg, content: responseText.substring(0, i + 1) } : msg)),
        )
        i++
      } else {
        clearInterval(interval)
        setIsLoading(false)

        // Add citations after streaming is complete
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  citations: [
                    {
                      id: "1",
                      index: 1,
                      title: "Remote Work Policy",
                      source: "Employee Handbook",
                      snippet: "Employees may work remotely with manager approval...",
                      url: "#",
                      imageUrl: "/home-office-setup.png",
                    },
                    {
                      id: "2",
                      index: 2,
                      title: "Leave Policy 2024",
                      source: "Benefits Guide",
                      snippet: "Annual leave accrual rates and carry-over limits...",
                      url: "#",
                      imageUrl: "/clock-and-calendar.png",
                    },
                  ],
                  // Add citation markers to text
                  content: msg.content + " [1] [2]",
                }
              : msg,
          ),
        )
      }
    }, 30) // Adjust speed here
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onNewChat={handleNewChat}
          onSelectHistory={handleHistorySelect}
          activeChatId={activeChatId}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[300px]">
          <Sidebar
            isCollapsed={false}
            setIsCollapsed={() => {}}
            isMobile={true}
            className="w-full border-r-0"
            onNewChat={handleNewChat}
            onSelectHistory={handleHistorySelect}
            activeChatId={activeChatId}
          />
        </SheetContent>
      </Sheet>

      <main className="flex-1 flex flex-col h-full relative w-full">
        <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />

        <div className="flex-1 overflow-hidden flex flex-col relative">
          {messages.length === 0 ? (
            <Suggestions onSelect={handleSend} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isLoading} />
      </main>
    </div>
  )
}
