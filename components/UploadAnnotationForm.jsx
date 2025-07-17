"use client";
import { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export default function UploadAnnotationForm() {
	const [bibleData, setBibleData] = useState([]);
	const [selected, setSelected] = useState("");

	useEffect(() => {
		if (!selected) return;

		const filename = selected === "KJV" ? "/KJV.json" : "/VDCC.json";

		fetch(filename)
			.then((res) => res.json())
			.then((data) => setBibleData(data));
	}, [selected]);

	// if (!bibleData || bibleData.length === 0) {
	// 	return <p>Loading...</p>;
	// }

	return (
		<>
			<form action="">
				<Select onValueChange={setSelected}>
					<SelectTrigger>
						<SelectValue placeholder="Select a Bible Translation" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="KJV">
								<p>
									<span className="font-bold">KJV </span>King James Version
								</p>
							</SelectItem>
							<SelectItem value="VDCC">
								<p>
									<span className="font-bold">VDC </span>
									Versiunea Dumitru Cornilescu Corectată
								</p>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</form>

			{!selected ? (
				<p>No version selected</p>
			) : !bibleData || bibleData.length === 0 ? (
				<p>Loading Bible...</p>
			) : (
				<>
					<p>Bible Loaded</p>
					{Object.keys(bibleData).map((bookName) => (
						<div key={bookName} className="my-2">
							<p>{bookName}</p>
						</div>
					))}
				</>
			)}
		</>
	);
}
