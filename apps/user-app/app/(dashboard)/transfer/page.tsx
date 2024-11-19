import prisma from "@repo/db/client";
import AddMoney from "@/components/AddMoneyCard";
import BalanceCard from "@/components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function () {
  const balance = await getBalance();

  return (
    <div className="w-screen ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-10">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
      </div>
    </div>
  );
}
