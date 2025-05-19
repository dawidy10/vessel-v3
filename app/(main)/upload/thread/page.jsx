import ThreadUploadForm from "@/components/ThreadUploadForm";
import createThread from "@/actions/startThread";

export default function UploadThreadPage() {
	return (
		<div>
			<h1>Start a thread</h1>
			<ThreadUploadForm uploadAction={createThread} />
		</div>
	);
}
