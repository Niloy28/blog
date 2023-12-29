import { getPostsMeta } from "@/lib/posts";
import PostItem from "./PostItem";

const Posts = async () => {
	const posts = await getPostsMeta();

	if (!posts) {
		return <p className="mt-10 text-center">No Posts Were Found!</p>;
	}
	return (
		<section className="mt-6 mx-auto max-w-2xl">
			<h2 className="text-4xl font-bold dark:text-white">Blog Posts</h2>
			<ul className="w-full list-none p-0">
				{posts.map((post) => {
					return <PostItem post={post} key={post.id} />;
				})}
			</ul>
		</section>
	);
};

export default Posts;
