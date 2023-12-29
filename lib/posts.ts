import { compileMDX } from "next-mdx-remote/rsc";

type FileTree = {
	tree: [
		{
			path: string;
			type: "blob" | "tree";
		}
	];
};

export const getPostsMeta = async (): Promise<Meta[] | undefined> => {
	const res = await fetch(
		"https://api.github.com/repos/Niloy28/blogposts/git/trees/main?recursive=1",
		{
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);

	if (!res.ok) {
		return undefined;
	}

	const fileTree: FileTree = await res.json();
	const mdxFiles = fileTree.tree
		.map((obj) => obj.path)
		.filter((path) => path.endsWith(".mdx"));

	const posts: Meta[] = [];
	for (const mdxFile of mdxFiles) {
		const post = await getPostByName(mdxFile);
		if (post) {
			const { meta } = post;

			posts.push(meta);
		}
	}

	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostByName = async (
	fileName: string
): Promise<BlogPost | undefined> => {
	const res = await fetch(
		`https://raw.githubusercontent.com/Niloy28/blogposts/main/${fileName}`,
		{
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				"X-GitHub-Api-Version": "2022-11-28",
			},
		}
	);

	if (!res.ok) {
		return undefined;
	}

	const rawMDX = await res.text();
	if (rawMDX === "404: Not Found") return undefined;

	type MDXMatterType = Omit<Meta, "id">;
	const { content, frontmatter } = await compileMDX<MDXMatterType>({
		source: rawMDX,
		options: { parseFrontmatter: true },
	});

	const blogPost: BlogPost = {
		meta: { id: fileName.replace(/\.mdx$/, ""), ...frontmatter },
		content,
	};

	return blogPost;
};
