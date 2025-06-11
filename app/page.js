import Image from "next/image";
import { redirect } from "next/navigation";
import LogOut from "@/components/LogOut";
import HomeFeed from "@/components/HomeFeed";
import { createClient } from "@/utils/supabase/server";
import ActivityTracker from "@/components/ActivityTracker";
export default async function Home() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const { data: posts, postsError } = await supabase.from("posts").select("*").eq("author_id", data.user.id);
	if (error || !data?.user) {
		redirect("/login");
	}
	return (
		<>
			<p>Hello {data.user.email}</p>
			<LogOut />
			<div className="w-full flex flex-row justify-center">
				<div className="">
					<ActivityTracker activityData={posts} />
				</div>
			</div>

			{/* <HomeFeed />
			<br />
			<h3>TODO:</h3>
			<ul>
				<li>File upload [DONE]</li>
				<li>Basic Profile page [DONE]</li>
				<li>Basic User page [DONE]</li>
				<li>Activity graph [DONE]</li>
				<li>Follow request [DONE]</li>
				<li>Threads/Posts [IN PROGRESS]</li>
			</ul> */}
		</>
	);
}
