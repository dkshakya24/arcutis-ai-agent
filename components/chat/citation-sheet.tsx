"use client"

import * as React from "react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ExternalLink } from "lucide-react"
import type { Citation } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CitationSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  citations: Citation[]
  focusedIndex?: number | null
  onCitationClick?: (citation: Citation) => void
}

export function CitationSheet({ open, onOpenChange, citations, focusedIndex, onCitationClick }: CitationSheetProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  // Scroll to focused citation when sheet opens
  React.useEffect(() => {
    if (open && focusedIndex && scrollRef.current) {
      const element = document.getElementById(`citation-${focusedIndex}`)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 100)
      }
    }
  }, [open, focusedIndex])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-l">
        <SheetHeader className="px-6 py-4 border-b shrink-0">
          <SheetTitle>Citations</SheetTitle>
          <SheetDescription>References and sources for the generated response.</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 h-full" ref={scrollRef}>
          <div className="p-6 space-y-4 pb-10">
            {citations.map((citation) => (
              <Card
                key={citation.id}
                id={`citation-${citation.index}`}
                onClick={() => onCitationClick?.(citation)}
                className={cn(
                  "overflow-hidden transition-all duration-300 cursor-pointer group",
                  focusedIndex === citation.index
                    ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                    : "hover:shadow-lg hover:border-primary hover:scale-[1.01] hover:bg-accent/5",
                )}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Section */}
                  <div className="relative h-32 sm:h-auto sm:w-32 shrink-0 bg-muted">
                    <Image
                      src={citation.imageUrl || "/placeholder.svg?height=200&width=200"}
                      alt={citation.source}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {citation.source}
                        </span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          {citation.index}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {citation.title}
                      </h4>
                      {citation.snippet && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{citation.snippet}</p>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={citation.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline z-10"
                      >
                        Read source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
