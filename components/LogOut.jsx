import signOut from "@/actions/logout";
import { LogOut as LogOutIcon } from "lucide-react";

export default function LogOut() {
	return (
		<form action={signOut}>
			<button className="flex items-center cursor-pointer">
				Logout <LogOutIcon className="ml-2" color="#fff" />
			</button>
		</form>
	);
}
