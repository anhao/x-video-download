import type { en } from "./en";

export const zh: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X 视频下载器",
		h1: "X（推特）视频下载器",
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
		keywords:
			"X视频下载, 推特视频下载, X视频下载器, 推特视频下载器, 下载X视频, twitter视频下载, X GIF下载, 推特图片下载, x video downloader",
	},
	footer: {
		tagline: "快速、免费、开源的 X（推特）媒体下载工具。",
		product: "语言",
		resources: "资源",
		followX: "在 X 上关注",
		source: "源代码",
		disclaimer: "仅供个人备份与学习使用，请尊重创作者版权，勿未经授权传播。",
		license: "基于 MIT 协议开源",
	},
	sections: {
		howTitle: "使用方法",
		steps: [
			{
				title: "复制链接",
				desc: "在 X 应用或浏览器里，对帖子点分享 → 复制链接。",
			},
			{
				title: "粘贴并解析",
				desc: "把链接粘贴到上方输入框，点解析，所有画质立即呈现。",
			},
			{
				title: "下载",
				desc: "选择分辨率保存 MP4——最高 4K，无水印。",
			},
		],
		featuresTitle: "为什么选择本工具",
		features: [
			{
				title: "无需登录、无需 API Key",
				desc: "直接读取 X 公开数据源的公开帖子，零配置。",
			},
			{
				title: "最高 4K",
				desc: "帖子提供的全部 MP4 画质，240p 到 4K，附带文件大小。",
			},
			{
				title: "批量链接",
				desc: "一次粘贴多条链接，或直接在页面任意位置粘贴。",
			},
			{
				title: "视频、GIF 和图片",
				desc: "GIF 保存为 MP4，图片按原始分辨率下载。",
			},
			{
				title: "边缘流式代理",
				desc: "文件经 Cloudflare Workers 边缘转发，没有服务器瓶颈。",
			},
			{
				title: "九种语言",
				desc: "English、中文、日本語、Español 等，页面干净，绝无广告。",
			},
		],
		faqTitle: "常见问题",
		faqs: [
			{
				q: "如何下载 X（推特）视频？",
				a: "复制帖子链接，粘贴到搜索框并点击解析，选择画质后 MP4 直接保存到你的设备。",
			},
			{
				q: "需要账号或 API Key 吗？",
				a: "不需要。工具读取 X 的公开 syndication 数据源，仅支持公开帖子，无需注册任何东西。",
			},
			{
				q: "支持哪些画质？",
				a: "帖子上传时的全部画质——通常 240p 到 1080p，高分辨率上传可到 4K，另提供原始流的 HLS 播放列表。",
			},
			{
				q: "有水印或限制吗？",
				a: "下载的是原始文件：无水印、无转码、无排队。请仅用于个人备份。",
			},
			{
				q: "能下载 GIF 和图片吗？",
				a: "可以——动图 GIF 保存为 MP4，图片按原始分辨率下载。",
			},
			{
				q: "为什么有的链接解析失败？",
				a: "帖子可能已删除、私密、有年龄限制或区域锁定。仅公开帖子可用——错误信息会告诉你具体原因。",
			},
		],
	},
};
