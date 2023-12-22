import getFormattedDate from "@/lib/get-formatted-date";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
	params: {
		id: string;
	};
};

export const generateMetadata = ({ params }: Params) => {
	const posts = getSortedPostsData();
	const { id } = params;

	const post = posts.find((post) => post.id === id);

	if (!post) {
		return {
			title: "404 - Not Found",
		};
	}

	return {
		title: post.title,
	};
};

const Post = async ({ params }: Params) => {
	const posts = getSortedPostsData();
	const { id } = params;

	if (!posts.find((post) => post.id === id)) {
		notFound();
	}

	const { title, date, contentHtml } = await getPostData(id);
	const pubDate = getFormattedDate(date);

	return (
		<main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
			<h1 className="text-3xl mt-4 mb-0">{title}</h1>
			<p className="mt-0">{pubDate}</p>
			<article>
				<section dangerouslySetInnerHTML={{ __html: contentHtml }} />
				<p>
					<Link href="/">Back to Home</Link>
				</p>
			</article>
		</main>
	);
};

export default Post;
