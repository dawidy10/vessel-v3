import { createClient } from "@/utils/supabase/server";
import Profile from "@/components/Profile";
import ActivityTracker from "@/components/ActivityTracker";

export default async function ProfilePage() {
	var profileData = null;
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const { data: profData, profileError } = await supabase.from("profiles").select("*").eq("id", data.user.id);
	profileData = profData[0];

	const { data: posts, postsError } = await supabase.from("posts").select("*").eq("author_id", data.user.id);

	// console.log(posts);

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col items-center w-[60vw] gap-20 mt-10">
				{profileData && <Profile profileData={profileData} />}
				{posts && <ActivityTracker activityData={posts} />}
			</div>
		</div>
	);
}
