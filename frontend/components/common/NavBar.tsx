"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUserProfile } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookmarkCheckIcon, ShoppingBag } from "lucide-react";

export default function NavBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const profile = useUserProfile();
  useEffect(() => console.log(profile), [profile]);
  return (
    <nav className={cn("flex justify-between items-center py-4", className)}>
      <div className="flex items-center gap-2">
        <Image
          src="/logo.jpeg"
          alt="Rentell Logo"
          width={48}
          height={48}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold text-black-800">RENTELL</h1>
      </div>
      {!profile.data ? (
        <div className="flex gap-4">
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button variant="outline" onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link
            href={"/wishlists"}
            className="outline-none ring-0 hover:border-b-2 hover:border-black p-1 overflow-hidden flex items-center gap-2"
          >
            <BookmarkCheckIcon />
            <span className="text-sm font-semibold">Wishlists</span>
          </Link>
          <Link
            href={"/cart"}
            className="outline-none ring-0 hover:border-b-2 hover:border-black p-1 overflow-hidden flex items-center gap-2"
          >
            <ShoppingBag />
            <span className="text-sm font-semibold">Cart</span>
          </Link>
          <Avatar className="w-10 h-10">
            <AvatarImage src={profile.data.avatarUrl} />
            <AvatarFallback>
              {profile.data.firstName?.at(0) ?? "A"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </nav>
  );
}
