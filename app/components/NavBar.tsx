import Link from "next/link";
import { FaGithub, FaItchIo } from "react-icons/fa";

const NavBar = () => {
	return (
		<nav className="bg-slate-600 p-4 sticky drop-shadow-xl z-10 top-0">
			<div className="md:px-6 prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
				<h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
					<Link
						className="text-white/80 no-underline hover:text-white"
						href="/"
					>
						Niloy
					</Link>
				</h1>
				<div className="flex justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
					<Link
						className="text-white/80 hover:text-white"
						href="https://github.com/Niloy28"
					>
						<FaGithub />
					</Link>
					<Link
						className="text-white/80 hover:text-white"
						href="https://niloy28.itch.io/"
					>
						<FaItchIo />
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
