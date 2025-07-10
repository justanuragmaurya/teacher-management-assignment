"use client";
import { School } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import MaxWidthContainer from "./maxwidthcontainer";
import { ModeToggle } from "./mode-toogle";

export default function Navbar() {
  const { data: session } = useSession();
  return(
    <div className="border-b py-1">
    <MaxWidthContainer>
    <div className="flex items-center justify-between px-5 py-2">
        <div>
            <h1 className=" flex gap-2 items-center font-semibold"><School/> Teacher Management System</h1>
        </div>
        <div className="flex gap-5 items-center">
            {session ? (
                <Button onClick={() => signOut()} variant="outline">
                    Sign Out
                </Button>
            ) : (
                <Button onClick={() => signIn()} variant="default">
                    Sign In
                </Button>
            )}
            <ModeToggle/>
        </div>
    </div>
    </MaxWidthContainer>
    </div>
  );
}
