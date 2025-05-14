'use client'
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter() ; 
  useEffect(()=>{
    router.push('/home') ; 
  },[])

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-y-6">
      <Link href="/login" className="border p-4">Login</Link>
      <Link href="/signup" className="border p-4">Sign up</Link>
      <Link href='/profile' className="border p-4">Profile</Link>
      <Link href ='/item' className="border p-4">Item</Link>
      <Link href='/home' className="border p-4">Home </Link>
    </div>
  );
}
