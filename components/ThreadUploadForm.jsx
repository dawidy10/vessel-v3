export default function ThreadUploadForm({ uploadAction }) {
	return (
		<form action={uploadAction}>
			<input type="text" placeholder="thread title" id="title" name="title" />
			<input placeholder="start the discussion here" type="text" name="text" id="text" />
			<input type="submit" value="Submit" />
		</form>
	);
}
