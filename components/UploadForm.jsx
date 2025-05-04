export default function UploadForm({ uploadAction }) {
	return (
		<form action={uploadAction}>
			<input type="file" name="fileInput" id="fileInput" />
			<input type="submit" value="Submit" />
		</form>
	);
}
