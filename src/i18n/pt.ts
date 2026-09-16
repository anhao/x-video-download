import type { en } from "./en";

export const pt: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Baixador de vídeos do X",
		subtitle:
			"Cole o link de um tweet para baixar vídeos, GIFs e fotos — até 4K, sem login.",
	},
	input: {
		placeholder: "Cole links de tweets, um por linha…",
		parse: "Analisar",
		parsing: "Analisando…",
		clear: "Limpar",
		hint: "Aceita links de x.com / twitter.com / t.co · vários de uma vez",
	},
	error: {
		emptyInput: "Cole primeiro o link de um tweet.",
		invalid_url:
			"Nenhum link de tweet válido encontrado. Verifique a URL e tente novamente.",
		not_found: "Tweet não encontrado. Pode ter sido excluído ou não é público.",
		tombstone: "Este tweet não está disponível na sua região ou foi removido.",
		no_media: "Este tweet não tem vídeos ou imagens para baixar.",
		rate_limited: "Muitas solicitações. Aguarde um momento e tente novamente.",
		network:
			"Não é possível conectar ao X agora. Verifique sua rede ou a região do Worker.",
		unknown: "Algo deu errado. Tente novamente.",
	},
	result: {
		download: "Baixar",
		preview: "Pré-visualizar",
		copy: "Copiar link",
		copied: "Copiado!",
		gif: "GIF",
		hls: "Stream HLS",
		hlsHint:
			"Playlist HLS com qualidade original (para players como IINA / VLC)",
		photo: "Foto",
		downloadPhoto: "Original",
		duration: "Duração",
		postedBy: "Publicado por",
	},
	history: {
		title: "Recentes",
		clear: "Limpar",
		empty: "Nenhum histórico ainda.",
	},
	seo: {
		title: "Baixador de vídeos do X — Baixe vídeos do X (Twitter) em 4K",
		description:
			"Ferramenta gratuita para baixar vídeos, GIFs e fotos de posts do X (Twitter). Todas as qualidades até 4K, sem login e sem chave de API.",
	},
	footer: {
		disclaimer:
			"Apenas para backup pessoal e aprendizado. Respeite os direitos autorais dos criadores: não redistribua sem permissão.",
		license: "Código aberto sob MIT",
	},
};
