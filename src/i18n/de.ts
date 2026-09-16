import type { en } from "./en";

export const de: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X Video-Downloader",
		subtitle:
			"Tweet-Link einfügen und Videos, GIFs und Fotos herunterladen — bis 4K, ohne Anmeldung.",
	},
	input: {
		placeholder: "Tweet-Links einfügen, einer pro Zeile…",
		parse: "Analysieren",
		parsing: "Analysiere…",
		clear: "Leeren",
		hint: "Unterstützt x.com / twitter.com / t.co Links · mehrere gleichzeitig",
	},
	error: {
		emptyInput: "Bitte zuerst einen Tweet-Link einfügen.",
		invalid_url:
			"Kein gültiger Tweet-Link gefunden. URL prüfen und erneut versuchen.",
		not_found:
			"Tweet nicht gefunden. Er wurde vielleicht gelöscht oder ist nicht öffentlich.",
		tombstone:
			"Dieser Tweet ist in deiner Region nicht verfügbar oder wurde entfernt.",
		no_media: "Dieser Tweet enthält keine herunterladbaren Videos oder Bilder.",
		rate_limited: "Zu viele Anfragen. Bitte kurz warten und erneut versuchen.",
		network: "X ist gerade nicht erreichbar. Netzwerk prüfen.",
		unknown: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
	},
	result: {
		download: "Herunterladen",
		preview: "Vorschau",
		copy: "Link kopieren",
		copied: "Kopiert!",
		gif: "GIF",
		hls: "HLS-Stream",
		hlsHint: "HLS-Playlist in Originalqualität (für Player wie IINA / VLC)",
		photo: "Foto",
		downloadPhoto: "Original",
		duration: "Dauer",
		postedBy: "Veröffentlicht von",
	},
	history: {
		title: "Zuletzt",
		clear: "Leeren",
		empty: "Noch kein Verlauf.",
	},
	seo: {
		title: "X Video-Downloader — X- (Twitter-) Videos in 4K herunterladen",
		description:
			"Kostenloses Tool zum Herunterladen von Videos, GIFs und Fotos aus X- (Twitter-) Beiträgen. Alle Qualitäten bis 4K, ohne Anmeldung, ohne API-Schlüssel.",
	},
	footer: {
		disclaimer:
			"Nur für persönliche Sicherung und Lernzwecke. Urheberrechte respektieren — nicht ohne Erlaubnis weiterverbreiten.",
		license: "Open Source unter MIT",
	},
};
