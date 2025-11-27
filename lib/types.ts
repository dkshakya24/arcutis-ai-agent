export interface Citation {
  id: string
  index: number
  title: string
  url?: string
  source: string
  snippet?: string
  imageUrl?: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  citations?: Citation[]
}

export interface ChatHistory {
  id: string
  title: string
  date: string
}
