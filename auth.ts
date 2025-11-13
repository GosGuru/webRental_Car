import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

interface ExtendedUser {
  id: string
  email: string | null
  name: string | null
  role: string
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password) {
          throw new Error("Credenciales inválidas")
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Credenciales inválidas")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as ExtendedUser).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Si la URL es relativa, úsala directamente
      if (url.startsWith("/")) {
        // Si el usuario se está logueando, redirigir al admin
        if (url === "/" || url === baseUrl) {
          return `${baseUrl}/admin`
        }
        return url
      }
      // Si la URL es la misma que baseUrl, redirigir al admin
      if (url === baseUrl) {
        return `${baseUrl}/admin`
      }
      // Si la URL es del mismo origen, permitirla
      if (url.startsWith(baseUrl)) {
        return url
      }
      // Por defecto, redirigir al admin
      return `${baseUrl}/admin`
    },
  },
})
