import type { en } from "./en";

export const es: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Descargador de vídeos de X",
		subtitle:
			"Pega el enlace de un tweet para descargar vídeos, GIFs y fotos — hasta 4K, sin iniciar sesión.",
	},
	input: {
		placeholder: "Pega enlaces de tweets, uno por línea…",
		parse: "Analizar",
		parsing: "Analizando…",
		clear: "Limpiar",
		hint: "Admite enlaces de x.com / twitter.com / t.co · varios a la vez",
	},
	error: {
		emptyInput: "Primero pega el enlace de un tweet.",
		invalid_url:
			"No se encontró un enlace de tweet válido. Comprueba la URL e inténtalo de nuevo.",
		not_found:
			"Tweet no encontrado. Puede que se haya eliminado o no sea público.",
		tombstone: "Este tweet no está disponible en tu región o fue eliminado.",
		no_media: "Este tweet no tiene vídeos ni imágenes descargables.",
		rate_limited:
			"Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.",
		network:
			"No se puede conectar con X ahora. Comprueba tu red o la región del Worker.",
		unknown: "Algo salió mal. Inténtalo de nuevo.",
	},
	result: {
		download: "Descargar",
		preview: "Vista previa",
		copy: "Copiar enlace",
		copied: "¡Copiado!",
		gif: "GIF",
		hls: "Stream HLS",
		hlsHint:
			"Lista HLS con calidad original (para reproductores como IINA / VLC)",
		photo: "Foto",
		downloadPhoto: "Original",
		duration: "Duración",
		postedBy: "Publicado por",
	},
	history: {
		title: "Recientes",
		clear: "Limpiar",
		empty: "Aún no hay historial.",
	},
	seo: {
		title: "Descargador de vídeos de X — Descarga vídeos de X (Twitter) en 4K",
		description:
			"Herramienta gratuita para descargar vídeos, GIFs y fotos de publicaciones de X (Twitter). Todas las calidades hasta 4K, sin inicio de sesión y sin clave de API.",
	},
	footer: {
		disclaimer:
			"Solo para copia de seguridad personal y aprendizaje. Respeta los derechos de autor de los creadores: no redistribuyas sin permiso.",
		license: "Código abierto bajo MIT",
	},
};
