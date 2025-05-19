import uploadFile from "@/actions/upload";
import ActivityUploadForm from "@/components/ActivityUploadForm";

export default function UploadActivityPage() {
	return (
		<div>
			<h1>Upload activity</h1>
			<ActivityUploadForm uploadAction={uploadFile} />
		</div>
	);
}
