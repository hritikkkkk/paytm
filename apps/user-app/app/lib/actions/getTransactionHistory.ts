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
    const transactions = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        sentTransfers: {
          include: { toUser: { select: { id: true, name: true } } },
        },
        receivedTransfers: {
          include: { fromUser: { select: { id: true, name: true } } },
        },
      },
    });

   

    if (!transactions) {
      return { error: "No transactions found." };
    }

    
    const formattedTransactions = [
      ...transactions.sentTransfers.map((t) => ({
        ...t,
        type: "sent",
      })),
      ...transactions.receivedTransfers.map((t) => ({
        ...t,
        type: "received",
      })),
    ];

    
    formattedTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return formattedTransactions;
    
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return { error: "Failed to fetch transactions." };
  }
}
