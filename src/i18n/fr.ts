import type { en } from "./en";

export const fr: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Téléchargeur de vidéos X",
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
		disclaimer:
			"Uniquement pour la sauvegarde personnelle et l’apprentissage. Respectez le droit d’auteur des créateurs : ne redistribuez pas sans autorisation.",
		license: "Open source sous MIT",
	},
};
