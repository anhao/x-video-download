import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { resolveVariantUrl, TWITTER_UA, TweetError } from "#/lib/twitter";

/**
 * Streaming proxy for X media with Content-Disposition: attachment.
 * Accepts only (tweet id, media index, variant index) tuples resolved from the
 * syndication API — never an arbitrary URL — so it can't be abused as an open proxy.
 * Pass ?mode=preview to serve inline (with Range support) for the <video> player.
 */
export const Route = createFileRoute("/api/download")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const sp = new URL(request.url).searchParams;
				const t = sp.get("t") ?? "";
				const m = Number(sp.get("m") ?? "0");
				const v = Number(sp.get("v") ?? "0");
				const name = sp.get("name") ?? "media";
				const preview = sp.get("mode") === "preview";

				if (
					!/^\d{4,25}$/.test(t) ||
					!Number.isInteger(m) ||
					!Number.isInteger(v) ||
					m < 0 ||
					v < 0 ||
					m > 8 ||
					v > 12
				) {
					return new Response("Bad request", { status: 400 });
				}

				let url: string;
				try {
					url = await resolveVariantUrl(t, m, v);
				} catch (err) {
					const status =
						err instanceof TweetError &&
						(err.code === "not_found" || err.code === "tombstone")
							? 404
							: 502;
					return new Response("Failed to resolve tweet", { status });
				}
				if (!url) return new Response("Not found", { status: 404 });

				const range = request.headers.get("range");
				let upstream: Response;
				try {
					upstream = await fetch(url, {
						headers: { "user-agent": TWITTER_UA, ...(range ? { range } : {}) },
					});
				} catch {
					return new Response("Upstream fetch failed", { status: 502 });
				}
				if (!upstream.ok && upstream.status !== 206) {
					return new Response(`Upstream error ${upstream.status}`, {
						status: 502,
					});
				}

				const headers = new Headers();
				for (const h of [
					"content-type",
					"content-length",
					"content-range",
					"accept-ranges",
				]) {
					const val = upstream.headers.get(h);
					if (val) headers.set(h, val);
				}
				if (!preview) {
					const safe = name.replace(/[^\w.-]+/g, "_").slice(0, 120) || "media";
					headers.set(
						"content-disposition",
						`attachment; filename="${safe}"; filename*=UTF-8''${encodeURIComponent(name)}`,
					);
				} else {
					headers.set("content-disposition", "inline");
				}
				headers.set("cache-control", "private, max-age=3600");
				headers.set("x-content-type-options", "nosniff");

				return new Response(upstream.body ?? null, {
					status: upstream.status,
					headers,
				});
			},
		},
	},
});
