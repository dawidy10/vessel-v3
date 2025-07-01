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
import { GalleryVerticalEnd } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function ActivityPost({ author, content, authUserID }) {
	const date = new Date(content.timestamptz);
	const timeAgo = formatDistanceToNow(date, { addSuffix: true });
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex">
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
							<div className="flex items-bottom gap-4">
								{authUserID == author.id ? (
									<h1 className="text-xl">You tracked an activity.</h1>
								) : (
									<h1 className="text-xl">{author.name} tracked an activity.</h1>
								)}
							</div>
							<CardDescription>{timeAgo}</CardDescription>
							<div className="flex mt-4 gap-2 items-center">
								<GalleryVerticalEnd />
								<p className="underline">{content.caption}</p>
							</div>
						</div>
					</CardTitle>
					<CardAction>
						<EllipsisVertical />
					</CardAction>
				</CardHeader>
			</Card>
		</>
	);
}
