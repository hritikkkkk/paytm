import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, Clock, Loader2, XCircle } from "lucide-react";

interface Transaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

export default function OnRampTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const formatAmount = (value: number) => (value / 100).toFixed(2);

  if (!transactions.length) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No recent transactions
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((t, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <div className="flex items-center">
              {t.status === "Processing" && (
                <Loader2 className="mr-3 h-5 w-5 text-yellow-500 animate-spin" />
              )}
              {t.status === "Success" && (
                <ArrowDownRight className="mr-3 h-5 w-5 text-green-500" />
              )}
              {t.status === "Failure" && (
                <XCircle className="mr-3 h-5 w-5 text-red-500" />
              )}

              <div>
                <div className="font-medium">
                  {t.status === "Success" && "Received INR"}
                  {t.status === "Failure" && "Failed "}
                  {t.status === "Processing" && "Processing"}
                </div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {t.time.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div
              className={`text-lg font-bold ${
                t.status === "Success"
                  ? "text-green-500"
                  : t.status === "Failure"
                    ? "text-red-500"
                    : "text-zinc-500"
              }`}
            >
              {t.status === "Processing"
                ? `₹${formatAmount(t.amount)}`
                : `+ ₹${formatAmount(t.amount)}`}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
