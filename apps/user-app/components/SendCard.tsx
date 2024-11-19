"use client"

import { useState } from "react"
import { ArrowRight, Phone, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { p2pTransfer } from "@/app/lib/p2pTransfer"

export default function SendCard() {
  const [number, setNumber] = useState("")
  const [amount, setAmount] = useState("")

  const handleSend = async () => {
    await p2pTransfer(number, Number(amount) * 100)
  }

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Send Money</CardTitle>
          <CardDescription>Transfer funds to another account instantly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Recipient's Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="number"
                placeholder="Enter phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-lg" onClick={handleSend}>
            Send Money <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}