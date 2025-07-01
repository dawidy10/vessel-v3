"use client";

import { Input } from "@/components/ui/input";
import "@/app/globals.css";

export default function SearchBar() {
	return (
		<>
			<div className="flex-col">
				<form className="w-50">
					{/* <input autoComplete="off" type="text" placeholder="Search" id="searchText" name="searchText" /> */}
					<Input type="text" placeholder="Search" />
				</form>
			</div>
		</>
	);
}
