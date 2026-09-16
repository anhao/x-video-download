import type { en } from "./en";

export const ko: typeof en = {
	nav: {
		github: "GitHub",
	},
	hero: {
		title: "X 영상 다운로더",
		subtitle:
			"트윗 링크를 붙여넣어 영상, GIF, 사진을 다운로드하세요 — 최대 4K, 로그인 불필요.",
	},
	input: {
		placeholder: "트윗 링크를 붙여넣으세요 (한 줄에 하나)…",
		parse: "분석",
		parsing: "분석 중…",
		clear: "지우기",
		hint: "x.com / twitter.com / t.co 링크 지원 · 여러 링크 동시 가능",
	},
	error: {
		emptyInput: "먼저 트윗 링크를 붙여넣어 주세요.",
		invalid_url:
			"유효한 트윗 링크를 찾을 수 없습니다. URL을 확인하고 다시 시도하세요.",
		not_found:
			"트윗을 찾을 수 없습니다. 삭제되었거나 공개되지 않은 트윗일 수 있습니다.",
		tombstone: "이 트윗은 현재 지역에서 볼 수 없거나 삭제되었습니다.",
		no_media: "이 트윗에는 다운로드할 영상이나 이미지가 없습니다.",
		rate_limited: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
		network: "현재 X에 연결할 수 없습니다. 네트워크를 확인해 주세요.",
		unknown: "문제가 발생했습니다. 다시 시도해 주세요.",
	},
	result: {
		download: "다운로드",
		preview: "미리보기",
		copy: "링크 복사",
		copied: "복사됨!",
		gif: "GIF",
		hls: "HLS 스트림",
		hlsHint: "원본 화질 HLS 재생목록 (IINA / VLC 등 플레이어용)",
		photo: "사진",
		downloadPhoto: "원본",
		duration: "길이",
		postedBy: "게시자",
	},
	history: {
		title: "최근 기록",
		clear: "지우기",
		empty: "기록이 없습니다.",
	},
	seo: {
		title: "X 영상 다운로더 — X(트위터) 영상을 4K로 다운로드",
		description:
			"X(트위터) 게시물의 영상, GIF, 사진을 무료로 다운로드하는 도구. 최대 4K 화질, 로그인 및 API 키 불필요.",
	},
	footer: {
		disclaimer:
			"개인 백업과 학습 목적으로만 사용하세요. 창작자의 저작권을 존중하며 무단 재배포를 금지합니다.",
		license: "MIT 라이선스 오픈소스",
	},
};
