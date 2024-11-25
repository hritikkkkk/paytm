"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { getTransactionHistory } from "@/app/lib/actions/getTransactionHistory";

type Transaction = {
  id: number;
  amount: number;
  timestamp: string;
  fromUserId: number;
  toUserId: number;
  fromUser: {
    id: number;
    name: string;
  };
  toUser: {
    id: number;
    name: string;
  };
};

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactionHistory();
        if ("error" in result) {
          setError(result.error);
        } else {
          setTransactions(result as unknown as Transaction[]);
        }
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="shadow-sm border">
          <CardHeader>
            <CardTitle className="text-lg">
              {transaction.fromUserId === transaction.toUserId
                ? "Self-Transfer"
                : transaction.fromUserId === transaction.fromUser.id
                  ? `Sent to ${transaction.toUser.name}`
                  : `Received from ${transaction.fromUser.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">Amount:</span>
                <span className="font-bold text-green-500 ml-2">
                  {`₹${(transaction.amount / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                {new Date(transaction.timestamp).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
