"use client";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { useEffect, useState } from "react";
import ActivityTracker from "@/components/ActivityTracker";
import ThreadPost from "@/components/ThreadPost";
import ActivityPost from "@/components/ActivityPost";

export default function User() {
	const params = useParams();
	const id = Array.isArray(params.id) ? params.id[0] : params.id;
	// const id = params.id;

	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState(null);
	const [Uauth, setUauth] = useState(null);
	const [followers, setfollowers] = useState([]);
	useEffect(() => {
		async function getUser() {
			const supabase = createClient();
			const { data: auth, error } = await supabase.auth.getUser();
			if (auth && auth.user.id == id) {
				redirect("/profile");
			}
			const { data: userPosts, err } = await supabase
				.from("posts")
				.select("*, profiles(id, username, name, avatar), likes(user_id)")
				.eq("author_id", id)
				.order("created_at", { ascending: false });

			const { data: userData, er } = await supabase.from("profiles").select("*").eq("id", id);

			console.log(userData);
			const { data: followersData, e } = await supabase.from("followers").select("*").eq("following_id", id);
			setUser(userData[0]);
			setPosts(userPosts);
			setUauth(auth);
			if (e) {
				console.log(e);
			} else {
				console.log(followersData);
			}
			setfollowers(followersData);
		}

		getUser();
	}, []);
	return (
		<>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center w-[60vw] mt-10">
					{user && <UserProfile profileData={user} followers={followers} authUserId={Uauth} />}
					{posts && <ActivityTracker variant="profile" activityData={posts} />}
					<div className="mt-10 w-[35vw]">
						{posts ? (
							posts.map((post, index) => (
								<div className="mt-10" key={index}>
									{post.type == "thread" ? (
										<ThreadPost
											author={post.profiles}
											content={post}
											likes={post.likes}
											authUserID={Uauth.user.id}
										/>
									) : (
										<>
											<ActivityPost
												author={post.profiles}
												content={post}
												authUserID={Uauth.user.id}
											/>
										</>
									)}
								</div>
							))
						) : (
							<h1 className="text-2xl">No posts found.</h1>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
