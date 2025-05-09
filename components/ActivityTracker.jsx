export default function ActivityTracker({ activityData }) {
	const dateOnly = activityData[0].created_at.split("T")[0];
	console.log(dateOnly);

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
			{activityData.map((post) => (
				<div key={post.id}>{post.file_src}</div>
			))}
			<div className="grid grid-cols-52">
				{dates.map((day) => (
					<div className="border" key={day}>
						{activityData.map((post) => (
							<p className="border" key={post.id}>
								{post.created_at == day ? <> {day} ✔️</> : <>{day} ❌</>}
							</p>
						))}
					</div>
				))}
			</div>
		</>
	);
}
