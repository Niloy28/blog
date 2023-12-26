import Profile from "./components/Profile";
import Posts from "./components/Posts";

export default function Home() {
	return (
		<main className="px-6 mx-auto">
			<Profile />
			<p className="my-12 text-3xl text-center text-black dark:text-white">
				Hello and Welcome! 👋 &nbsp;
				<span className="whitespace-nowrap">
					I&apos;m <span className="font-bold">Niloy</span>
				</span>
			</p>
			<Posts />
		</main>
	);
}
