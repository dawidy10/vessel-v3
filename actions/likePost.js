"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function likePost(formData) {
	const postId = formData.get("postId");
	const action = formData.get("liked");

	const cookieStore = cookies();
	const supabase = await createClient({ cookies: () => cookieStore });

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}

	if (action == 1) {
		const { data, error } = await supabase
			.from("likes")
			.delete()
			.match({ post_id: postId, user_id: userdata.user.id });

		if (error) {
			console.error("Error, cant remove like", error);
			return;
		}
		// if (author != userdata.user.id) {
		// 	const { data: notif, error: notifError } = await supabase
		// 		.from("notifications")
		// 		.delete()
		// 		.match({ emitter_id: userdata.user.id, post_id: postId, type: 1 });
		// }
	} else {
		const { data, error } = await supabase.from("likes").insert([
			{
				post_id: postId,
				user_id: userdata.user.id,
			},
		]);

		if (error) {
			console.error("Error, cant like", error);
			return;
		}
		// if (author != userdata.user.id) {
		// 	const { data: notif, notifError } = await supabase.from("notifications").insert([
		// 		{
		// 			type: 1,
		// 			emitter_id: userdata.user.id,
		// 			receiver_id: author,
		// 			post_id: postId,
		// 			seen: false,
		// 		},
		// 	]);
		// }
	}

	revalidatePath("/");
	return { message: "Success" };
}
