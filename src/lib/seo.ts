import { de } from "#/i18n/de";
import { en } from "#/i18n/en";
import { es } from "#/i18n/es";
import { fr } from "#/i18n/fr";
import { ja } from "#/i18n/ja";
import { ko } from "#/i18n/ko";
import { pt } from "#/i18n/pt";
import { ru } from "#/i18n/ru";
import { zh } from "#/i18n/zh";
import type { Locale } from "#/lib/i18n";

const DICTS = { en, zh, ja, es, pt, ko, fr, de, ru } as const;

/**
 * Absolute site origin for SEO URLs, injected at build time (VITE_SITE_URL).
 * When unset, relative URLs are emitted — crawlers resolve them against the
 * request host, so local dev needs no configuration.
 */
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/+$/, "");

/** Prefer the configured canonical origin; fall back to the request host. */
export function siteOrigin(fallback: string): string {
	return SITE_URL || fallback;
}

const OG_LOCALE: Record<Locale, string> = {
	en: "en_US",
	zh: "zh_CN",
	ja: "ja_JP",
	es: "es_ES",
	pt: "pt_BR",
	ko: "ko_KR",
	fr: "fr_FR",
	de: "de_DE",
	ru: "ru_RU",
};

const HREFLANG: Record<Locale, string> = {
	en: "en",
	zh: "zh-CN",
	ja: "ja",
	es: "es",
	pt: "pt-BR",
	ko: "ko",
	fr: "fr",
	de: "de",
	ru: "ru",
};

export function localePath(locale: Locale): string {
	return locale === "en" ? "/" : `/${locale}`;
}

export const ALL_LOCALES: Locale[] = [
	"en",
	"zh",
	"ja",
	"es",
	"pt",
	"ko",
	"fr",
	"de",
	"ru",
];

/** Route head: title, description, OG/Twitter cards, canonical, hreflang. */
export function seoMeta(locale: Locale) {
	const dict = DICTS[locale].seo;
	const url = `${SITE_URL}${localePath(locale)}`;
	const image = `${SITE_URL}/og.png`;

	return {
		meta: [
			{ title: dict.title },
			{ name: "description", content: dict.description },

			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: "X Video Downloader" },
			{ property: "og:title", content: dict.title },
			{ property: "og:description", content: dict.description },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:type", content: "image/png" },
			{ property: "og:locale", content: OG_LOCALE[locale] },

			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: "@anhao_ai" },
			{ name: "twitter:title", content: dict.title },
			{ name: "twitter:description", content: dict.description },
			{ name: "twitter:image", content: image },
			{ name: "twitter:image:alt", content: dict.title },
		],
		links: [
			{ rel: "canonical", href: url },
			...ALL_LOCALES.map((l) => ({
				rel: "alternate",
				hreflang: HREFLANG[l],
				href: `${SITE_URL}${localePath(l)}`,
			})),
			{ rel: "alternate", hreflang: "x-default", href: SITE_URL || "/" },
		],
	};
}

/** WebApplication structured data, injected as JSON-LD in the page shell. */
export function jsonLd(locale: Locale): string {
	const dict = DICTS[locale].seo;
	return JSON.stringify({
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "X Video Downloader",
		description: dict.description,
		...(SITE_URL ? { url: SITE_URL, image: `${SITE_URL}/og.png` } : {}),
		applicationCategory: "MultimediaApplication",
		operatingSystem: "Web",
		browserRequirements: "Requires JavaScript",
		inLanguage: HREFLANG[locale],
		isAccessibleForFree: true,
		featureList: DICTS[locale].sections.features.map((f) => f.title),
		author: {
			"@type": "Person",
			name: "anhao",
			url: "https://github.com/anhao",
		},
		offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
	});
}

/** FAQPage structured data for rich results (one per locale). */
export function faqJsonLd(locale: Locale): string {
	return JSON.stringify({
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: DICTS[locale].sections.faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	});
}

export function sitemapXml(origin: string): string {
	const lastmod = (import.meta.env.VITE_BUILD_DATE ?? "").slice(0, 10);
	const entries = ALL_LOCALES.map((l) => {
		const alternates = [
			...ALL_LOCALES.map(
				(alt) =>
					`    <xhtml:link rel="alternate" hreflang="${HREFLANG[alt]}" href="${origin}${localePath(alt)}"/>`,
			),
			`    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/>`,
		].join("\n");
		return `  <url>\n    <loc>${origin}${localePath(l)}</loc>\n${alternates}\n    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ""}  </url>`;
	}).join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
}

export function robotsTxt(origin: string): string {
	return `User-agent: *
Disallow: /api/

Sitemap: ${origin}/sitemap.xml
`;
}
