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
import { ChevronDown } from "lucide-react";

export default function NavDropdown({ avatar, name }) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0">
					<div className="flex cursor-pointer">
						{name}
						<ChevronDown />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
					<DropdownMenuItem>
						<Link className="cursor-pointer" href="/profile">
							Profile
						</Link>
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
