import prisma from "@repo/db/client";
import expreess from "express";

const app = expreess()
app.use(expreess.json())

interface PaymentInformation {
    token:string,
    userId:string,
    amount:number
}

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: PaymentInformation = {
        token:req.body.token,
        userId:req.body.userId,
        amount:Number(req.body.amount)
    }
    
    try {
        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId:paymentInformation.userId
                },
                data:{
                    amount: {
                        increment: paymentInformation.amount
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token:paymentInformation.token
                },
                data: {
                    status:"Success"
                }
            })
        ])

        res.json({
            "message":"Captured"
        })
        
    } catch(e) {
        console.log(e)
        res.status(411).json({
            "message":"Error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("Server running at http://localhost:3003")
})