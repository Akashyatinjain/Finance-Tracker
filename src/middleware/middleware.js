import { clerkMiddleware } from '@clerk/nextjs/server';
import { createBrowserRouter } from 'react-router-dom';


const isProtechedRoute = createBrowserRouter([
  "/Dashboard(.*)",
  "/Account(.*)",
  "/Transactions(.*)",
]);

export default clerkMiddleware(async(auth,req)=>{
  const {userId} =await auth();
  if(!userId && isProtechedRoute(req)){
      const {redirectToSignIn} =await auth();
      return redirectToSignIn();
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};