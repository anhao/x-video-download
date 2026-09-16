import type { en } from "./en";

export const de: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X Video-Downloader",
		h1: "X (Twitter) Video-Downloader",
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
		tagline:
			"Schneller, kostenloser Open-Source-Media-Downloader für X (Twitter).",
		product: "Sprachen",
		resources: "Ressourcen",
		followX: "Auf X folgen",
		source: "Quellcode",
		disclaimer:
			"Nur für persönliche Sicherung und Lernzwecke. Urheberrechte respektieren — nicht ohne Erlaubnis weiterverbreiten.",
		license: "Open Source unter MIT",
	},
	sections: {
		howTitle: "So funktioniert es",
		steps: [
			{
				title: "Link kopieren",
				desc: "In der X-App oder im Browser auf dem Post „Teilen → Link kopieren“.",
			},
			{
				title: "Einfügen & analysieren",
				desc: "Link oben einfügen und auf Analysieren klicken — alle Qualitäten werden sofort ermittelt.",
			},
			{
				title: "Herunterladen",
				desc: "Auflösung wählen und MP4 speichern — bis 4K, ohne Wasserzeichen.",
			},
		],
		featuresTitle: "Warum dieser Downloader",
		features: [
			{
				title: "Kein Login, kein API-Schlüssel",
				desc: "Liest Xs öffentlichen Syndication-Feed für öffentliche Posts — nichts zu konfigurieren.",
			},
			{
				title: "Bis 4K",
				desc: "Jede MP4-Variante des Posts, von 240p bis 4K, mit Dateigrößen.",
			},
			{
				title: "Batch-Links",
				desc: "Mehrere Links gleichzeitig einfügen — oder irgendwo auf der Seite einfügen.",
			},
			{
				title: "Videos, GIFs & Fotos",
				desc: "GIFs werden als MP4 gespeichert, Fotos in Originalauflösung heruntergeladen.",
			},
			{
				title: "Schneller Edge-Proxy",
				desc: "Dateien streamen über Cloudflare Workers — ohne Server-Flaschenhals.",
			},
			{
				title: "9 Sprachen",
				desc: "English, 中文, 日本語, Español und mehr — saubere Seiten, keine Werbung.",
			},
		],
		faqTitle: "FAQ",
		faqs: [
			{
				q: "Wie lade ich ein X- (Twitter-) Video herunter?",
				a: "Post-Link kopieren, oben einfügen und auf Analysieren klicken. Qualität wählen — das MP4 wird direkt gespeichert.",
			},
			{
				q: "Brauche ich ein Konto oder API-Schlüssel?",
				a: "Nein. Das Tool liest Xs öffentlichen Feed für öffentliche Posts — keine Registrierung nötig.",
			},
			{
				q: "Welche Qualitäten sind verfügbar?",
				a: "Alle Qualitäten des Posts — meist 240p bis 1080p, bei hohen Auflösungen bis 4K. Zusätzlich gibt es eine HLS-Playlist des Originalstreams.",
			},
			{
				q: "Gibt es Wasserzeichen oder Limits?",
				a: "Downloads sind die Originaldateien: ohne Wasserzeichen, ohne Neukodierung, ohne Warteschlange. Nur für persönliche Sicherung verwenden.",
			},
			{
				q: "Kann ich GIFs und Fotos herunterladen?",
				a: "Ja — GIFs werden als MP4 gespeichert, Fotos in Originalauflösung heruntergeladen.",
			},
			{
				q: "Warum schlägt ein Link fehl?",
				a: "Der Post wurde vielleicht gelöscht, ist privat, altersbeschränkt oder regionsgesperrt. Nur öffentliche Posts funktionieren — die Fehlermeldung nennt den genauen Grund.",
			},
		],
	},
};
