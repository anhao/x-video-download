import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import {
	expandTcoUrl,
	extractTweetIds,
	isTcoUrl,
	parseTweet,
	TweetError,
} from "#/lib/twitter";

export const Route = createFileRoute("/api/parse")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const raw = new URL(request.url).searchParams.get("url")?.trim() ?? "";
				if (!raw) {
					return Response.json(
						{ ok: false, error: "invalid_url" },
						{ status: 400 },
					);
				}

				let id: string | undefined = extractTweetIds(raw)[0];
				if (!id && isTcoUrl(raw)) {
					const expanded = await expandTcoUrl(raw);
					id = expanded ? extractTweetIds(expanded)[0] : undefined;
				}
				if (!id) {
					return Response.json(
						{ ok: false, error: "invalid_url" },
						{ status: 400 },
					);
				}

				try {
					const data = await parseTweet(id);
					return Response.json({ ok: true, data });
				} catch (err) {
					if (err instanceof TweetError) {
						const status =
							err.code === "not_found" ||
							err.code === "tombstone" ||
							err.code === "no_media"
								? 404
								: err.code === "invalid_url"
									? 400
									: 502;
						return Response.json({ ok: false, error: err.code }, { status });
					}
					return Response.json(
						{ ok: false, error: "network" },
						{ status: 502 },
					);
				}
			},
		},
	},
});
