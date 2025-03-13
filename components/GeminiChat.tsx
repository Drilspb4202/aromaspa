'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function DeepSeekChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.result }])

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="h-[400px] overflow-y-auto space-y-4 p-4 rounded-lg border border-gray-200">
        {messages.map((message, i) => (
          <Card key={i} className={`p-4 ${
            message.role === 'assistant' 
              ? 'bg-purple-900/30 border-fuchsia-500/30' 
              : 'bg-fuchsia-600/30 border-purple-500/30'
          }`}>
            <p className="text-white">{message.content}</p>
          </Card>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-fuchsia-500" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Задайте вопрос..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? "Думаю..." : "Отправить"}
        </Button>
      </form>
    </div>
  )
}

