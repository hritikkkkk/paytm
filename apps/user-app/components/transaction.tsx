'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { getTransactionHistory } from "@/app/lib/actions/getTransactionHistory"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Transaction = {
  id: number
  amount: number
  timestamp: string
  fromUserId: number
  toUserId: number
  fromUser?: {
    id: number
    name: string
  }
  toUser?: {
    id: number
    name: string
  }
  type: "sent" | "received"
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      try {
        const result = await getTransactionHistory()
        if ("error" in result) {
          setError(result.error)
        } else {
          setTransactions(result as unknown as Transaction[])
        }
      } catch (err) {
        setError("Failed to load transactions.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (transactions.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No transactions found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <CardTitle className="text-2xl font-bold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 ${
                index !== transactions.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                {transaction.type === "sent" ? (
                  <ArrowUpRight className="text-red-500 h-6 w-6" />
                ) : (
                  <ArrowDownLeft className="text-green-500 h-6 w-6" />
                )}
                <div>
                  <p className="font-semibold">
                    {transaction.type === "sent"
                      ? `Sent to ${transaction.toUser?.name}`
                      : `Received from ${transaction.fromUser?.name}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={transaction.type === "sent" ? "destructive" : "default"}>
                  ₹{(transaction.amount / 100).toFixed(2)}
                </Badge>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}


