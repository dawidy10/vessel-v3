import Link from "next/link";
import ActivityTracker from "@/components/ActivityTracker";

export default function HomepageActivity({ posts }) {
	const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
	const postsToday = posts?.filter((post) => {
		return post.created_at.startsWith(today);
	});

	return (
		<div>
			<h1 className="text-2xl font-bold">Thursday, 12 May</h1>
			{postsToday.length == 0 ? (
				<p className="text-lg">No activity today.</p>
			) : postsToday.length == 1 ? (
				<p className="text-lg">One activity today.</p>
			) : (
				<p className="text-lg">{postsToday.length} activities toady.</p>
			)}
			<ActivityTracker activityData={posts} />
			<button className="w-full bg-none border-1px mt-6 emptyBtn">
				<Link href="/upload/activity">+ Add Activity</Link>
			</button>
		</div>
	);
}
