"use client";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { useEffect, useState } from "react";

export default function User() {
	const params = useParams();
	const id = Array.isArray(params.id) ? params.id[0] : params.id;
	// const id = params.id;

	const [user, setUser] = useState(null);
	// const [posts, setPosts] = useState([])
	const [Uauth, setUauth] = useState(null);
	const [followers, setfollowers] = useState([]);
	useEffect(() => {
		async function getUser() {
			const supabase = createClient();
			const { data: auth, error } = await supabase.auth.getUser();
			if (auth && auth.user.id == id) {
				redirect("/profile");
			}
			// const {data: userPosts , err} = await supabase
			// .from('posts')
			// .select('*, profiles(id, username, name, avatar), likes(user_id), saves(user_id)')
			// .eq('user_id', id)
			// .order('created_at', {ascending: false})

			const { data: userData, er } = await supabase.from("profiles").select("*").eq("id", id);

			console.log(userData);
			const { data: followersData, e } = await supabase.from("followers").select("*").eq("following_id", id);
			setUser(userData[0]);
			// setPosts(userPosts)
			setUauth(auth);
			if (e) {
				console.log(e);
			} else {
				console.log(followersData);
			}
			setfollowers(followersData);
		}

		getUser();
	}, []);
	return (
		<>
			<p>User</p>
			{user && <UserProfile profileData={user} followers={followers} authUserId={Uauth} />}
		</>
	);
}
