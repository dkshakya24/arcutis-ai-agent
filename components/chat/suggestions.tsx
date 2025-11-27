"use client"
import { Card } from "@/components/ui/card"
import { Lightbulb, Calendar, Heart, DollarSign } from "lucide-react"

interface SuggestionsProps {
  onSelect: (text: string) => void
}

const suggestions = [
  {
    icon: Lightbulb,
    title: "Remote work policy",
    description: "flexible hours and guidelines",
    prompt: "What is the remote work policy and flexible hours guidelines?",
  },
  {
    icon: Calendar,
    title: "Leave and vacation days",
    description: "accrual and carry-over rules",
    prompt: "How do leave and vacation days accrue and what are the carry-over rules?",
  },
  {
    icon: Heart,
    title: "Health insurance benefits",
    description: "plans and coverage options",
    prompt: "What health insurance benefits and coverage options are available?",
  },
  {
    icon: DollarSign,
    title: "Expense reimbursement",
    description: "policy and submission process",
    prompt: "What is the expense reimbursement policy and submission process?",
  },
]

export function Suggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">How can I help you today?</h1>
          <p className="text-muted-foreground">Choose a suggestion or type your own message.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.title}
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border-muted-foreground/20 shadow-sm hover:shadow-md"
              onClick={() => onSelect(suggestion.prompt)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <suggestion.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium leading-none">{suggestion.title}</h3>
                  <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
