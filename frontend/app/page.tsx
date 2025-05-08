
import Link from "next/link";



export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-y-6">
      <Link href="/login" className="border p-4">Login</Link>
      <Link href="/signup" className="border p-4">Sign up</Link>
      <Link href='/profile' className="border p-4">Profile</Link>
      <Link href ='/item' className="border p-4">Item</Link>
    </div>
  );
}
