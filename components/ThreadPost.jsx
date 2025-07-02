import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import PostFooter from "./PostFooter";

export default function ThreadPost({ author, content, likes, authUserID }) {
	const date = new Date(content.timestamptz);
	const timeAgo = formatDistanceToNow(date, { addSuffix: true });
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Link href={`/user/${author.id}`}>
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
					</Link>
					<div className="flex flex-col">
						<Link href={`/user/${author.id}`}>
							<h1 className="text-xl">{author.name}</h1>
						</Link>
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
				<PostFooter postID={content.id} likes={likes} authUserID={authUserID} />
			</CardFooter>
		</Card>
	);
}
