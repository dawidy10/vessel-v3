import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen } from "lucide-react";

export default function Profile({ profileData }) {
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
						<h1 className="text-3xl font-bold">{profileData.name}</h1>
						<p>@{profileData.username}</p>
						<p>23 followers</p>
					</div>
				</div>
				<UserPen />
			</div>
		</>
	);
}
