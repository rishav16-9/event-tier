import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="h-16 flex items-center p-4 bg-white border-b">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        <Link href="/">
          <p className="text-3xl font-semibold ">Event</p>
        </Link>
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button variant="outline" size="sm">
                Sign up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </nav>
  );
};
