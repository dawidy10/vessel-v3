import FollowButton from "./FollowButton";
export default function UserProfile({ profileData, followers, authUserId }) {
	return (
		<>
			<FollowButton user={profileData} followers={followers} authUserId={authUserId} />
			<p>{profileData.name}</p>
			<p>{followers && followers.id}</p>
			<p>@{profileData.username}</p>
		</>
	);
}
