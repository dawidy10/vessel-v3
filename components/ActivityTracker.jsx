import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ActivityTracker({ activityData }) {
	const dateOnly = activityData[0].created_at.split("T")[0];
	// console.log(dateOnly);

	for (let activity of activityData) {
		activity.created_at = activity.created_at.split("T")[0];
	}

	const dates = [];
	const today = new Date();
	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(today.getFullYear() - 1);

	for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
		const yyyy = d.getFullYear();
		const mm = String(d.getMonth() + 1).padStart(2, "0");
		const dd = String(d.getDate()).padStart(2, "0");
		dates.push(`${yyyy}-${mm}-${dd}`);
	}

	return (
		<>
			<div>
				{activityData.map((post) => (
					<div key={post.id}>
						{post.id} : {post.file_src}
					</div>
				))}
				<div className="inline-grid grid-cols-52 auto-cols-min gap-x-[2px]">
					{dates.map((day) => {
						const hasActivity = activityData.some((post) => post.created_at === day);
						const activity = activityData.find((post) => post.created_at === day);
						return (
							<TooltipProvider key={day}>
								<div className="mt-1">
									<Tooltip>
										<TooltipTrigger asChild>
											<div
												className={`w-2.5 h-2.5 rounded-xs ${
													hasActivity ? "bg-orange-500" : "bg-orange-300"
												}`}
											/>
										</TooltipTrigger>
										{hasActivity && (
											<TooltipContent>
												<div>
													<p>
														{activity.id} : {activity.caption}
													</p>
												</div>
											</TooltipContent>
										)}
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
