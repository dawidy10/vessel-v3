"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/utils/supabase/server";

export default async function uploadFile(formData) {
	const image = formData.get("fileInput");
	const uid = uuidv4() + image.name;
	const supabase = await createClient();

	const { data: userdata, err } = await supabase.auth.getUser();
	if (err || !userdata?.user) {
		console.log("User is not authenticated");
		return;
	}
	const { data, error } = await supabase.storage.from("uploads").upload(uid, image);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/");
}
