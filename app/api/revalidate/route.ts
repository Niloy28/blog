import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (secret !== process.env.REVALIDATE_SECRET) {
		return new Response(JSON.stringify({ message: "Invalid secret token" }), {
			status: 401,
			statusText: "Unauthorized",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const path = request.nextUrl.searchParams.get("path") || "/";

	if (path) {
		revalidatePath(path);
		return Response.json({ revalidated: true, now: Date.now() });
	}

	return Response.json({
		revalidated: false,
		now: Date.now(),
		message: "Missing path to revalidate",
	});
}
