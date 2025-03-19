import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupForm({ signupAction }) {
	return (
		<form action={signupAction} className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<label htmlFor="name">Full Name</label>
					<Input name="name" id="name" type="text" placeholder="John Smith" required />
				</div>
				<div className="grid gap-2">
					<label htmlFor="username">Username</label>
					<Input name="username" id="username" type="text" placeholder="johnsmith10" required />
				</div>
				<div className="grid gap-2">
					<label htmlFor="email">Email</label>
					<Input name="email" id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div className="grid gap-2">
					<label htmlFor="password">Password</label>

					<Input name="password" id="password" type="password" required />
				</div>
				<button type="submit" className="w-full">
					Login
				</button>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link href="/login" className="underline underline-offset-4">
					Login
				</Link>
			</div>
		</form>
	);
}
