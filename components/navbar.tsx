"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { div } from "framer-motion/client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  return (
    <nav className="bg-black text-white">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold">Notes</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="https://github.com/Sankhadip-Roy/notes">
              <Button variant="ghost" className="text-white hover:bg-gray-700">
                Repo
              </Button>
            </Link>

            {session.data?.user && (
              <div className="flex items-center space-x-2">

                <Image
                  src={session.data?.user?.image || '/default-avatar.png'}
                  alt={`Avatar for ${session.data?.user?.name || 'user'}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Button
                  variant="ghost"
                  className="text-white hover:bg-gray-700 "
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            )}
            {!session.data?.user && (
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-700"
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            )}
          </div>
          <div className="md:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="https://github.com/Sankhadip-Roy/notes">
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-700 w-full text-left"
              >
                Notes
              </Button>
            </Link>

            {session.data?.user && (
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-700 w-full text-left"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            )}
            {!session.data?.user && (
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-700 w-full text-left"
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
