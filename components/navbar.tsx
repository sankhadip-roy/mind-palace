"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const session = useSession()
  return (
    <div >
        {session.data?.user && <button onClick={()=> signOut()}>SignOut</button>}
        {!session.data?.user && <button onClick={()=> signIn()}>SignIn</button>}
    </div>
  );
}