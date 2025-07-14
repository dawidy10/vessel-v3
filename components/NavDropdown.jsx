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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavDropdown({ avatar, name }) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none">
					<div className="flex cursor-pointer items-center gap-2">
						<Avatar>
							<AvatarImage src={avatar} />
							<AvatarFallback>
								{name
									.split(" ")
									.map((word) => word[0])
									.join("")
									.toUpperCase()}{" "}
							</AvatarFallback>
						</Avatar>
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
