import Image from "next/image";
import { redirect } from "next/navigation";
import LogOut from "@/components/LogOut";

import { createClient } from "@/utils/supabase/server";
export default async function Home() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		redirect("/login");
	}
	return (
		<>
			<p>Hello {data.user.email}</p>
			<LogOut />
			<br />
			<h3>TODO:</h3>
			<ul>
				<li>File upload [DONE]</li>
				<li>Basic Profile page [DONE]</li>
				<li>Basic User page [DONE]</li>
				<li>Activity graph [DONE]</li>
				<li>Follow request [DONE]</li>
				<li>Threads/Posts</li>
			</ul>
		</>
	);
}
