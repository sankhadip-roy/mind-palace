"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-shrink-0">
            <Image src="/mind-palace.jpg" alt="Google Logo" width={50} height={50} className="mx-2" />
            <span className="text-2xl font-bold">mind-palace</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="https://github.com/sankhadip-roy/mind-palace">
              <Button variant="ghost" className="text-white hover:bg-gray-700">
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300 mr-2" />
                Repo
              </Button>
            </Link>

            {session.data?.user && (
              <div className="flex items-center space-x-2">
                <Image
                  src={session.data?.user?.image || '/default-avatar.png'} // default avatar not added
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
                onClick={() => signIn('google')}
              >
                <Image src="/google.svg" alt="Google Logo" width={16} height={16} className=" mr-2" />
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
            <Link href="https://github.com/sankhadip-roy/mind-palace">
              <Button
                variant="ghost"
                className="text-white hover:bg-gray-700 w-full text-left"
              >
                mind-palace
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
