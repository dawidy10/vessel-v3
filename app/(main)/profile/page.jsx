import { createClient } from "@/utils/supabase/server";

export default async function ProfilePage() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const { data: profData, profileError } = await supabase.from("profiles").select("*").eq("id", data.user.id);
	let profileData = profData[0];
	return (
		<div>
			<h1>Profile</h1>
			<p>Hello, {profileData.name}</p>
			<p>@{profileData.username}</p>
			<p>{data.user.email}</p>
		</div>
	);
}
