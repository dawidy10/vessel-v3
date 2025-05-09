"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";

export default async function uploadFile(formData) {
	const image = formData.get("fileInput");
	const uid = uuidv4() + image.name;

	const caption = formData.get("caption");
	const supabase = await createClient();

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}
	const { data, error } = await supabase.storage.from("uploads").upload(uid, image);

	if (error) {
		console.log("Error uploading file");
		return;
	}

	const { data: url } = supabase.storage.from("uploads").getPublicUrl(uid);

	const { postData, postError } = await supabase.from("posts").insert([
		{
			caption: caption,
			file_src: url.publicUrl,
			author_id: userdata.user.id,
		},
	]);

	if (postError) {
		console.error("Error inserting data", error);
		return;
	}

	const { activity, activityError } = await supabase
		.from("profiles")
		.select("activity")
		.eq("id", userdata.user.id)
		.single();

	if (error) {
		console.error("Eroare la citire:", error);
		return;
	}

	const existingActivity = data.activity || {};

	const today = new Date();
	const dateKey = today.toISOString().split("T")[0]; // "2025-05-09"

	const postLink = url.publicUrl;

	existingActivity[dateKey] = postLink;

	const { newActivity, newActivityError } = await supabase
		.from("profiles")
		.update({
			activity: existingActivity,
		})
		.eq("id", userdata.user.id);

	revalidatePath("/", "layout");
	redirect("/");
}
