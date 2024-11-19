import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Lock, CreditCard } from "lucide-react"

export default function BalanceCard({ amount, locked }: { amount: number; locked: number }) {
  const formatAmount = (value: number) => (value / 100).toFixed(2)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center text-[rgb(106,81,166)]">
          <Wallet className="mr-2 h-6 w-6 " /> Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center text-sm font-medium">
            <CreditCard className="mr-2 h-4 w-4" /> Unlocked Balance
          </div>
          <div className="text-lg font-bold">{formatAmount(amount)} INR</div>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <div className="flex items-center text-sm font-medium">
            <Lock className="mr-2 h-4 w-4" /> Total Locked Balance
          </div>
          <div className="text-lg font-bold">{formatAmount(locked)} INR</div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="text-sm font-medium">Total Balance</div>
          <div className="text-xl font-bold text-primary">{formatAmount(amount + locked)} INR</div>
        </div>
      </CardContent>
    </Card>
  )
}