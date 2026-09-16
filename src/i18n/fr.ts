import type { en } from "./en";

export const fr: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Téléchargeur de vidéos X",
		h1: "Téléchargeur de vidéos X (Twitter)",
		subtitle:
			"Collez le lien d’un tweet pour télécharger vidéos, GIFs et photos — jusqu’en 4K, sans connexion.",
	},
	input: {
		placeholder: "Collez des liens de tweets, un par ligne…",
		parse: "Analyser",
		parsing: "Analyse…",
		clear: "Effacer",
		hint: "Liens x.com / twitter.com / t.co acceptés · plusieurs à la fois",
	},
	error: {
		emptyInput: "Collez d’abord un lien de tweet.",
		invalid_url:
			"Aucun lien de tweet valide trouvé. Vérifiez l’URL et réessayez.",
		not_found:
			"Tweet introuvable. Il a peut-être été supprimé ou n’est pas public.",
		tombstone:
			"Ce tweet n’est pas disponible dans votre région ou a été supprimé.",
		no_media: "Ce tweet ne contient ni vidéo ni image téléchargeable.",
		rate_limited: "Trop de requêtes. Patientez un instant et réessayez.",
		network: "Impossible de joindre X pour le moment. Vérifiez votre réseau.",
		unknown: "Une erreur est survenue. Veuillez réessayer.",
	},
	result: {
		download: "Télécharger",
		preview: "Aperçu",
		copy: "Copier le lien",
		copied: "Copié !",
		gif: "GIF",
		hls: "Flux HLS",
		hlsHint: "Playlist HLS en qualité originale (pour IINA / VLC, etc.)",
		photo: "Photo",
		downloadPhoto: "Original",
		duration: "Durée",
		postedBy: "Publié par",
	},
	history: {
		title: "Récents",
		clear: "Effacer",
		empty: "Aucun historial.",
	},
	seo: {
		title:
			"Téléchargeur de vidéos X — Téléchargez les vidéos X (Twitter) en 4K",
		description:
			"Outil gratuit pour télécharger vidéos, GIFs et photos de posts X (Twitter). Toutes les qualités jusqu’à 4K, sans connexion ni clé API.",
	},
	footer: {
		tagline:
			"Téléchargeur de médias X (Twitter) rapide, gratuit et open source.",
		product: "Langues",
		resources: "Ressources",
		followX: "Suivre sur X",
		source: "Code source",
		disclaimer:
			"Uniquement pour la sauvegarde personnelle et l’apprentissage. Respectez le droit d’auteur des créateurs : ne redistribuez pas sans autorisation.",
		license: "Open source sous MIT",
	},
	sections: {
		howTitle: "Comment ça marche",
		steps: [
			{
				title: "Copiez le lien",
				desc: "Dans l’app X ou le navigateur, appuyez sur Partager → Copier le lien.",
			},
			{
				title: "Collez et analysez",
				desc: "Collez le lien ci-dessus et appuyez sur Analyser ; chaque qualité est résolue instantanément.",
			},
			{
				title: "Téléchargez",
				desc: "Choisissez une résolution et enregistrez le MP4 — jusqu’en 4K, sans filigrane.",
			},
		],
		featuresTitle: "Pourquoi ce téléchargeur",
		features: [
			{
				title: "Sans connexion ni clé API",
				desc: "Lit le flux public de X pour les posts publics — rien à configurer.",
			},
			{
				title: "Jusqu’en 4K",
				desc: "Toutes les variantes MP4 du post, de 240p à 4K, avec tailles de fichier.",
			},
			{
				title: "Liens en lot",
				desc: "Collez plusieurs liens à la fois — ou collez n’importe où sur la page.",
			},
			{
				title: "Vidéos, GIFs et photos",
				desc: "Les GIF sont enregistrés en MP4 et les photos téléchargées en résolution originale.",
			},
			{
				title: "Proxy edge rapide",
				desc: "Les fichiers transitent par Cloudflare Workers, sans goulot d’étranglement.",
			},
			{
				title: "9 langues",
				desc: "English, 中文, 日本語, Español et plus — pages propres, zéro pub.",
			},
		],
		faqTitle: "FAQ",
		faqs: [
			{
				q: "Comment télécharger une vidéo X (Twitter) ?",
				a: "Copiez le lien du post, collez-le dans la barre de recherche et appuyez sur Analyser. Choisissez une qualité et le MP4 s’enregistre directement sur votre appareil.",
			},
			{
				q: "Faut-il un compte ou une clé API ?",
				a: "Non. L’outil lit le flux public de X pour les posts publics — aucune inscription nécessaire.",
			},
			{
				q: "Quelles qualités sont disponibles ?",
				a: "Toutes les qualités du post, généralement de 240p à 1080p, jusqu’à 4K pour les envois haute résolution. Une playlist HLS du flux original est aussi proposée.",
			},
			{
				q: "Y a-t-il des filigranes ou des limites ?",
				a: "Les téléchargements sont les fichiers originaux : sans filigrane, sans réencodage, sans file d’attente. Usage personnel uniquement.",
			},
			{
				q: "Peut-on télécharger des GIFs et des photos ?",
				a: "Oui — les GIF sont enregistrés en MP4 et les photos téléchargées en résolution originale.",
			},
			{
				q: "Pourquoi un lien échoue-t-il ?",
				a: "Le post est peut-être supprimé, privé, restreint par âge ou bloqué par région. Seuls les posts publics fonctionnent — le message d’erreur indique la raison exacte.",
			},
		],
	},
};
