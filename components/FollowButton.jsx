"use client";
import { followUser } from "@/actions/followUser";
import { useState } from "react";
import { Button } from "./ui/button";

export default function FollowButton({ user, followers, authUserId }) {
	const [isFollowing, setisFollowing] = useState(followers.some((e) => e.follower_id == authUserId.user.id) ? 1 : 0);
	const [isRequested, setisRequested] = useState(
		followers.some((e) => e.follower_id == authUserId.user.id && e.accepted == false) ? 1 : 0,
	);
	const [count, setcount] = useState(followers.filter((f) => f.accepted === true).length);
	const handleClick = () => {
		setisFollowing(!isFollowing);
		if (isFollowing && isRequested) {
			setisRequested(false);
		}
		if (!isFollowing) {
			setisRequested(true);
		}
		if (isFollowing && !isRequested) {
			setcount(count - 1);
		}
	};
	// console.log(followers);
	// console.log(isFollowing);
	return (
		<>
			<p>
				{count} {count == 1 ? "follower" : "followers"}
			</p>
			<form action={followUser}>
				<input type="hidden" name="userId" id="userId" value={user.id} />
				<input type="hidden" name="isFollowing" id="isFollowing" value={isFollowing ? 0 : 1} />
				<Button className="font-bold cursor-pointer mt-2" onClick={handleClick} type="submit">
					<p>{isRequested ? "Cancel Request" : isFollowing ? "Unfollow" : "Follow"}</p>
				</Button>
			</form>
		</>
	);
}
