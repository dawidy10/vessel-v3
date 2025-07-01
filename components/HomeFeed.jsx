import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ThreadPost from "./ThreadPost";

export default async function HomeFeed() {
	const cookieStore = cookies();
	const supabase = await createClient({ cookies: () => cookieStore });
	const { data: posts, error } = await supabase
		.from("posts")
		.select("*, profiles(id,username, name, avatar)")
		// .in("user_id", followedUserIds)
		.order("created_at", { ascending: false });
	// .range(0, 4);

	return (
		<>
			{posts.map((post, index) => (
				<div key={index}>
					{post.type == "thread" ? (
						<ThreadPost author={post.profiles} content={post} />
					) : (
						<>
							<p className="font-bold mt-4">{post.content.caption}</p>
							<p>{post.text}</p>
						</>
					)}
				</div>
			))}
		</>
	);
}
