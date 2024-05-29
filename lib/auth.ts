import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./prisma";

export const authConfig: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (profile?.email === undefined) {
                return false
            }
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: {
                        equals: profile?.email
                    }
                }
            })
            if (!dbUser) {
                let newUser = await prisma.user.create({
                    data: {
                        email: profile.email,
                        firstName: profile?.name ,
                        boins: 100
                    }
                })
                console.log("new user! ", newUser)
            } else {
                console.log(dbUser.email, "logged in")
            }
            return true
        }
    }
}