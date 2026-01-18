"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function p2pTransfer(recipientNumber: string, amount: number) {
    const session = await getServerSession(authOptions);
    const sender = session?.user.userId;
    if (!sender) {
        return {
            message: "User not authenticated"
        }
    }

    const receiver = await prisma.user.findFirst({
        where: {
            number: recipientNumber
        }
    });

    if (!receiver) {
        return {
            message: "Recipient not found"
        }
    }

    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "balance" WHERE "userId" = ${sender} OR "userId" = ${receiver.id} FOR UPDATE`;        
        const fromBalance = await tx.balance.findFirst({
            where: {
                userId: sender
            }
        })
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient balance");
        }

        await tx.balance.update({
            where: { userId: sender },
            data: { amount: { decrement: amount} }
        });
        
        await tx.balance.update({
            where: { userId: receiver.id },
            data: { amount: { increment: amount} }
        });

        await tx.p2pTransaction.create({
            data: {
                senderId: sender,
                receiverId: receiver.id,
                amount: amount
            }
        });
    });

}