"use client";
import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import { Bookmark } from "lucide-react";
import { likePost } from "@/actions/likePost";
import { useState } from "react";
export default function PostFooter({ postID, authUserID, likes, comments }) {
	const [isLiked, setisLiked] = useState(likes.some((e) => e.user_id == authUserID) ? true : false);
	const [likesCount, setlikesCount] = useState(likes.length);
	const handleLike = () => {
		setlikesCount(isLiked ? likesCount - 1 : likesCount + 1);
		setisLiked(!isLiked);
	};
	return (
		<div className="flex justify-between items-center w-full mt-4">
			<div className="flex justify-between items-center w-32">
				<form action={likePost} className="flex">
					<input type="hidden" name="postId" id="postId" value={postID} />
					<input type="hidden" name="liked" id="liked" value={isLiked ? 0 : 1} />
					<button onClick={handleLike} type="submit">
						{isLiked ? (
							<Heart className="cursor-pointer fill-accent text-accent" />
						) : (
							<Heart className="cursor-pointer" />
						)}
					</button>
					<p className="px-3 pt-1">{likesCount}</p>
				</form>
				<MessageSquareText className="cursor-pointer" />
			</div>
			<Bookmark className="cursor-pointer" />
		</div>
	);
}
