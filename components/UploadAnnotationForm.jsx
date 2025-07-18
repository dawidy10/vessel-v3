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
import { ScrollArea } from "@/components/ui/scroll-area";
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
			<div className="flex flex-col items-center w-1/2 gap-4 pb-10">
				<h1 className="text-2xl text-left w-full font-bold">Choose a Bible Translation</h1>
				<form action="" className="w-full flex flex-col gap-4">
					<Select onValueChange={setSelectedVersion}>
						<SelectTrigger className="w-full cursor-pointer focus:outline-none">
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
							<h1 className="text-2xl text-left w-full font-bold">Select a Text</h1>
							<Select
								onValueChange={(val) => {
									setSelectedBook(val);
									setSelectedChapter("");
									setSelectedVerses([]);
								}}
								disabled={!selectedVersion}
							>
								<SelectTrigger className="w-full cursor-pointer focus:outline-none">
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
								<SelectTrigger className="w-full cursor-pointer focus:outline-none">
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
						</>
					)}
				</form>
				{selectedChapter && (
					<div className="overflow-auto h-96 border rounded px-2 py-2">
						{selectedBook &&
							selectedChapter &&
							bibleData[selectedBook]?.[selectedChapter] &&
							Object.entries(bibleData[selectedBook][selectedChapter]).map(([verseNumber, verseText]) => (
								<div key={verseNumber} className="flex items-center gap-4 my-1">
									<Checkbox
										className="cursor-pointer"
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
									<p className="text-muted-foreground ">{verseNumber}.</p>{" "}
									<p className="ml-2">{verseText}</p>
								</div>
							))}
					</div>
				)}
				{selectedVerses && (
					<div className="mt-6">
						{selectedVerses.map((v) => (
							<p key={v}>
								{v}. {bibleData[selectedBook][selectedChapter][v]}
							</p>
						))}
					</div>
				)}
			</div>
		</>
	);
}
