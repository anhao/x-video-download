import type { en } from "./en";

export const pt: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "Baixador de vídeos do X",
		h1: "Baixador de vídeos do X (Twitter)",
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
		tagline:
			"Baixador de mídia do X (Twitter) rápido, gratuito e de código aberto.",
		product: "Idiomas",
		resources: "Recursos",
		followX: "Seguir no X",
		source: "Código-fonte",
		disclaimer:
			"Apenas para backup pessoal e aprendizado. Respeite os direitos autorais: não redistribua sem permissão.",
		license: "Código aberto sob MIT",
	},
	sections: {
		howTitle: "Como funciona",
		steps: [
			{
				title: "Copie o link",
				desc: "No app do X ou no navegador, toque em Compartilhar → Copiar link.",
			},
			{
				title: "Cole e analise",
				desc: "Cole o link acima e toque em Analisar; cada qualidade é resolvida na hora.",
			},
			{
				title: "Baixe",
				desc: "Escolha uma resolução e salve o MP4 — até 4K, sem marca d’água.",
			},
		],
		featuresTitle: "Por que este baixador",
		features: [
			{
				title: "Sem login e sem chave de API",
				desc: "Lê o feed público do X para posts públicos — nada para configurar.",
			},
			{
				title: "Até 4K",
				desc: "Todas as variantes MP4 do post, de 240p a 4K, com tamanhos de arquivo.",
			},
			{
				title: "Links em lote",
				desc: "Cole vários links de uma vez — ou cole em qualquer lugar da página.",
			},
			{
				title: "Vídeos, GIFs e fotos",
				desc: "GIFs salvos como MP4 e fotos baixadas na resolução original.",
			},
			{
				title: "Proxy de borda rápido",
				desc: "Os arquivos passam por Cloudflare Workers, sem gargalo.",
			},
			{
				title: "9 idiomas",
				desc: "English, 中文, 日本語, Español e mais — páginas limpas, sem anúncios.",
			},
		],
		faqTitle: "Perguntas frequentes",
		faqs: [
			{
				q: "Como baixo um vídeo do X (Twitter)?",
				a: "Copie o link do post, cole na caixa de busca e toque em Analisar. Escolha uma qualidade e o MP4 é salvo direto no seu dispositivo.",
			},
			{
				q: "Preciso de conta ou chave de API?",
				a: "Não. A ferramenta lê o feed público do X para posts públicos — não há nada para se cadastrar.",
			},
			{
				q: "Quais qualidades estão disponíveis?",
				a: "Todas as qualidades com que o post foi enviado — normalmente de 240p a 1080p, até 4K em uploads de alta resolução. Também oferecemos uma playlist HLS com o stream original.",
			},
			{
				q: "Há marca d’água ou limites?",
				a: "Os downloads são os arquivos originais: sem marca d’água, sem recodificação, sem fila. Use apenas para cópia pessoal.",
			},
			{
				q: "Posso baixar GIFs e fotos?",
				a: "Sim — GIFs são salvos como MP4 e fotos são baixadas na resolução original.",
			},
			{
				q: "Por que um link falha?",
				a: "O post pode ter sido excluído, ser privado, ter restrição de idade ou bloqueio regional. Só posts públicos funcionam — a mensagem de erro mostra o motivo exato.",
			},
		],
	},
};
