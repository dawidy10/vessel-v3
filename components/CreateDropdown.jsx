import { CirclePlus } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ClipboardCheck } from "lucide-react";
import { MessageSquarePlus } from "lucide-react";
import { BookOpenText } from "lucide-react";

export default function CreateDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="cursor-pointer focus:outline-none">
				<CirclePlus />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem className="cursor-pointer">
					<Link className="flex items-center gap-2" href="/upload/activity">
						<ClipboardCheck className="text-foreground" />
						<p>Track Activity</p>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">
					<Link className="flex items-center gap-2" href="/upload/thread">
						<MessageSquarePlus className="text-foreground" />
						<p>Start Thread</p>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="cursor-pointer">
					<Link className="flex items-center gap-2" href="/">
						<BookOpenText className="text-foreground" />
						<p>New Annotation</p>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
