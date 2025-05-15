"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function followUser(formData) {
	const userId = formData.get("userId");
	const action = formData.get("isFollowing");

	const cookieStore = cookies();
	const supabase = await createClient({ cookies: () => cookieStore });

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}

	if (action == 1) {
		const { data, error } = await supabase
			.from("followers")
			.delete()
			.match({ following_id: userId, follower_id: userdata.user.id });

		if (error) {
			console.error("Error, cant follow", error);
			return;
		}
		// const { data: notif, error: notifError } = await supabase
		// 	.from("notifications")
		// 	.delete()
		// 	.match({ emitter_id: userdata.user.id, receiver_id: userId, type: 3 });
	} else {
		const { data, error } = await supabase.from("followers").insert([
			{
				following_id: userId,
				follower_id: userdata.user.id,
				accepted: false,
			},
		]);

		if (error) {
			console.error("Error, cant follow", error);
			return;
		}
		// const { data: notif, notifError } = await supabase.from("notifications").insert([
		// 	{
		// 		type: 3,
		// 		emitter_id: userdata.user.id,
		// 		receiver_id: userId,
		// 		post_id: null,
		// 		seen: false,
		// 	},
		// ]);
	}

	revalidatePath("/");
	return { message: "Success" };
}
