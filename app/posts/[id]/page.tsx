import getFormattedDate from "@/lib/get-formatted-date";
import { getPostsMeta, getPostByName } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";

export const revalidate = 180;

type Params = {
	params: {
		id: string;
	};
};

export const generateStaticParams = async () => {
	const posts = await getPostsMeta();

	if (!posts) {
		return [];
	}

	return posts.map((post) => ({
		id: post.id,
	}));
};

export const generateMetadata = async ({ params: { id } }: Params) => {
	const post = await getPostByName(`${id}.mdx`);

	if (!post) {
		return {
			title: "404 - Not Found",
		};
	}

	return {
		title: post.meta.title,
	};
};

const Post = async ({ params: { id } }: Params) => {
	const post = await getPostByName(`${id}.mdx`);

	if (!post) {
		notFound();
	}

	const { meta, content } = post;
	const pubDate = getFormattedDate(meta.date);

	const tags = meta.tags.map((tag) => (
		<Link href={`/tags/${tag}`} key={tag}>
			{tag}
		</Link>
	));

	return (
		<>
			<h1 className="text-3xl mt-4 mb-0">{meta.title}</h1>
			<p className="mt-0 text-sm">{pubDate}</p>
			<article>{content}</article>
			<section>
				<h3>Related:</h3>
				<div className="flex flex-row gap-4">{tags}</div>
			</section>
			<p className="mb-10">
				<Link href="/">👈 Back to home</Link>
			</p>
		</>
	);
};

export default Post;
