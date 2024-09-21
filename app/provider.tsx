'use client'
import { SessionProvider } from 'next-auth/react';

import { Session } from 'next-auth'; //
export function Providers({ children, session }: {
    children: React.ReactNode;
    session: Session; //
}
) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}

// created a different file for session provider because if we use it we have to make it a client component and so if we use session provider wrapper in layout.tsx then we have have to make that a client component which has so many downside