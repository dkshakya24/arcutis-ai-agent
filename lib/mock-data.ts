import type { ChatHistory, Message } from "./types"

export const mockHistory: ChatHistory[] = [
  { id: "1", title: "Remote Work Policy 2024", date: "Today" },
  { id: "2", title: "Holiday Leave Balance", date: "Yesterday" },
  { id: "3", title: "Health Insurance Benefits", date: "Previous 7 Days" },
  { id: "4", title: "Code of Conduct Inquiry", date: "Previous 7 Days" },
  { id: "5", title: "Expense Reimbursement", date: "Previous 30 Days" },
  { id: "6", title: "Parental Leave Guidelines", date: "Previous 30 Days" },
  { id: "7", title: "Performance Review Process", date: "Previous 30 Days" },
  { id: "8", title: "IT Security Protocols", date: "Previous 30 Days" },
  { id: "9", title: "Travel Policy Update", date: "Previous 30 Days" },
  { id: "10", title: "Employee Referral Program", date: "Previous 30 Days" },
]

export const mockConversation: Message[] = [
  {
    id: "1",
    role: "user",
    content: "What is the current policy regarding remote work and flexible hours?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "According to the 2024 Employee Handbook, the company supports a hybrid work model. Employees are permitted to work remotely up to two days per week, subject to manager approval and team requirements [1].\n\nCore business hours are defined as 10:00 AM to 3:00 PM. During these hours, all employees, whether remote or on-site, are expected to be available for meetings and collaboration. Flexible scheduling is allowed outside of these core hours to accommodate personal needs, provided that the total weekly working hours are met [2].\n\nFor fully remote positions, specific guidelines apply regarding home office setup and data security protocols. Employees must ensure they have a dedicated workspace that meets ergonomic and privacy standards [3].",
    citations: [
      {
        id: "c1",
        index: 1,
        title: "Hybrid Work Guidelines 2024",
        source: "Employee Handbook",
        url: "#",
        snippet: "Employees may work remotely up to two days per week with manager approval...",
        imageUrl: "/office-document.jpg",
      },
      {
        id: "c2",
        index: 2,
        title: "Flexible Working Hours Policy",
        source: "HR Policy Doc",
        url: "#",
        snippet: "Core hours are 10am-3pm. Flexible scheduling allowed outside these times...",
        imageUrl: "/clock-and-calendar.png",
      },
      {
        id: "c3",
        index: 3,
        title: "Remote Office Standards",
        source: "IT Security & Safety",
        url: "#",
        snippet: "Remote workspaces must meet ergonomic and data security standards...",
        imageUrl: "/home-office-setup.png",
      },
    ],
  },
]

export const mockConversationAlternative: Message[] = [
  {
    id: "1",
    role: "user",
    content: "How many days of annual leave do I get?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Full-time employees accrue 20 days of annual leave per year. This is calculated at a rate of 1.67 days per month [1].\n\nUnused leave can be carried over to the next calendar year, up to a maximum of 5 days. Any leave in excess of this amount must be used by December 31st or it will be forfeited [2].",
    citations: [
      {
        id: "c4",
        index: 1,
        title: "Annual Leave Entitlement",
        source: "Benefits Guide",
        url: "#",
        snippet: "Full-time employees accrue 20 days of annual leave per year...",
        imageUrl: "/clock-and-calendar.png",
      },
      {
        id: "c5",
        index: 2,
        title: "Leave Carry-Over Policy",
        source: "Employee Handbook",
        url: "#",
        snippet: "Maximum of 5 days can be carried over to the next calendar year...",
        imageUrl: "/office-document.jpg",
      },
    ],
  },
]
