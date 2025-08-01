import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
export default function ActivityUploadForm({ uploadAction }) {
	return (
		<form className="flex flex-col gap-2" action={uploadAction}>
			<Label htmlFor="caption">
				<p className="text-lg">Caption</p>
			</Label>
			<Input required placeholder="Caption here" type="text" name="caption" id="caption" />
			<Label htmlFor="fileInput" className="mt-2">
				<p className="text-lg">File</p>
			</Label>
			<Input required type="file" name="fileInput" id="fileInput" />
			<Button type="submit" className="mt-4 cursor-pointer">
				Submit
			</Button>
		</form>
	);
}
