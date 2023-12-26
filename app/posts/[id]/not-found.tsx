import Link from "next/link";

const PostNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center align-middle pt-12 text-white text-4xl font-bold">
			<p>The post was not found! ⛔</p>
			<p>
				<Link className="mx-auto text-white underline text-xl" href="/">
					Back to Home
				</Link>
			</p>
		</div>
	);
};

export default PostNotFound;
