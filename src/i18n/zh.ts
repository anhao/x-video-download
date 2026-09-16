import type { en } from "./en";

export const zh: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X 视频下载器",
		subtitle: "粘贴推文链接，下载视频、GIF 和图片——最高 4K 画质，无需登录。",
	},
	input: {
		placeholder: "粘贴推文链接，每行一个…",
		parse: "解析",
		parsing: "解析中…",
		clear: "清空",
		hint: "支持 x.com / twitter.com / t.co 链接 · 可一次粘贴多条",
	},
	error: {
		emptyInput: "请先粘贴推文链接。",
		invalid_url: "未找到有效的推文链接，请检查后重试。",
		not_found: "推文不存在，可能已被删除或非公开。",
		tombstone: "该推文在当前地区不可见或已被移除。",
		no_media: "这条推文没有可下载的视频或图片。",
		rate_limited: "请求过于频繁，请稍后再试。",
		network: "暂时无法连接 X，请检查网络或 Worker 部署区域。",
		unknown: "出错了，请重试。",
	},
	result: {
		download: "下载",
		preview: "预览",
		copy: "复制直链",
		copied: "已复制！",
		gif: "GIF",
		hls: "HLS 流",
		hlsHint: "原画质 HLS 播放列表（适用于 IINA / VLC 等播放器）",
		photo: "图片",
		downloadPhoto: "原图",
		duration: "时长",
		postedBy: "发布者",
	},
	history: {
		title: "最近解析",
		clear: "清空",
		empty: "暂无记录。",
	},
	seo: {
		title: "X 视频下载器 — 下载 4K 推特视频",
		description:
			"免费下载 X（推特）视频、GIF 和图片，最高 4K 画质，无需登录，无需 API Key。",
	},
	footer: {
		disclaimer: "仅供个人备份与学习使用，请尊重创作者版权，勿未经授权传播。",
		license: "基于 MIT 协议开源",
	},
};
