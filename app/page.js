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
		</>
	);
}
