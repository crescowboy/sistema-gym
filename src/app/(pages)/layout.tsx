import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';


export default function RootLayout({ children }: { children: ReactNode }){
    return(
        <div className='min-h-screen flex flex-col'>
            <nav className='border-b bg-white px-6 py-3 flex items-center justify-between'>
                <Link href='/' className='text-xl font-semibold'>
                  Gym Manager
                </Link>
                <div className='space-x-3'>
                  <Link href='/login' >
                    <Button variant="outline">Iniciar Sesion</Button>
                  </Link>
                  <Link href='/register' >
                    <Button variant="outline">Registrarse</Button>
                  </Link>
                </div>
            </nav>
            <main className='flex-1 flex items-center justify-center'>{children}</main>
        </div>
    )
}
