import { deleteSessionCookie, isSessionValid } from "@/app/libs/session";
import {NextRequest, NextResponse} from "next/server";



//regex retirada diretamente da documentação do NextJS
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

const publicRoutes = [
    '/',
    '/login',
    '/create'
]

export async function middleware(req: NextRequest){

    const pathname = req.nextUrl.pathname;

    //verificar se a requisicao possui credenciais validas para criar uma session
    const session = await isSessionValid();
    

    if(publicRoutes.includes(pathname) && session)
    {
        return NextResponse.redirect(new URL(`/dashboard/${session.userId}`, req.nextUrl));
    }
    
    if(!session && !publicRoutes.includes(pathname)){
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if(pathname.includes('/dashboard') && session)
    {
        const userIdFromURL = pathname.split('/')[2]; //as rotos são /dashboard/userId/.... A ideia é extrair o userId da URL e comparar com o token
        const {userId} = session;

        if(userIdFromURL !== userId)
        {
            await deleteSessionCookie();
            return NextResponse.redirect(new URL('/login', req.nextUrl));
        }
    }

    return NextResponse.next();

}