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
import { Checkbox } from "@/components/ui/checkbox";
export default function UploadAnnotationForm() {
	const [bibleData, setBibleData] = useState([]);
	const [selectedVersion, setSelectedVersion] = useState("");
	const [selectedBook, setSelectedBook] = useState("");
	const [selectedChapter, setSelectedChapter] = useState("");
	const [selectedVerses, setSelectedVerses] = useState([]);

	useEffect(() => {
		if (!selectedVersion) return;

		const filename = selectedVersion === "KJV" ? "/KJV.json" : "/VDCC.json";

		fetch(filename)
			.then((res) => res.json())
			.then((data) => setBibleData(data));

		setSelectedBook("");
		setSelectedChapter("");
		setSelectedVerses([]);
	}, [selectedVersion]);

	const chapters = selectedBook && bibleData[selectedBook] ? Object.keys(bibleData[selectedBook]) : [];

	console.log(selectedVerses);

	return (
		<>
			<form action="">
				<Select onValueChange={setSelectedVersion}>
					<SelectTrigger className="cursor-pointer focus:outline-none">
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
									<span className="font-bold">VDCC </span>
									Versiunea Dumitru Cornilescu Corectată
								</p>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				{!selectedVersion ? (
					<p>No version selected</p>
				) : !bibleData || bibleData.length === 0 ? (
					<p>Loading Bible...</p>
				) : (
					<>
						<p>Bible Loaded</p>
						<Select
							onValueChange={(val) => {
								setSelectedBook(val);
								setSelectedChapter("");
								setSelectedVerses([]);
							}}
							disabled={!selectedVersion}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a Book" />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(bibleData).map((book) => (
									<SelectItem key={book} value={book}>
										{book}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							onValueChange={(val) => {
								setSelectedChapter(val);
								setSelectedVerses([]);
							}}
							disabled={!selectedBook}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select a chapter" />
							</SelectTrigger>
							<SelectContent>
								{chapters.map((ch) => (
									<SelectItem key={ch} value={ch}>
										Chapter {ch}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* <Select disabled={!selectedChapter}>
							<SelectTrigger className="w-1/2">
								<SelectValue placeholder="Select verses" />
							</SelectTrigger>
							<SelectContent className="w-1/2">
								{selectedBook &&
									selectedChapter &&
									bibleData[selectedBook]?.[selectedChapter] &&
									Object.entries(bibleData[selectedBook][selectedChapter]).map(
										([verseNumber, verseText]) => (
											<SelectItem key={verseNumber} value={verseNumber}>
												<Checkbox
													checked={selectedVerses.includes(verseNumber)}
													onCheckedChange={(checked) => {
														setSelectedVerses((prev) =>
															checked
																? [...prev, verseNumber]
																: prev.filter((v) => v !== verseNumber),
														);
													}}
												/>
												<p>{verseNumber}.</p>{" "}
												<p className="text-muted-foreground ml-2">{verseText}</p>
											</SelectItem>
										),
									)}
							</SelectContent>
						</Select> */}
						{/* <DropdownMenu>
							<DropdownMenuTrigger asChild>
								<p>Select Verses</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuLabel>Appearance</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{selectedBook &&
									selectedChapter &&
									bibleData[selectedBook]?.[selectedChapter] &&
									Object.entries(bibleData[selectedBook][selectedChapter]).map(
										([verseNumber, verseText]) => (
											<DropdownMenuCheckboxItem
												key={verseNumber}
												value={verseNumber}

												// onCheckedChange={setShowStatusBar}
											>
												<p>{verseNumber}.</p>{" "}
												<p className="text-muted-foreground ml-2">{verseText}</p>
											</DropdownMenuCheckboxItem>
										),
									)}
							</DropdownMenuContent>
						</DropdownMenu> */}
					</>
				)}
			</form>
			{selectedBook &&
				selectedChapter &&
				bibleData[selectedBook]?.[selectedChapter] &&
				Object.entries(bibleData[selectedBook][selectedChapter]).map(([verseNumber, verseText]) => (
					<div key={verseNumber} className="flex items-center gap-4 my-1">
						<Checkbox
							checked={selectedVerses.includes(verseNumber)}
							onCheckedChange={(checked) => {
								setSelectedVerses((prev) => {
									const updated = checked
										? [...prev, verseNumber]
										: prev.filter((v) => v !== verseNumber);

									return updated.sort((a, b) => Number(a) - Number(b));
								});
							}}
						/>
						<p>{verseNumber}.</p> <p className="text-muted-foreground ml-2">{verseText}</p>
					</div>
				))}
			<div className="mt-6">
				<p className="font-bold">Selected</p>
				{selectedVerses.map((v) => (
					<p key={v}>
						{v}. {bibleData[selectedBook][selectedChapter][v]}
					</p>
				))}
			</div>
		</>
	);
}
