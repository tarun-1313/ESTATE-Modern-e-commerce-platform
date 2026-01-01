"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Send, User, Bot, Mic, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useChat } from "ai/react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

export function AIAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    error: chatError,
    setInput,
  } = useChat({
    initialMessages: [
      {
        id: "initial",
        role: "assistant",
        content:
          "Hello! I'm your AI shopping architect. I can help you find products like our new **Modern Cotton Kurta** or the exquisite **Temple Jewellery Set**. What's on your mind today?",
      },
    ],
  })

  const handleQuickAction = (text: string) => {
    append({
      role: "user",
      content: text,
    })
  }

  const allMessages = messages

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [allMessages, isOpen])

  if (!isOpen) return null

  const isSubmitDisabled = !input || input.trim().length === 0 || isLoading

  return (
    <>
      <div
        className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-70 h-full w-full max-w-md border-l bg-linear-to-b from-white to-neutral-50 dark:from-black dark:to-neutral-950 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between border-b p-4 bg-neutral-50 dark:bg-neutral-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Shopping Architect</h2>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Online | Context-Aware AI
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 pb-4">
            {chatError && (
              <div className="mx-auto max-w-xs rounded-lg bg-destructive/10 p-3 text-center text-xs text-destructive">
                Failed to connect. Please check your internet connection or try again.
              </div>
            )}
            {allMessages.map((m: any) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "")}>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn("flex flex-col gap-2 max-w-[85%]", m.role === "user" ? "items-end" : "")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm shadow-md leading-relaxed prose dark:prose-invert max-w-none",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground font-medium"
                        : "bg-white dark:bg-neutral-900 text-foreground border border-neutral-200 dark:border-neutral-800",
                    )}
                  >
                    <ReactMarkdown
                      components={{
                        img: ({ node, ...props }) => (
                          <img
                            {...props}
                            className="rounded-lg border border-neutral-200 dark:border-neutral-800 my-2 max-h-48 w-full object-cover"
                          />
                        ),
                        p: ({ node, ...props }) => <p {...props} className="mb-0 last:mb-0" />,
                      }}
                    >
                      {m.content || (m.parts && m.parts.map((p: any) => p.text).join(""))}
                    </ReactMarkdown>
                  </div>
                  {m.role === "assistant" && m.id !== "initial" && (
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-muted bg-background">
                        <ShoppingBag className="h-3 w-3 mr-1" />
                        Show Products
                      </Badge>
                      <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-muted bg-background">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Compare Items
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-4 py-2.5 h-10 shadow-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            {chatError && (
              <div className="flex gap-3 text-destructive">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-destructive bg-destructive/10">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 bg-destructive/10 border border-destructive/20 rounded-2xl px-4 py-2.5 text-xs shadow-sm">
                  {chatError.message || "An error occurred. Please try again."}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-white dark:bg-neutral-900 space-y-3 shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px] rounded-full px-3 whitespace-nowrap bg-transparent"
              onClick={() => handleQuickAction("Show me the Modern Cotton Kurta")}
            >
              Modern Kurta
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px] rounded-full px-3 whitespace-nowrap bg-transparent"
              onClick={() => handleQuickAction("Show me the Temple Jewellery Set")}
            >
              Temple Jewellery
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px] rounded-full px-3 whitespace-nowrap bg-transparent"
              onClick={() => handleQuickAction("Show me Silver Filigree Earrings")}
            >
              Silver Earrings
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-[10px] rounded-full px-3 whitespace-nowrap bg-transparent"
              onClick={() => handleQuickAction("Tell me about the Brass Puja Thali Set")}
            >
              Puja Thali
            </Button>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
            className="relative flex items-center"
          >
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask your assistant..."
              className="pr-20 h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
              autoFocus
            />
            <div className="absolute right-2 flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                type="button"
                className="h-8 w-8 text-muted-foreground rounded-lg hover:bg-muted"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" type="submit" className="h-8 w-8 rounded-lg" disabled={isSubmitDisabled}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Powered Conversational Commerce | Next-Gen Shopping
          </p>
        </div>
      </div>
    </>
  )
}
