import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ThreadPost from "./ThreadPost";
import ActivityPost from "./ActivityPost";

export default async function HomeFeed({ authUserID }) {
	const cookieStore = cookies();
	const supabase = await createClient({ cookies: () => cookieStore });
	const { data: posts, error } = await supabase
		.from("posts")
		.select("*, profiles(id,username, name, avatar), likes(user_id)")
		// .in("user_id", followedUserIds)
		.order("created_at", { ascending: false });
	// .range(0, 4);

	return (
		<>
			{posts.map((post, index) => (
				<div key={index}>
					{post.type == "thread" ? (
						<ThreadPost author={post.profiles} content={post} likes={post.likes} authUserID={authUserID} />
					) : (
						<>
							<ActivityPost author={post.profiles} content={post} authUserID={authUserID} />
						</>
					)}
				</div>
			))}
		</>
	);
}
