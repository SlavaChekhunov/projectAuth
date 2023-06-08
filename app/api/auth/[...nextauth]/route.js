import { prisma } from '../../../../lib/prisma'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    pages: {
    signIn: '/login'
    },
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        //Handle Auth!
        //mocking a user, if we had a user and returned it
        //    const user = {id: '1', name: 'Slava', email: 'test@test.com'}
        //    return user
        if (!credentials?.email || !credentials.password) {
            return null
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })
  
          if (!user) {
            return null
          }
  
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          )
  
          if (!isPasswordValid) {
            return null
          }
  
          return {
            id: user.id + '',
            email: user.email,
            name: user.name,
            randomKey: 'Hey cool',
            role: user.role
          }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
        session.user.randomKey = token.randomKey
      }
      return session
    },
        jwt: ({ token, user }) => {
        console.log('JWT Callback', { token, user })
        if (user) {
        const u = user
        return {
        ...token,
        role: u.role,
        id: u.id,
        randomKey: u.randomKey,
        }
        }
        return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
