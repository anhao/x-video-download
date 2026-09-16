import { createContext, useCallback, useContext, useEffect } from "react";
import { de } from "#/i18n/de";
import { en } from "#/i18n/en";
import { es } from "#/i18n/es";
import { fr } from "#/i18n/fr";
import { ja } from "#/i18n/ja";
import { ko } from "#/i18n/ko";
import { pt } from "#/i18n/pt";
import { ru } from "#/i18n/ru";
import { zh } from "#/i18n/zh";

export type Locale =
	| "en"
	| "zh"
	| "ja"
	| "es"
	| "pt"
	| "ko"
	| "fr"
	| "de"
	| "ru";

export const LOCALES: { code: Locale; label: string; path: string }[] = [
	{ code: "en", label: "English", path: "/" },
	{ code: "zh", label: "中文", path: "/zh" },
	{ code: "ja", label: "日本語", path: "/ja" },
	{ code: "es", label: "Español", path: "/es" },
	{ code: "pt", label: "Português", path: "/pt" },
	{ code: "ko", label: "한국어", path: "/ko" },
	{ code: "fr", label: "Français", path: "/fr" },
	{ code: "de", label: "Deutsch", path: "/de" },
	{ code: "ru", label: "Русский", path: "/ru" },
];

const dicts = { en, zh, ja, es, pt, ko, fr, de, ru };

/** Nested lookup with English fallback so a missing key never renders raw. */
function lookup(dict: unknown, base: typeof en, key: string): string {
	const resolve = (source: unknown): unknown =>
		key.split(".").reduce<unknown>((acc, part) => {
			if (
				acc &&
				typeof acc === "object" &&
				part in (acc as Record<string, unknown>)
			) {
				return (acc as Record<string, unknown>)[part];
			}
			return undefined;
		}, source);
	const value = resolve(dict) ?? resolve(base);
	return typeof value === "string" ? value : key;
}

type I18nContextValue = {
	/** Source of truth is the URL path (/, /zh, /ja) — good for SEO. */
	locale: Locale;
	t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
	locale: "en",
	t: (key) => key,
});

export function I18nProvider({
	locale,
	children,
}: {
	locale: Locale;
	children: React.ReactNode;
}) {
	const t = useCallback(
		(key: string) => lookup(dicts[locale], en, key),
		[locale],
	);

	useEffect(() => {
		document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
		try {
			localStorage.setItem("xvd-locale", locale);
		} catch {
			// storage blocked — path remains the source of truth anyway
		}
	}, [locale]);

	return (
		<I18nContext.Provider value={{ locale, t }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useI18n() {
	return useContext(I18nContext);
}
