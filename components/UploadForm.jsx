export default function UploadForm({ uploadAction }) {
	return (
		<form action={uploadAction}>
			<input type="file" name="fileInput" id="fileInput" />
			<input placeholder="caption here" type="text" name="caption" id="caption" />
			<input type="submit" value="Submit" />
		</form>
	);
}
