import PostItem from "@/app/components/PostItem";
import { getPostsMeta } from "@/lib/posts";
import Link from "next/link";
import React from "react";

type Params = {
	params: {
		tag: string;
	};
};

export const revalidate = 3600;

export const generateStaticParams = async () => {
	const posts = await getPostsMeta();

	if (!posts) {
		return [];
	}

	const tags = new Set(posts.map((post) => post.tags).flat());

	return Array.from(tags).map((tag) => ({ tag }));
};

export const generateMetadata = async ({ params: { tag } }: Params) => {
	return {
		title: `Posts tagged with "${tag}"`,
	};
};

const Tags = async ({ params: { tag } }: Params) => {
	const posts = await getPostsMeta();

	if (!posts) {
		return <p className="text-center mt-10">Sorry, no posts were found!</p>;
	}

	const postsByTag = posts.filter((post) => post.tags.includes(tag));
	if (postsByTag.length === 0) {
		return (
			<div className="text-center">
				<div>
					<p className="mt-10">
						Sorry, no posts were found for the tag #{tag}.
					</p>
					<Link href="/">Back to Home 🏠</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<h2 className="text-3xl mt-4 mb-0">Posts for #{tag}: </h2>
			<section className="mt-6 mx-auto max-w-2xl">
				<ul className="w-full list-none p-0">
					{postsByTag.map((post) => (
						<PostItem key={post.id} post={post} />
					))}
				</ul>
			</section>
		</>
	);
};

export default Tags;
