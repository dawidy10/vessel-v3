import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogOut from "@/components/LogOut";

export default function NavDropdown({ avatar, name }) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>{name}</DropdownMenuTrigger>
				<DropdownMenuContent>
					{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
					<DropdownMenuItem>
						<Link href="/profile">Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LogOut />
					</DropdownMenuItem>
					{/* <DropdownMenuSeparator /> */}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
