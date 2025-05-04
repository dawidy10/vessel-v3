import signOut from "@/actions/logout";

export default function LogOut() {
	return (
		<form action={signOut}>
			<button>Logout</button>
		</form>
	);
}
