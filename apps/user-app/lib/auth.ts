import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";
import prisma from "@repo/db/client";

export const authOptions = {
    providers:[
        Credentials({
            name:"Phone number",
            credentials:{
                phone: {label:"Phone number", type:"text", placeholder:"Phone Number", required:true},
                password: {label:"Password", placeholder:"Password", type:"password", required:true}
            },
            async authorize (credentials, req) {
                credentials = credentials as Record<"phone" | "password", string>
                const hashedPassword = await argon2.hash(credentials.password)
                const existingUser = await prisma.user.findFirst({
                    where: {
                        number:credentials.phone
                    }
                })

                if (existingUser) {
                    const passwordValidation = await argon2.verify(existingUser.password, credentials.password)
                    if (passwordValidation) {
                        return {
                            id:existingUser.id,
                            name:existingUser.name,
                            phone:existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const user = await prisma.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    });

                    return {
                        id:user.id,
                        name:user.name,
                        phone:user.number
                    }
                }
                catch (e) {
                    console.log(e)
                }

                return null;
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({session, token, user}:{session:Session,token:JWT,user:User}) => {
            session.user.userId = token.sub || ""

            return session
        }
    }
}