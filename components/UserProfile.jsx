export default function UserProfile({ profileData }) {
	return (
		<>
			<p>{profileData.name}</p>
			<p>@{profileData.username}</p>
		</>
	);
}
