"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User, BookOpen, Download } from "lucide-react"
import type { Message, Citation } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { CitationSheet } from "@/components/chat/citation-sheet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface MessageListProps {
  messages: Message[]
  isLoading?: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const [activeCitations, setActiveCitations] = React.useState<Citation[] | null>(null)
  const [focusedCitationIndex, setFocusedCitationIndex] = React.useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [selectedCitation, setSelectedCitation] = React.useState<Citation | null>(null)

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation)
  }

  const handleDownload = (citation: Citation) => {
    if (!citation.imageUrl) return

    const link = document.createElement("a")
    link.href = citation.imageUrl
    link.download = `${citation.title.replace(/\s+/g, "-").toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewSourcesClick = (citations: Citation[]) => {
    setActiveCitations(citations)
    setFocusedCitationIndex(null)
    setIsSheetOpen(true)
  }

  // Helper to parse text and replace [n] with clickable buttons
  const renderMessageContent = (content: string, citations?: Citation[]) => {
    if (!citations || citations.length === 0) return <div className="whitespace-pre-wrap">{content}</div>

    // Split by citation markers like [1], [2]
    const parts = content.split(/(\[\d+\])/g)

    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, i) => {
          const match = part.match(/^\[(\d+)\]$/)
          if (match) {
            const index = Number.parseInt(match[1])
            const citation = citations.find((c) => c.index === index)

            if (!citation) return <span key={i}>{part}</span>

            return (
              <HoverCard key={i} openDelay={200}>
                <HoverCardTrigger asChild>
                  <button
                    onClick={() => handleCitationClick(citation)}
                    className="inline-flex items-center justify-center mx-0.5 -translate-y-0.5 h-4 w-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all cursor-pointer align-middle"
                  >
                    {index}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0" align="start">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex gap-3">
                        {citation.imageUrl && (
                          <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={citation.imageUrl || "/placeholder.svg"}
                              alt={citation.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider">
                              {citation.source}
                            </span>
                          </div>
                          <h4 className="text-sm font-semibold leading-tight line-clamp-2 mb-1">{citation.title}</h4>
                        </div>
                      </div>
                      {citation.snippet && (
                        <p className="text-xs text-muted-foreground line-clamp-3 bg-muted/30 p-2 rounded-md">
                          "{citation.snippet}"
                        </p>
                      )}
                      <div className="text-[10px] text-muted-foreground text-right italic">
                        Click to view full details
                      </div>
                    </CardContent>
                  </Card>
                </HoverCardContent>
              </HoverCard>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4 md:space-y-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full max-w-3xl mx-auto gap-2 md:gap-4",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="h-6 w-6 md:h-8 md:w-8 border bg-background shrink-0 mt-1">
                <AvatarImage src="/bot-avatar.png" />
                <AvatarFallback>
                  <Bot className="h-3 w-3 md:h-4 md:w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "flex flex-col gap-1 md:gap-2 max-w-[95%] md:max-w-[85%]",
                message.role === "user" && "items-end",
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-3 py-2.5 md:px-5 md:py-3.5 text-sm leading-relaxed shadow-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white dark:bg-muted border text-foreground",
                )}
              >
                {renderMessageContent(message.content, message.citations)}
              </div>

              {/* View Sources Button */}
              {message.citations && message.citations.length > 0 && (
                <div className="mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-xs font-medium rounded-full bg-background/50 hover:bg-background border-muted-foreground/20 h-7 md:h-9"
                    onClick={() => handleViewSourcesClick(message.citations!)}
                  >
                    <BookOpen className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    View {message.citations.length} Sources
                  </Button>
                </div>
              )}
            </div>

            {message.role === "user" && (
              <Avatar className="h-6 w-6 md:h-8 md:w-8 border bg-background shrink-0 mt-1">
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback>
                  <User className="h-3 w-3 md:h-4 md:w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex w-full max-w-3xl mx-auto gap-2 md:gap-4">
            <Avatar className="h-6 w-6 md:h-8 md:w-8 border bg-background mt-1">
              <AvatarFallback>
                <Bot className="h-3 w-3 md:h-4 md:w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-1">
              <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* Global Citation Sheet */}
      {activeCitations && (
        <CitationSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          citations={activeCitations}
          focusedIndex={focusedCitationIndex}
          onCitationClick={handleCitationClick}
        />
      )}

      {/* Single Citation Modal */}
      <Dialog open={!!selectedCitation} onOpenChange={(open) => !open && setSelectedCitation(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCitation?.title}</DialogTitle>
            <DialogDescription>Source: {selectedCitation?.source}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {selectedCitation?.imageUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                <Image
                  src={selectedCitation.imageUrl || "/placeholder.svg"}
                  alt={selectedCitation.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="bg-muted/30 p-4 rounded-lg border">
              <h4 className="text-sm font-semibold mb-2">Excerpt</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">"{selectedCitation?.snippet}"</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => selectedCitation && handleDownload(selectedCitation)}
              className="gap-2 w-full sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
