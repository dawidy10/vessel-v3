import Image from "next/image";
import { redirect } from "next/navigation";
import LogOut from "@/components/LogOut";
import HomeFeed from "@/components/HomeFeed";
import { createClient } from "@/utils/supabase/server";
import HomepageActivity from "@/components/homepageActivity";
import FriendsSuggestions from "@/components/FriendsSuggestions";
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
			<div className="flex flex-col items-center">
				<div className="w-[45vw] flex flex-col gap-20">
					<HomepageActivity posts={posts} />
					<FriendsSuggestions id={data.user.id} />
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
