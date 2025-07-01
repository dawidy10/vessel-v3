import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import { Bookmark } from "lucide-react";
export default function PostFooter({ likes, comments }) {
	return (
		<div className="flex justify-between w-full">
			<div className="flex gap-4">
				<Heart className="cursor-pointer" />
				<MessageSquareText className="cursor-pointer" />
			</div>
			<Bookmark className="cursor-pointer" />
		</div>
	);
}
