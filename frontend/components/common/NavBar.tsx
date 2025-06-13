import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export default function NavBar({ className = "" }: { className?: string }) {
	return (
		<nav className={cn("flex justify-between py-4", className)}>
			<div className="font-bold text-lg">Rentell</div>
			<div className="flex gap-4">
				<Button>Login</Button>
				<Button variant="outline">Sign Up</Button>
			</div>
		</nav>
	)
}