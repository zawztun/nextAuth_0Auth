// import NextAuth from "next-auth";

// import GitHubProvider from "next-auth/providers/github";

// export default NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//   ],
// });

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
const github_id = process.env.GITHUB_ID as string;
const github_secret = process.env.GITHUB_SECRET as string;

export const authOptions = {
  //adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: github_id,
      clientSecret: github_secret,

      profile(profile: any) {
        let github_data = {
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          id: profile.id,
        };

        return github_data;
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      // valid user
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      // user roles
      if (user) {
        token.id = user.id;
        token.role = "admin";
        token.jwt = "laiejfoweijfpwoiefjpowijefoj";
      }

      return token;
    },
    async session({ session, token, user }: any) {
      const sess: any = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          jwt: token.jwt as string,
        },
      };

      return sess;
    },
  },
};

export default NextAuth(authOptions);
