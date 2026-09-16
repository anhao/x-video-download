export const en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X Video Downloader",
		h1: "X (Twitter) Video Downloader",
		subtitle:
			"Paste a tweet link to download videos, GIFs and photos — up to 4K, no login required.",
	},
	input: {
		placeholder: "Paste tweet link(s), one per line…",
		parse: "Parse",
		parsing: "Parsing…",
		clear: "Clear",
		hint: "Supports x.com / twitter.com / t.co links · multiple links at once",
	},
	error: {
		emptyInput: "Please paste a tweet link first.",
		invalid_url: "No valid tweet link found. Check the URL and try again.",
		not_found: "Tweet not found. It may have been deleted or is not public.",
		tombstone: "This tweet is unavailable in your region or was removed.",
		no_media: "This tweet has no downloadable video or images.",
		rate_limited: "Too many requests. Please wait a moment and try again.",
		network:
			"Cannot reach X right now. Check your network or the Worker region.",
		unknown: "Something went wrong. Please try again.",
	},
	result: {
		download: "Download",
		preview: "Preview",
		copy: "Copy link",
		copied: "Copied!",
		gif: "GIF",
		hls: "HLS stream",
		hlsHint: "Original-quality HLS playlist (for players like IINA / VLC)",
		photo: "Photo",
		downloadPhoto: "Original",
		duration: "Duration",
		postedBy: "Posted by",
	},
	history: {
		title: "Recent",
		clear: "Clear",
		empty: "No history yet.",
	},
	seo: {
		title: "Twitter Video Downloader — Download X Videos in 4K, Free, No Login",
		description:
			"Free tool to download videos, GIFs and photos from X (Twitter) posts. All qualities up to 4K, no login, no API key.",
		keywords:
			"twitter video downloader, x video downloader, download twitter videos, save x video, twitter video download 4k, download x gif, twitter photo downloader, x media downloader",
	},
	footer: {
		tagline: "Fast, free, open-source media downloader for X (Twitter).",
		product: "Languages",
		resources: "Resources",
		followX: "Follow on X",
		source: "Source code",
		disclaimer:
			"For personal backup and learning only. Respect creators’ copyright — do not redistribute without permission.",
		license: "Open source under MIT",
	},
	sections: {
		howTitle: "How it works",
		steps: [
			{
				title: "Copy the link",
				desc: "In the X app or browser, tap Share → Copy link on the post.",
			},
			{
				title: "Paste & parse",
				desc: "Paste the link above and hit Parse — every quality is resolved instantly.",
			},
			{
				title: "Download",
				desc: "Pick a resolution and save the MP4 — up to 4K, no watermark.",
			},
		],
		featuresTitle: "Why this downloader",
		features: [
			{
				title: "No login, no API key",
				desc: "Reads X’s public syndication feed for public posts — nothing to configure.",
			},
			{
				title: "Up to 4K",
				desc: "Every MP4 variant the post offers, from 240p to 4K, with file sizes.",
			},
			{
				title: "Batch links",
				desc: "Paste multiple links at once — or just paste anywhere on the page.",
			},
			{
				title: "Videos, GIFs & photos",
				desc: "GIFs save as MP4 and photos download at original resolution.",
			},
			{
				title: "Fast edge proxy",
				desc: "Files stream through Cloudflare Workers — no server bottleneck.",
			},
			{
				title: "9 languages",
				desc: "English, 中文, 日本語, Español and more — clean pages, zero ads.",
			},
		],
		faqTitle: "FAQ",
		faqs: [
			{
				q: "How do I download an X (Twitter) video?",
				a: "Copy the post link, paste it into the search box and press Parse. Choose a quality and the MP4 saves straight to your device.",
			},
			{
				q: "Do I need an account or an API key?",
				a: "No. The tool reads X’s public syndication feed for public posts — there is nothing to sign up for.",
			},
			{
				q: "Which qualities are available?",
				a: "Every quality the post was uploaded in — typically 240p to 1080p, up to 4K for high-resolution uploads. An HLS playlist with the original stream is also offered.",
			},
			{
				q: "Are there watermarks or limits?",
				a: "Downloads are the original files: no watermark, no re-encoding, no queue. Please use them for personal backup only.",
			},
			{
				q: "Can I download GIFs and photos?",
				a: "Yes — animated GIFs save as MP4, and photos download at original resolution.",
			},
			{
				q: "Why does a link fail to parse?",
				a: "The post may be deleted, private, age-restricted or region-locked. Only public posts work — the error message tells you the exact reason.",
			},
		],
	},
};
