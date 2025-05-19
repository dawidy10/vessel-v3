"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";

export default async function createThread(formData) {
	const title = formData.get("title");
	const text = formData.get("text");
	const supabase = await createClient();

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}

	const { postData, postError } = await supabase.from("threads").insert([
		{
			title: title,
			text: text,
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
