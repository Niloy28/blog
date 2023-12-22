import { getSortedPostsData } from "@/lib/posts";
import PostItem from "./PostItem";

const Posts = () => {
	const posts = getSortedPostsData();

	return (
		<section className="mt-6 mx-auto max-w-2xl">
			<h2 className="text-4xl font-bold dark:text-white">Blog Posts</h2>
			<ul className="w-full">
				{posts.map((post) => {
					return <PostItem post={post} key={post.id} />;
				})}
			</ul>
		</section>
	);
};

export default Posts;
