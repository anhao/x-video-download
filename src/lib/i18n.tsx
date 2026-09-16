import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { en } from "#/i18n/en";
import { ja } from "#/i18n/ja";
import { zh } from "#/i18n/zh";

export type Locale = "en" | "zh" | "ja";

export const LOCALES: { code: Locale; label: string }[] = [
	{ code: "en", label: "English" },
	{ code: "zh", label: "中文" },
	{ code: "ja", label: "日本語" },
];

type Dict = typeof en;
const dicts: Record<Locale, Dict> = { en, zh, ja };

const STORAGE_KEY = "xvd-locale";

function detectLocale(): Locale {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === "zh" || saved === "ja" || saved === "en") return saved;
	} catch {
		// SSR or storage blocked
	}
	const nav =
		typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
	if (nav.startsWith("zh")) return "zh";
	if (nav.startsWith("ja")) return "ja";
	return "en";
}

type I18nContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
	locale: "en",
	setLocale: () => {},
	t: (key) => key,
});

/** Nested lookup with English fallback so a missing key never renders raw. */
function lookup(dict: unknown, base: Dict, key: string): string {
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

export function I18nProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>("en");

	// Detect after mount to avoid SSR hydration mismatch.
	useEffect(() => {
		setLocaleState(detectLocale());
	}, []);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// storage blocked — keep in-memory only
		}
	}, []);

	const t = useCallback(
		(key: string) => lookup(dicts[locale], en, key),
		[locale],
	);

	useEffect(() => {
		document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
	}, [locale]);

	return (
		<I18nContext.Provider value={{ locale, setLocale, t }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useI18n() {
	return useContext(I18nContext);
}
