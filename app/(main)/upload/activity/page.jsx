import uploadFile from "@/actions/upload";
import ActivityUploadForm from "@/components/ActivityUploadForm";

export default function UploadActivityPage() {
	return (
		<div className="flex flex-col w-full items-center gap-8 py-10">
			<p className="text-2xl font-bold">Upload activity</p>
			<ActivityUploadForm uploadAction={uploadFile} />
		</div>
	);
}
