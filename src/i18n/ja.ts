import type { en } from "./en";

export const ja: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X 動画ダウンローダー",
		subtitle:
			"ツイートのリンクを貼り付けて、動画・GIF・画像をダウンロード — 最大 4K、ログイン不要。",
	},
	input: {
		placeholder: "ツイートのリンクを貼り付け（1行に1つ）…",
		parse: "解析",
		parsing: "解析中…",
		clear: "クリア",
		hint: "x.com / twitter.com / t.co リンクに対応 · 複数リンクOK",
	},
	error: {
		emptyInput: "ツイートのリンクを貼り付けてください。",
		invalid_url:
			"有効なツイートリンクが見つかりません。URLを確認してください。",
		not_found:
			"ツイートが見つかりません。削除されたか非公開の可能性があります。",
		tombstone: "このツイートは現在地域では表示できないか、削除されました。",
		no_media: "このツイートにはダウンロードできる動画や画像がありません。",
		rate_limited:
			"リクエストが多すぎます。しばらく待ってから再試行してください。",
		network: "現在 X に接続できません。ネットワークを確認してください。",
		unknown: "エラーが発生しました。もう一度お試しください。",
	},
	result: {
		download: "ダウンロード",
		preview: "プレビュー",
		copy: "リンクをコピー",
		copied: "コピーしました！",
		gif: "GIF",
		hls: "HLS ストリーム",
		hlsHint: "オリジナル画質のHLSプレイリスト（IINA / VLC などで再生可）",
		photo: "画像",
		downloadPhoto: "オリジナル",
		duration: "長さ",
		postedBy: "投稿者",
	},
	history: {
		title: "履歴",
		clear: "クリア",
		empty: "履歴はありません。",
	},
	seo: {
		title: "X 動画ダウンローダー — 4Kのツイート動画をダウンロード",
		description:
			"X（Twitter）の動画・GIF・画像を無料でダウンロード。最大4K画質、ログイン不要、APIキー不要。",
	},
	footer: {
		disclaimer:
			"個人のバックアップと学習のみにご利用ください。著作権を尊重し、無断転載しないでください。",
		license: "MIT ライセンスで公開",
	},
};
