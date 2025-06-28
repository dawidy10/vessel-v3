"use client";
import Image from "next/image";
// import styles from "@/app/(main)/layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
// import defaultProfilePic from "@/public/defaultUser.svg";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const supabase = createClient();
	const [searchText, setsearchText] = useState("");
	const [searchResults, setsearchResults] = useState(null);
	const [updateResults, setupdateResults] = useState(false);
	const clearResults = () => {
		setsearchResults(null);
	};

	useEffect(() => {
		const handleSearch = async () => {
			// if (searchText.length > 2) {
			//     const { data, error } = await supabase.rpc('search_profiles', { prefix: searchText.replace(/\s/g, '')})
			//     if (error) {
			//         console.error('Error fetching search results:', error)
			//         setsearchResults(null)
			//     } else if (data.length === 0) {
			//         setsearchResults(null)
			//     } else {
			//         setsearchResults(data)
			//     }
			// } else {
			//     setsearchResults(null)
			// }
			if (searchText.length > 2) {
				const { data, error } = await supabase
					.from("profiles")
					.select("*")
					// .ilike('name || username', '%'+searchText+'%')
					.or(`name.ilike.%${searchText}%,username.ilike.%${searchText}%`);

				if (error) {
					console.error("Error fetching search results:", error);
					setsearchResults(null);
				} else if (data.length === 0) {
					setsearchResults(null);
				} else {
					setsearchResults(data);
				}
			} else {
				setsearchResults(null);
			}
			console.log(searchResults);
		};

		handleSearch();
	}, [searchText]); // Run the effect when searchText changes

	const handleTextChange = (e) => {
		setsearchText(e.target.value);
	};
	// const showResults = async (e) => {
	//     setupdateResults(false)
	//     await handleText(e);
	//     console.log(searchResults)
	//     setupdateResults(true)
	// }
	useEffect(() => {
		if (searchText == "" || searchText == " " || searchText.length < 2) {
			setsearchResults(null);
		}
	}, [searchText, searchResults]);

	const router = useRouter();
	const handleSubmit = (event) => {
		setsearchResults(null);
		event.preventDefault();
		router.push(`/search/${searchText}`);

		// redirect(`/search/${searchText}`);
	};

	return (
		<>
			<div className="flex-col">
				<form onSubmit={handleSubmit}>
					<input
						onChange={handleTextChange}
						value={searchText}
						autoComplete="off"
						// className={styles.searchinput}
						type="text"
						placeholder="Search"
						id="searchText"
						name="searchText"
					/>
				</form>
				{searchResults && (
					<div className={`flex-col absolute mt-2 w-72 px-4 py-2 text-white`}>
						{searchResults.map((result) => (
							<>
								<Link className="flex items-center" onClick={clearResults} href={`/user/${result.id}`}>
									<div>
										<Image
											src={result.avatar ? result.avatar : defaultProfilePic}
											width={100}
											height={100}
											alt="Profile image"
											// className={styles.profilePic}
										/>
									</div>
									<p className="my-2 ml-2">{result.name}</p>
								</Link>
							</>
						))}
					</div>
				)}
			</div>
		</>
	);
}
