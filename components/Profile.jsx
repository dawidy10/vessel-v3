export default function Profile({ profileData }) {
	return (
		<>
			<p>Hello, {profileData.name}</p>
			<p>@{profileData.username}</p>
		</>
	);
}
