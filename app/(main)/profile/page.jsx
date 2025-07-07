import { createClient } from "@/utils/supabase/server";
import Profile from "@/components/Profile";
import ActivityTracker from "@/components/ActivityTracker";
import ThreadPost from "@/components/ThreadPost";
import ActivityPost from "@/components/ActivityPost";
export default async function ProfilePage() {
	var profileData = null;
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const { data: profData, profileError } = await supabase.from("profiles").select("*").eq("id", data.user.id);
	profileData = profData[0];

	const { data: posts, postsError } = await supabase
		.from("posts")
		.select("*, profiles(id,username, name, avatar), likes(user_id)")
		.eq("author_id", data.user.id);

	const { data: followedUsers, error: followedUsersError } = await supabase
		.from("followers")
		.select("following_id")
		.eq("follower_id", data.user.id)
		.eq("accepted", true);

	const { data: followers, error: followersError } = await supabase
		.from("followers")
		.select("follower_id")
		.eq("following_id", data.user.id)
		.eq("accepted", true);

	// console.log(posts);

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center w-[60vw] mt-10">
				{profileData && (
					<Profile profileData={profileData} followers={followers} followedUsers={followedUsers} />
				)}
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
										authUserID={data.user.id}
									/>
								) : (
									<>
										<ActivityPost author={post.profiles} content={post} authUserID={data.user.id} />
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
	);
}
