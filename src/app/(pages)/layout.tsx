"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function RootLayout({ children }: { children: ReactNode }){
    const pathname = usePathname();
    const isPublicPage = ['/', '/register'].includes(pathname);

    return(
        <div className='min-h-screen flex flex-col'>
            {isPublicPage && (
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
            )}
            <main className={cn(
                'flex-1',
                isPublicPage ? 'flex items-center justify-center' : 'flex'
            )}>
                {children}
            </main>
        </div>
    )
}