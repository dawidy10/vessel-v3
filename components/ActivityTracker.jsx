import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

export default function ActivityTracker({ activityData }) {
	const dateOnly = activityData[0].created_at.split("T")[0];

	for (let activity of activityData) {
		activity.created_at = activity.created_at.split("T")[0];
	}

	// const dates = [];
	// const today = new Date();
	// const oneYearAgo = new Date();
	// oneYearAgo.setFullYear(today.getFullYear() - 1);

	// for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
	// 	const yyyy = d.getFullYear();
	// 	const mm = String(d.getMonth() + 1).padStart(2, "0");
	// 	const dd = String(d.getDate()).padStart(2, "0");
	// 	dates.push(`${yyyy}-${mm}-${dd}`);
	// }

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

	return (
		<>
			<div>
				{/* {activityData.map((post) => (
					<div key={post.id}>
						{post.id} : {post.file_src}
					</div>
				))} */}
				<div className="inline-grid grid-cols-26 auto-cols-min gap-x-[3px] gap-y-[3px] w-full">
					{dates.map((day) => {
						const hasActivity = activityData.some((post) => post.created_at === day);
						const activity = activityData.filter((post) => post.created_at === day);
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
