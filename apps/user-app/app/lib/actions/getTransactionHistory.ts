"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function getTransactionHistory() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      error: "User not authenticated",
    };
  }

  try {
    const transactions = await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: Number(session?.user?.id),
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 10,
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return { error: "Failed to fetch transactions" };
  }
}
