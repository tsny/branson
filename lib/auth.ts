import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { createNewDBUser, findUserByEmail } from "@/app/actions";
import { revalidatePath } from "next/cache";

export const authConfig: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile?.email === undefined || profile?.name === undefined) {
        return false;
      }
      const dbUser = await findUserByEmail(profile.email);
      if (!dbUser) {
        await createNewDBUser(profile.email, profile?.name, profile?.image);
        revalidatePath("/");
      } else {
        console.log(dbUser.email, "logged in");
      }
      return true;
    },

    async session({ session, token }) {
      if (session?.user?.email) {
        let dbUser = await findUserByEmail(session.user?.email);
        if (!dbUser && session.user.name) {
          console.log("google user is logged in but has no account!");
          await createNewDBUser(
            session.user.email,
            session.user.name,
            session?.user?.image
          );
        }
      }
      return session;
    },
  },
};
