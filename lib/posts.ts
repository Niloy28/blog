import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, "");

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const matterResult = matter(fileContents);

		const post: BlogPost = {
			id,
			title: matterResult.data.title,
			date: matterResult.data.date,
		};

		return post;
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostData = async (id: string) => {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const matterResult = matter(fileContents);
	const processedContent = await remark()
		.use(remarkHtml)
		.process(matterResult.content);

	const contentHtml = processedContent.toString();

	const postWithHtml: BlogPost & { contentHtml: string } = {
		id,
		date: matterResult.data.date,
		title: matterResult.data.title,
		contentHtml,
	};

	return postWithHtml;
};
