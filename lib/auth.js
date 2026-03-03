import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin",
            credentials: {
                password: { label: "Şifre", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.password) return null;

                if (credentials.password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin", role: "admin" };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
