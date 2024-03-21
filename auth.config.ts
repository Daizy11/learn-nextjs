import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: { //This will prevent users from accessing the dashboard pages unless they are logged in.
    authorized({ auth, request: { nextUrl } }) { 
      //The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware. The auth property contains the user's session, and the request property contains the incoming request.
      const isLoggedIn = !!auth?.user; // to convert a value into a boolean
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {

        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;