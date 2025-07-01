"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";

export default async function createThread(formData) {
	const title = formData.get("title");
	const text = formData.get("text");
	const content = {
		title: title,
		text: text,
	};
	const supabase = await createClient();

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}

	const now = new Date(); // ora locală a browserului
	const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(
		2,
		"0",
	)}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
		now.getSeconds(),
	).padStart(2, "0")}`;

	const { postData, postError } = await supabase.from("posts").insert([
		{
			content: content,
			type: "thread",
			created_at: date,
			author_id: userdata.user.id,
		},
	]);

	if (postError) {
		console.error("Error inserting data", postError);
		return;
	}

	revalidatePath("/", "layout");
	redirect("/");
}
