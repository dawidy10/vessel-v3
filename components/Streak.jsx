import { Flame } from "lucide-react";

export default async function Streak({ posts }) {
	let streak = 0;

	function calculateDays(startDate, endDate) {
		let start = new Date(startDate);
		let end = new Date(endDate);
		let timeDifference = end - start;
		let daysDifference = timeDifference / (1000 * 3600 * 24);
		return Math.abs(daysDifference);
	}

	const activeDays = posts?.map((item) => ({
		created_at: item.created_at?.split("T")[0] ?? "",
	}));

	const uniqueDays = Array.from(new Map(activeDays.map((item) => [item.created_at, item])).values());

	let yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];

	for (let activeDay of uniqueDays) {
		if (calculateDays(activeDay.created_at, yesterday) > 1) {
			break;
		} else {
			streak++;
			yesterday = activeDay.created_at;
		}
	}

	return (
		<div className="flex items-end gap-1">
			<Flame className="fill-accent text-accent" />
			<p className="text-xl">{streak}</p>
		</div>
	);
}
