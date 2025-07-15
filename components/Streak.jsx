import { Flame } from "lucide-react";

export default function Streak() {
	return (
		<div className="flex items-end gap-1">
			<Flame className="fill-accent text-accent" />
			<p className="text-xl">17</p>
		</div>
	);
}
