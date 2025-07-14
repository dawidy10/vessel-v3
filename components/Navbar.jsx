import Image from "next/image";
import Link from "next/link";
import NavDropdown from "./NavDropdown";
import { createClient } from "@/utils/supabase/server";
import { ThemeToggle } from "@/components/ThemeToggle";
import LogoVessel from "./Logo";
import SearchBar from "./SearchBar";
import { CirclePlus } from "lucide-react";

export default async function Navbar() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	const { data: profData, profileError } = await supabase
		.from("profiles")
		.select("name,avatar")
		.eq("id", data.user.id);
	return (
		<nav className="h-20 md:h-16 flex w-[100vw] border-b-1 justify-between px-14 items-center fixed bg-background">
			<Link href="/">
				<LogoVessel />
			</Link>
			<SearchBar />

			<div className="flex gap-10 items-center">
				<CirclePlus />
				<NavDropdown avatar={profData[0].avatar} name={profData[0].name} />
				<ThemeToggle />
			</div>

			{/* {data.user && <NavDropdown avatar={data.user.user_metadata.avatar} name={data.user.user_metadata.name} />} */}
		</nav>
	);
}
