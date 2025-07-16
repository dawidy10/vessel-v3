import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen } from "lucide-react";
import Streak from "./Streak";

export default function Profile({ profileData, followers, followedUsers, posts }) {
	return (
		<>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center gap-4">
					<Avatar className="h-22 w-22">
						<AvatarImage src={profileData.avatar} />
						<AvatarFallback className="text-xl">
							{profileData.name
								.split(" ")
								.map((word) => word[0])
								.join("")
								.toUpperCase()}{" "}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<div className="flex items-center gap-4">
							<h1 className="text-3xl font-bold">{profileData.name}</h1>
							<Streak posts={posts} />
						</div>
						<p>@{profileData.username}</p>
						<div className="flex gap-2">
							<p>
								<span className="font-bold">{followers.length}</span> followers
							</p>
							<p>
								<span className="font-bold">{followedUsers.length}</span> following
							</p>
						</div>
					</div>
				</div>
				<UserPen />
			</div>
		</>
	);
}
