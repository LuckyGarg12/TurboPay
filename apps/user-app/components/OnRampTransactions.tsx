import { $Enums } from "@repo/db/prisma";
import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({transactions}:{
    transactions:{
        id:string,
        time:Date,
        amount:number,
        status:$Enums.OnRampStatus,
        provider:string
    }[]
}) => {
    if(!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        )
    }

    return(
        <Card title="Recent Transactions">
            <div className="pt-1">
                {transactions.map(t => {
                        return (
                            <div key={t.id} className="flex justify-between border-b border-slate-200 py-1">
                                <div>
                                    <div className="text-sm">
                                        {t.provider}
                                    </div>
                                    <div className={"text-xs " + (t.status === "Failure" ? "text-red-600" : t.status === "Success" ? "text-green-600" : "text-yellow-600")}>
                                        Status: {t.status}
                                    </div>
                                    <div className="text-slate-600 text-xs">
                                        {t.time.toDateString()}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    + Rs. {t.amount/100}
                                </div>
                            </div>
                            )
                        }
                    )
                }
            </div>
        </Card>
    )
}