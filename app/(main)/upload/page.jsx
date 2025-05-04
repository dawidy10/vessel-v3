import uploadFile from "@/actions/upload";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
	return (
		<div>
			<h1>Upload a file</h1>
			<UploadForm uploadAction={uploadFile} />
		</div>
	);
}
