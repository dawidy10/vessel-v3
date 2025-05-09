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

	revalidatePath("/", "layout");
	redirect("/");
}
