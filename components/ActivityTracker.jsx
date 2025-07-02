import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

export default function ActivityTracker({ variant, activityData }) {
	const dates = [];
	const today = new Date();
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(today.getMonth() - 5); // ← aici e schimbarea

	for (let d = new Date(sixMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
		const yyyy = d.getFullYear();
		const mm = String(d.getMonth() + 1).padStart(2, "0");
		const dd = String(d.getDate()).padStart(2, "0");
		dates.push(`${yyyy}-${mm}-${dd}`);
	}

	const normalizedData = activityData.map((item) => ({
		...item,
		created_at: item.created_at?.split("T")[0] ?? "",
	}));

	const dateOnly = normalizedData[0]?.created_at.split("T")[0];

	for (let activity of normalizedData) {
		activity.created_at = activity.created_at.split("T")[0];
	}

	const tday = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const postsToday = normalizedData?.filter((post) => {
		return post.created_at.startsWith(tday);
	});
	const currentYear = new Date().getFullYear();
	const currentYearActivitiesCount = normalizedData?.filter(
		(activity) => new Date(activity.created_at).getFullYear() === currentYear,
	);
	return (
		<>
			<div>
				{/* {normalizedData.map((post) => (
					<div key={post.id}>
						{post.id} : {post.file_src}
					</div>
				))} */}
				{variant == "profile" && (
					<div className="w-full mt-20 mb-2">
						<h1 className="text-2xl font-bold">Activity</h1>
						<div className="flex gap-4 items-center">
							{postsToday.length == 0 ? (
								<p className="text-lg">No activity today.</p>
							) : postsToday.length == 1 ? (
								<p className="text-lg">One activity today.</p>
							) : (
								<p className="text-lg">{postsToday.length} activities today.</p>
							)}
							<p>|</p>
							{currentYearActivitiesCount.length == 0 ? (
								<p className="text-lg">No activity this year.</p>
							) : currentYearActivitiesCount.length == 1 ? (
								<p className="text-lg">One activity this year.</p>
							) : (
								<p className="text-lg">{currentYearActivitiesCount.length} activities this year.</p>
							)}
						</div>
					</div>
				)}
				<div className="inline-grid grid-cols-26 auto-cols-min gap-x-[3px] gap-y-[3px] w-full">
					{dates.map((day) => {
						const hasActivity = normalizedData?.some((post) => post.created_at === day);
						const activity = normalizedData?.filter((post) => post.created_at === day);
						return (
							<TooltipProvider key={day}>
								<div className="mt-1">
									<Tooltip>
										<TooltipTrigger asChild>
											<div
												className={`w-3.5 h-3.5 rounded-xs ${
													hasActivity ? "bg-accent" : "bg-muted"
												}`}
											/>
										</TooltipTrigger>
										<TooltipContent>
											{hasActivity ? (
												<div className="space-y-1 flex flex-col">
													<p className="text-xs">{day}</p>
													{activity.map((post) =>
														post.type == "activity" ? (
															<Link href="" key={post.id} className="font-bold text-xs">
																{post.caption}
															</Link>
														) : (
															<Link href="" key={post.id} className="font-bold text-xs">
																{post.type}
															</Link>
														),
													)}
												</div>
											) : (
												<div className="space-y-1">
													<p className="text-xs">{day}</p>
													<p className="text-xs">No activity</p>
												</div>
											)}
										</TooltipContent>
									</Tooltip>
								</div>
							</TooltipProvider>
						);
					})}
				</div>
			</div>
		</>
	);
}
