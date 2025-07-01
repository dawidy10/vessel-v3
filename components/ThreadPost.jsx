import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function ThreadPost({ author, content }) {
	const date = new Date(content.timestamptz);
	const timeAgo = formatDistanceToNow(date, { addSuffix: true });
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Avatar>
						<AvatarImage src={author.avatar} />
						<AvatarFallback>
							{author.name
								.split(" ")
								.map((word) => word[0])
								.join("")
								.toUpperCase()}{" "}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h1 className="text-xl">{author.name}</h1>
						<CardDescription>{timeAgo}</CardDescription>
					</div>
				</CardTitle>
				<CardAction>
					<EllipsisVertical />
				</CardAction>
			</CardHeader>
			<CardContent>
				<h1 className="text-2xl">{content.content.title}</h1>
				<p className="mt-2">{content.content.text}</p>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
}
