"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function createOnRampTransaction({amount, provider}:{amount:number, provider:string}) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session?.user.userId;

    if (!userId) {
        return {
            error: "User not authenticated"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: userId,
            amount: amount,
            provider: provider,
            startTime: new Date(),
            status: "Processing",
            token: token
        }
    });

    return {
        message: "On-ramp transaction created successfully"
    };
}