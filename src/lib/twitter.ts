/**
 * X (Twitter) media parsing via the public syndication API — no auth key required.
 *
 * The request-token scheme and feature flags are adapted from the MIT-licensed
 * react-tweet project (https://github.com/vercel/react-tweet). An optional
 * `XVD_BEARER_TOKEN` env var can be provided to switch to the v2 API instead.
 */

const SYNDICATION_URL = "https://cdn.syndication.twimg.com/tweet-result";

const FEATURES = [
	"tfw_timeline_list:",
	"tfw_follower_count_sunset:true",
	"tfw_tweet_edit_backend:on",
	"tfw_refsrc_session:on",
	"tfw_fosnr_soft_interventions_enabled:on",
	"tfw_show_birdwatch_pivots_enabled:on",
	"tfw_show_business_verified_badge:on",
	"tfw_duplicate_scribes_to_settings:on",
	"tfw_use_profile_image_shape_enabled:on",
	"tfw_show_blue_verified_badge:on",
	"tfw_legacy_timeline_sunset:true",
	"tfw_show_gov_verified_badge:on",
	"tfw_show_business_affiliate_badge:on",
	"tfw_tweet_edit_frontend:on",
].join(";");

const UA =
	"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export type ErrorCode =
	| "invalid_url"
	| "not_found"
	| "tombstone"
	| "no_media"
	| "rate_limited"
	| "network";

export class TweetError extends Error {
	code: ErrorCode;
	constructor(code: ErrorCode, message?: string) {
		super(message ?? code);
		this.code = code;
	}
}

export interface TweetUser {
	name: string;
	screenName: string;
	avatar: string;
}

export type VariantKind = "mp4" | "hls" | "photo";

export interface MediaVariant {
	kind: VariantKind;
	url: string;
	/** Human label, e.g. "1080p" or "HLS" */
	label: string;
	width?: number;
	height?: number;
	bitrate?: number;
	/** File size in bytes when known (HEAD preflight) */
	bytes?: number;
}

export interface MediaItem {
	type: "video" | "gif" | "photo";
	thumb: string;
	width: number;
	height: number;
	durationMs?: number;
	variants: MediaVariant[];
}

export interface ParseResult {
	id: string;
	url: string;
	text: string;
	createdAt: string;
	user: TweetUser;
	media: MediaItem[];
}

interface SyndicationVariant {
	bitrate?: number;
	content_type?: string;
	url: string;
}

interface SyndicationMedia {
	type: string;
	media_url_https: string;
	original_info?: { width?: number; height?: number };
	video_info?: { duration_millis?: number; variants?: SyndicationVariant[] };
}

interface SyndicationTweet {
	__typename?: string;
	id_str: string;
	text: string;
	created_at: string;
	user?: {
		name?: string;
		screen_name?: string;
		profile_image_url_https?: string;
	};
	mediaDetails?: SyndicationMedia[];
}

/** Port of react-tweet's base-36 token scheme. */
export function tweetToken(id: string): string {
	return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

/** Extract unique tweet ids from arbitrary pasted text, preserving order. */
export function extractTweetIds(input: string): string[] {
	const re =
		/(?:x|twitter)\.com\/[A-Za-z0-9_]{1,20}\/status(?:es)?\/(\d{4,25})/g;
	const ids: string[] = [];
	for (const m of input.matchAll(re)) {
		if (!ids.includes(m[1])) ids.push(m[1]);
	}
	return ids;
}

export function isTcoUrl(input: string): boolean {
	return /^https?:\/\/t\.co\/[A-Za-z0-9]+/i.test(input.trim());
}

/** Follow a t.co short link to its final destination. */
export async function expandTcoUrl(input: string): Promise<string | null> {
	try {
		const res = await fetch(input.trim(), {
			redirect: "follow",
			headers: { "user-agent": UA },
			signal: AbortSignal.timeout(8000),
		});
		return res.url || null;
	} catch {
		return null;
	}
}

const cache = new Map<string, { at: number; data: SyndicationTweet }>();
const CACHE_TTL = 10 * 60_000;

/** In-memory cache so the download endpoint can resolve variants without re-fetching. */
export function getCachedTweet(id: string): SyndicationTweet | undefined {
	const hit = cache.get(id);
	if (hit && Date.now() - hit.at < CACHE_TTL) return hit.data;
	cache.delete(id);
	return undefined;
}

async function fetchSyndication(id: string): Promise<SyndicationTweet> {
	const cached = getCachedTweet(id);
	if (cached) return cached;

	const params = new URLSearchParams({
		id,
		lang: "en",
		features: FEATURES,
		token: tweetToken(id),
	});

	let res: Response;
	try {
		res = await fetch(`${SYNDICATION_URL}?${params}`, {
			headers: { "user-agent": UA, accept: "application/json" },
			signal: AbortSignal.timeout(10_000),
		});
	} catch {
		throw new TweetError("network");
	}

	if (res.status === 404) throw new TweetError("not_found");
	if (res.status === 429) throw new TweetError("rate_limited");
	if (!res.ok)
		throw new TweetError("network", `syndication status ${res.status}`);

	const text = await res.text();
	let data: SyndicationTweet;
	try {
		data = JSON.parse(text) as SyndicationTweet;
	} catch {
		throw new TweetError("not_found");
	}

	if (data.__typename === "TweetTombstone") throw new TweetError("tombstone");
	if (!data || Object.keys(data).length === 0)
		throw new TweetError("not_found");

	cache.set(id, { at: Date.now(), data });
	return data;
}

/** Quality label from the shorter edge so portrait videos map correctly. */
function qualityLabel(width?: number, height?: number): string {
	if (!width || !height) return "video";
	const m = Math.min(width, height);
	if (m >= 2160) return "4K";
	if (m >= 1440) return "2K";
	if (m >= 1080) return "1080p";
	if (m >= 720) return "720p";
	if (m >= 480) return "480p";
	if (m >= 360) return "360p";
	return "240p";
}

/** Resolution embedded in twimg paths like /vid/avc1/1280x720/xxxx.mp4 */
function resolutionFromUrl(
	url: string,
): { width: number; height: number } | null {
	const m = url.match(/\/(\d{2,5})x(\d{2,5})\//);
	if (!m) return null;
	return { width: Number(m[1]), height: Number(m[2]) };
}

function origImageUrl(url: string): string {
	try {
		const u = new URL(url);
		u.searchParams.set("name", "orig");
		return u.href;
	} catch {
		return url;
	}
}

async function prefillSizes(variants: MediaVariant[]): Promise<void> {
	const targets = variants.filter((v) => v.kind === "mp4" && !v.bytes);
	await Promise.allSettled(
		targets.map(async (v) => {
			const res = await fetch(v.url, {
				method: "HEAD",
				headers: { "user-agent": UA },
				signal: AbortSignal.timeout(5000),
			});
			const len = res.headers.get("content-length");
			if (len) v.bytes = Number(len);
		}),
	);
}

export async function parseTweet(id: string): Promise<ParseResult> {
	const data = await fetchSyndication(id);

	const media: MediaItem[] = (data.mediaDetails ?? []).map((m) => {
		const width = m.original_info?.width ?? 0;
		const height = m.original_info?.height ?? 0;
		const base = {
			thumb: m.media_url_https,
			width,
			height,
		};

		if (m.type === "photo") {
			return {
				...base,
				type: "photo" as const,
				variants: [
					{
						kind: "photo" as const,
						url: origImageUrl(m.media_url_https),
						label: `${width}×${height}`,
						width,
						height,
					},
				],
			};
		}

		const raw = m.video_info?.variants ?? [];
		const mp4s: MediaVariant[] = raw
			.filter((v) => v.content_type === "video/mp4" && v.url)
			.map((v) => {
				const res = resolutionFromUrl(v.url);
				return {
					kind: "mp4" as const,
					url: v.url,
					bitrate: v.bitrate,
					width: res?.width,
					height: res?.height,
					label: qualityLabel(res?.width, res?.height),
				};
			})
			.sort(
				(a, b) =>
					(b.width ?? 0) - (a.width ?? 0) ||
					(b.bitrate ?? 0) - (a.bitrate ?? 0),
			);

		const hls = raw.find(
			(v) => v.content_type === "application/x-mpegURL" && v.url,
		);
		const variants: MediaVariant[] = [...mp4s];
		if (hls && mp4s.length > 0) {
			variants.push({
				kind: "hls",
				url: hls.url,
				label: "HLS",
				width,
				height,
			});
		}

		return {
			...base,
			type: m.type === "animated_gif" ? ("gif" as const) : ("video" as const),
			durationMs: m.video_info?.duration_millis,
			variants,
		};
	});

	if (media.length === 0) throw new TweetError("no_media");

	await prefillSizes(media.flatMap((m) => m.variants));

	return {
		id,
		url: `https://x.com/i/status/${id}`,
		text: data.text ?? "",
		createdAt: data.created_at ?? "",
		user: {
			name: data.user?.name ?? "unknown",
			screenName: data.user?.screen_name ?? "unknown",
			avatar:
				data.user?.profile_image_url_https?.replace("_normal.", "_bigger.") ??
				"",
		},
		media,
	};
}

const ALLOWED_HOST_SUFFIX = ".twimg.com";

/** Resolve (tweetId, mediaIndex, variantIndex) into a download URL, or null if invalid. */
export async function resolveVariantUrl(
	tweetId: string,
	mediaIndex: number,
	variantIndex: number,
): Promise<string> {
	const data = await fetchSyndication(tweetId);
	const media = data.mediaDetails?.[mediaIndex];
	if (!media) return "";

	const raw = media.video_info?.variants ?? [];
	const mp4s = raw
		.filter((v) => v.content_type === "video/mp4" && v.url)
		.sort((a, b) => {
			const ra = resolutionFromUrl(a.url);
			const rb = resolutionFromUrl(b.url);
			return (
				(rb?.width ?? 0) - (ra?.width ?? 0) ||
				(b.bitrate ?? 0) - (a.bitrate ?? 0)
			);
		});

	let url: string | undefined;
	if (media.type === "photo") {
		url = origImageUrl(media.media_url_https);
	} else if (variantIndex < mp4s.length) {
		url = mp4s[variantIndex].url;
	} else if (variantIndex === mp4s.length) {
		// parseTweet appends the HLS master right after the mp4 variants.
		url = raw.find((v) => v.content_type === "application/x-mpegURL")?.url;
	}
	if (!url) return "";

	// Only proxy known X CDN hosts — never an arbitrary URL.
	try {
		const host = new URL(url).hostname;
		if (!host.endsWith(ALLOWED_HOST_SUFFIX)) return "";
	} catch {
		return "";
	}
	return url;
}

export const TWITTER_UA = UA;
