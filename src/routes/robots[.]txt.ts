import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { robotsTxt, siteOrigin } from "#/lib/seo";

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const origin = siteOrigin(new URL(request.url).origin);
				return new Response(robotsTxt(origin), {
					headers: {
						"content-type": "text/plain; charset=utf-8",
						"cache-control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
