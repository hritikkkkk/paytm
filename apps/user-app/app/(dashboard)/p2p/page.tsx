import SendCard from "@/components/SendCard";
import TransactionHistory from "@/components/transaction";

export default function () {
  return (
    <div className="w-full">
      <SendCard />
      <TransactionHistory />
    </div>
  );
}
