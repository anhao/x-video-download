import type { en } from "./en";

export const es: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Descargador de vídeos de X",
		h1: "Descargador de vídeos de X (Twitter)",
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
			"Herramienta online gratuita para descargar vídeos de X (Twitter) en MP4 — HD hasta 4K, sin marca de agua y sin registro. Pega el enlace: vídeos, GIFs y fotos, en iPhone y Android.",
		keywords:
			"descargador de vídeos de x, descargar videos de twitter online gratis, guardar video de twitter, video de twitter a mp4, sin marca de agua, descargar video twitter hd 4k, descargar gif de x, x video downloader",
	},
	footer: {
		tagline:
			"Descargador de medios para X (Twitter) rápido, gratuito y de código abierto.",
		product: "Idiomas",
		resources: "Recursos",
		followX: "Seguir en X",
		source: "Código fuente",
		disclaimer:
			"Solo para copia de seguridad personal y aprendizaje. Respeta los derechos de autor: no redistribuyas sin permiso.",
		license: "Código abierto bajo MIT",
	},
	sections: {
		howTitle: "Cómo funciona",
		steps: [
			{
				title: "Copia el enlace",
				desc: "En la app de X o el navegador, toca Compartir → Copiar enlace.",
			},
			{
				title: "Pega y analiza",
				desc: "Pega el enlace arriba y pulsa Analizar; cada calidad se resuelve al instante.",
			},
			{
				title: "Descarga",
				desc: "Elige una resolución y guarda el MP4 — hasta 4K, sin marca de agua.",
			},
		],
		featuresTitle: "Por qué este descargador",
		features: [
			{
				title: "Sin login ni clave de API",
				desc: "Lee el feed público de X para publicaciones públicas — nada que configurar.",
			},
			{
				title: "Hasta 4K",
				desc: "Todas las variantes MP4 del post, de 240p a 4K, con tamaños de archivo.",
			},
			{
				title: "Enlaces en lote",
				desc: "Pega varios enlaces a la vez — o pega en cualquier parte de la página.",
			},
			{
				title: "Vídeos, GIFs y fotos",
				desc: "Los GIF se guardan como MP4 y las fotos se descargan en resolución original.",
			},
			{
				title: "Proxy de borde rápido",
				desc: "Los archivos se transmiten por Cloudflare Workers, sin cuellos de botella.",
			},
			{
				title: "9 idiomas",
				desc: "English, 中文, 日本語, Español y más — páginas limpias, sin anuncios.",
			},
		],
		faqTitle: "Preguntas frecuentes",
		faqs: [
			{
				q: "¿Cómo descargo un vídeo de X (Twitter)?",
				a: "Copia el enlace del post, pégalo en el buscador y pulsa Analizar. Elige una calidad y el MP4 se guarda directo en tu dispositivo.",
			},
			{
				q: "¿Cómo guardo un vídeo en iPhone o Android?",
				a: "En iPhone, toca una resolución: Safari descarga el MP4 a Archivos, o mantén pulsada la vista previa y elige “Guardar en Fotos”. En Android se guarda directo en la galería. Funciona en cualquier navegador móvil, sin app.",
			},
			{
				q: "¿Necesito cuenta o clave de API?",
				a: "No. La herramienta lee el feed público de X para posts públicos — no hay que registrarse.",
			},
			{
				q: "¿Qué calidades hay disponibles?",
				a: "Todas las calidades con las que se subió el post — normalmente de 240p a 1080p, hasta 4K en subidas de alta resolución. También se ofrece una playlist HLS con el stream original.",
			},
			{
				q: "¿Hay marcas de agua o límites?",
				a: "Las descargas son los archivos originales: sin marca de agua, sin recodificar, sin colas. Úsalo solo para copia personal.",
			},
			{
				q: "¿Puedo descargar GIFs y fotos?",
				a: "Sí — los GIF se guardan como MP4 y las fotos se descargan en resolución original.",
			},
			{
				q: "¿Por qué falla un enlace?",
				a: "El post puede estar borrado, privado, con restricción de edad o bloqueado por región. Solo funcionan los públicos — el mensaje de error indica el motivo exacto.",
			},
		],
	},
};
