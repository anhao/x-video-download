import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { I18nProvider, LOCALES, type Locale, useI18n } from "#/lib/i18n";
import { jsonLd } from "#/lib/seo";
import type { ErrorCode, MediaItem, ParseResult } from "#/lib/twitter";

const GITHUB_URL = "https://github.com/anhao/x-video-download";

const LINK_RE =
	/https?:\/\/(?:x|twitter)\.com\/[A-Za-z0-9_]{1,20}\/status(?:es)?\/\d{4,25}\S*|https?:\/\/t\.co\/[A-Za-z0-9]+/gi;

const HISTORY_KEY = "xvd-history";

interface Job {
	uid: string;
	link: string;
	state: "loading" | "error" | "done";
	data?: ParseResult;
	error?: ErrorCode;
}

interface HistoryEntry {
	id: string;
	thumb: string;
	screenName: string;
	title: string;
	at: number;
}

interface Preview {
	url: string;
	kind: "video" | "photo";
}

function formatBytes(bytes?: number): string {
	if (!bytes) return "";
	if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatDuration(ms?: number): string {
	if (!ms) return "";
	const s = Math.round(ms / 1000);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function extFromUrl(url: string, fallback: string): string {
	const m = url.split("?")[0].match(/\.(\w{3,4})$/);
	return m ? `.${m[1]}` : fallback;
}

function cleanText(text: string): string {
	return text.replace(/https?:\/\/t\.co\/\S+/g, "").trim();
}

export default function HomePage({ locale }: { locale: Locale }) {
	return (
		<I18nProvider locale={locale}>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from our own dictionary
				dangerouslySetInnerHTML={{ __html: jsonLd(locale) }}
			/>
			<HomePageBody />
		</I18nProvider>
	);
}

function HomePageBody() {
	const { t, locale } = useI18n();
	const [input, setInput] = useState("");
	const [jobs, setJobs] = useState<Job[]>([]);
	const [history, setHistory] = useState<HistoryEntry[]>([]);
	const [toast, setToast] = useState<string | null>(null);
	const [preview, setPreview] = useState<Preview | null>(null);
	const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	const showToast = useCallback((msg: string) => {
		setToast(msg);
		clearTimeout(toastTimer.current);
		toastTimer.current = setTimeout(() => setToast(null), 2400);
	}, []);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(HISTORY_KEY);
			if (raw) setHistory(JSON.parse(raw) as HistoryEntry[]);
		} catch {
			// corrupted storage — ignore
		}
	}, []);

	const pushHistory = useCallback((data: ParseResult) => {
		const entry: HistoryEntry = {
			id: data.id,
			thumb: data.media[0]?.thumb ?? "",
			screenName: data.user.screenName,
			title: cleanText(data.text).slice(0, 60),
			at: Date.now(),
		};
		setHistory((prev) => {
			const next = [entry, ...prev.filter((h) => h.id !== entry.id)].slice(
				0,
				12,
			);
			try {
				localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
			} catch {
				// storage full/blocked — keep in memory
			}
			return next;
		});
	}, []);

	const parseLink = useCallback(
		async (link: string) => {
			const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
			setJobs((prev) => [{ uid, link, state: "loading" }, ...prev]);

			let job: Job = { uid, link, state: "error", error: "network" };
			try {
				const res = await fetch(`/api/parse?url=${encodeURIComponent(link)}`);
				const body = (await res.json()) as
					| { ok: true; data: ParseResult }
					| { ok: false; error: ErrorCode };
				if (body.ok) {
					job = { uid, link, state: "done", data: body.data };
					pushHistory(body.data);
				} else {
					job = { uid, link, state: "error", error: body.error ?? "unknown" };
				}
			} catch {
				job = { uid, link, state: "error", error: "network" };
			}
			setJobs((prev) => prev.map((j) => (j.uid === uid ? job : j)));
		},
		[pushHistory],
	);

	const runParse = useCallback(
		(raw: string) => {
			const links = Array.from(
				new Set((raw.match(LINK_RE) ?? []).map((s) => s.trim())),
			);
			if (links.length === 0) {
				showToast(t("error.invalid_url"));
				return;
			}
			for (const link of links) parseLink(link);
		},
		[parseLink, showToast, t],
	);

	const handleSubmit = () => {
		if (!input.trim()) {
			showToast(t("error.emptyInput"));
			return;
		}
		runParse(input);
		setInput("");
	};

	// Paste anywhere on the page to parse instantly.
	useEffect(() => {
		const onPaste = (e: ClipboardEvent) => {
			const target = e.target as HTMLElement | null;
			if (target && /^(input|textarea)$/i.test(target.tagName)) return;
			const text = e.clipboardData?.getData("text") ?? "";
			if (LINK_RE.test(text)) {
				LINK_RE.lastIndex = 0;
				e.preventDefault();
				runParse(text);
			}
			LINK_RE.lastIndex = 0;
		};
		window.addEventListener("paste", onPaste);
		return () => window.removeEventListener("paste", onPaste);
	}, [runParse]);

	return (
		<div className="mx-auto min-h-dvh w-full max-w-3xl px-4 pb-16">
			<header className="flex items-center justify-between py-5">
				<Link to="/" className="flex items-center gap-2.5 hover:no-underline">
					<span className="grid size-9 place-items-center rounded-xl bg-white text-lg font-bold text-black">
						𝕏
					</span>
					<span className="text-[15px] font-bold tracking-tight text-white">
						{t("hero.title")}
					</span>
				</Link>
				<div className="flex items-center gap-3">
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer noopener"
						className="text-sm text-neutral-400 hover:text-neutral-200"
					>
						<span className="sr-only">{t("nav.github")}</span>
						<svg
							viewBox="0 0 16 16"
							width="20"
							height="20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
						</svg>
					</a>
					<nav
						aria-label="Language"
						className="flex overflow-hidden rounded-full border border-line text-xs font-semibold"
					>
						{LOCALES.map((l) => (
							<Link
								key={l.code}
								to={l.path}
								className={`x-btn px-2.5 py-1.5 ${locale === l.code ? "bg-accent text-white" : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"}`}
							>
								{l.label}
							</Link>
						))}
					</nav>
				</div>
			</header>

			<main>
				<section className="pt-10 pb-8 text-center sm:pt-16">
					<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
						{t("hero.title")}
					</h1>
					<p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-400">
						{t("hero.subtitle")}
					</p>
				</section>

				<section>
					<div className="x-input flex items-start gap-2 rounded-2xl p-2.5">
						<textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSubmit();
								}
							}}
							placeholder={t("input.placeholder")}
							rows={2}
							spellCheck={false}
							className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-1.5 text-[15px] text-neutral-100 outline-none placeholder:text-neutral-600"
						/>
						{input && (
							<button
								type="button"
								onClick={() => setInput("")}
								title={t("input.clear")}
								className="x-btn mt-1 grid size-7 shrink-0 place-items-center rounded-full text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
							>
								✕
							</button>
						)}
						<button
							type="button"
							onClick={handleSubmit}
							className="x-btn mt-0.5 shrink-0 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-strong"
						>
							{t("input.parse")}
						</button>
					</div>
					<p className="mt-2.5 text-center text-xs text-neutral-600">
						{t("input.hint")}
					</p>
				</section>

				<section className="mt-8 space-y-5">
					{jobs.map((job) => (
						<div key={job.uid} className="fade-in">
							{job.state === "loading" && <SkeletonCard />}
							{job.state === "error" && (
								<ErrorCard error={job.error ?? "unknown"} />
							)}
							{job.state === "done" && job.data && (
								<ResultCard
									data={job.data}
									onPreview={setPreview}
									onToast={showToast}
								/>
							)}
						</div>
					))}
				</section>

				{history.length > 0 && (
					<section className="mt-12">
						<div className="mb-3 flex items-center justify-between">
							<h2 className="text-sm font-bold text-neutral-300">
								{t("history.title")}
							</h2>
							<button
								type="button"
								onClick={() => {
									setHistory([]);
									localStorage.removeItem(HISTORY_KEY);
								}}
								className="text-xs text-neutral-500 hover:text-neutral-300"
							>
								{t("history.clear")}
							</button>
						</div>
						<div className="flex gap-2.5 overflow-x-auto pb-2">
							{history.map((h) => (
								<button
									key={h.id}
									type="button"
									onClick={() => parseLink(`https://x.com/i/status/${h.id}`)}
									className="x-res-chip group flex w-44 shrink-0 items-center gap-2.5 rounded-xl p-2 text-left"
								>
									{h.thumb && (
										<img
											src={h.thumb}
											alt=""
											className="size-10 shrink-0 rounded-lg object-cover"
											loading="lazy"
										/>
									)}
									<span className="min-w-0">
										<span className="block truncate text-xs font-semibold text-neutral-200">
											@{h.screenName}
										</span>
										<span className="block truncate text-[11px] text-neutral-500">
											{h.title || h.id}
										</span>
									</span>
								</button>
							))}
						</div>
					</section>
				)}
			</main>

			<footer className="mt-16 border-t border-line pt-6 text-center">
				<p className="text-xs leading-relaxed text-neutral-600">
					{t("footer.disclaimer")}
				</p>
				<p className="mt-2 text-xs text-neutral-700">
					<a
						href={GITHUB_URL}
						target="_blank"
						rel="noreferrer noopener"
						className="text-neutral-500"
					>
						{t("footer.license")}
					</a>
				</p>
			</footer>

			{toast && (
				<div className="fade-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-surface-2 px-4 py-2.5 text-sm text-neutral-100 shadow-xl ring-1 ring-line">
					{toast}
				</div>
			)}

			{preview && (
				<PreviewModal preview={preview} onClose={() => setPreview(null)} />
			)}
		</div>
	);
}

function SkeletonCard() {
	return (
		<div className="x-card rounded-2xl p-4">
			<div className="flex items-center gap-3">
				<div className="skeleton size-10 rounded-full" />
				<div className="flex-1 space-y-2">
					<div className="skeleton h-3.5 w-36 rounded" />
					<div className="skeleton h-3 w-24 rounded" />
				</div>
			</div>
			<div className="skeleton mt-4 h-3.5 w-full rounded" />
			<div className="skeleton mt-2 h-3.5 w-3/4 rounded" />
			<div className="mt-4 flex gap-3">
				<div className="skeleton h-32 w-52 rounded-xl" />
				<div className="flex-1 space-y-2.5">
					<div className="skeleton h-9 rounded-lg" />
					<div className="skeleton h-9 rounded-lg" />
					<div className="skeleton h-9 w-2/3 rounded-lg" />
				</div>
			</div>
		</div>
	);
}

function ErrorCard({ error }: { error: ErrorCode | "unknown" }) {
	const { t } = useI18n();
	const message = t(`error.${error === "unknown" ? "unknown" : error}`);
	return (
		<div className="x-card flex items-start gap-3 rounded-2xl border-red-500/30 bg-red-500/5 p-4">
			<span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-500/15 text-sm text-red-400">
				!
			</span>
			<div className="min-w-0">
				<p className="text-sm font-semibold text-neutral-200">{message}</p>
			</div>
		</div>
	);
}

function ResultCard({
	data,
	onPreview,
	onToast,
}: {
	data: ParseResult;
	onPreview: (p: Preview) => void;
	onToast: (msg: string) => void;
}) {
	const { locale } = useI18n();
	const date = data.createdAt
		? new Date(data.createdAt).toLocaleString(
				locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : "en-US",
				{
					year: "numeric",
					month: "short",
					day: "numeric",
				},
			)
		: "";

	return (
		<article className="x-card overflow-hidden rounded-2xl">
			<div className="flex items-center gap-3 px-4 pt-4">
				{data.user.avatar ? (
					<img
						src={data.user.avatar}
						alt=""
						className="size-10 rounded-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="size-10 rounded-full bg-line" />
				)}
				<div className="min-w-0 flex-1">
					<p className="truncate text-sm font-bold text-white">
						{data.user.name}
					</p>
					<p className="truncate text-xs text-neutral-500">
						@{data.user.screenName}
						{date && ` · ${date}`}
					</p>
				</div>
				<a
					href={data.url}
					target="_blank"
					rel="noreferrer noopener"
					className="x-btn shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-white/5"
				>
					↗ X
				</a>
			</div>

			{cleanText(data.text) && (
				<p className="px-4 pt-3 text-sm leading-relaxed text-neutral-300">
					{cleanText(data.text)}
				</p>
			)}

			<div className="space-y-4 p-4">
				{data.media.map((media, mi) => (
					<MediaBlock
						key={`${data.id}-${media.thumb}`}
						data={data}
						media={media}
						mediaIndex={mi}
						onPreview={onPreview}
						onToast={onToast}
					/>
				))}
			</div>
		</article>
	);
}

function MediaBlock({
	data,
	media,
	mediaIndex,
	onPreview,
	onToast,
}: {
	data: ParseResult;
	media: MediaItem;
	mediaIndex: number;
	onPreview: (p: Preview) => void;
	onToast: (msg: string) => void;
}) {
	const { t } = useI18n();

	if (media.type === "photo") {
		const v = media.variants[0];
		if (!v) return null;
		const name = `${data.user.screenName}_${data.id}_${mediaIndex + 1}${extFromUrl(v.url, ".jpg")}`;
		return (
			<div className="thumb-zoom group relative overflow-hidden rounded-xl border border-line">
				<button
					type="button"
					onClick={() => onPreview({ url: v.url, kind: "photo" })}
					className="block w-full"
				>
					<img
						src={media.thumb}
						alt=""
						className="max-h-96 w-full object-cover"
						loading="lazy"
					/>
				</button>
				<a
					href={`/api/download?t=${data.id}&m=${mediaIndex}&v=0&name=${encodeURIComponent(name)}`}
					download={name}
					className="x-btn absolute right-3 top-3 rounded-full bg-black/70 px-3.5 py-2 text-xs font-bold text-white backdrop-blur hover:bg-accent"
				>
					⬇ {t("result.downloadPhoto")} · {media.width}×{media.height}
				</a>
			</div>
		);
	}

	const best = media.variants.find((v) => v.kind === "mp4");

	return (
		<div className="flex flex-col gap-4 sm:flex-row">
			<button
				type="button"
				onClick={() =>
					best &&
					onPreview({
						url: `/api/download?t=${data.id}&m=${mediaIndex}&v=0&mode=preview`,
						kind: "video",
					})
				}
				className="thumb-zoom group relative w-full shrink-0 overflow-hidden rounded-xl border border-line sm:w-56"
			>
				<img
					src={media.thumb}
					alt=""
					className="aspect-video h-full w-full object-cover"
					loading="lazy"
				/>
				<span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/40">
					<span className="grid size-12 place-items-center rounded-full bg-black/60 text-xl text-white backdrop-blur">
						▶
					</span>
				</span>
				{media.durationMs && (
					<span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold text-white">
						{formatDuration(media.durationMs)}
					</span>
				)}
				{media.type === "gif" && (
					<span className="absolute left-2 top-2 rounded bg-accent px-1.5 py-0.5 text-[11px] font-bold text-white">
						{t("result.gif")}
					</span>
				)}
			</button>

			<div className="flex min-w-0 flex-1 flex-col gap-2">
				{media.variants.map((v, vi) => {
					if (v.kind === "hls") {
						return (
							<button
								key={v.kind}
								type="button"
								title={t("result.hlsHint")}
								onClick={() => {
									navigator.clipboard
										.writeText(v.url)
										.then(() => onToast(t("result.copied")))
										.catch(() => onToast(v.url));
								}}
								className="x-res-chip flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm"
							>
								<span className="font-semibold text-neutral-300">
									{t("result.hls")} · m3u8
								</span>
								<span className="text-xs text-neutral-500">
									{t("result.copy")}
								</span>
							</button>
						);
					}
					const name = `${data.user.screenName}_${data.id}_${v.label}${extFromUrl(v.url, ".mp4")}`;
					return (
						<a
							key={v.url}
							href={`/api/download?t=${data.id}&m=${mediaIndex}&v=${vi}&name=${encodeURIComponent(name)}`}
							download={name}
							className="x-res-chip group flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm"
						>
							<span className="flex items-baseline gap-2">
								<span className="font-bold text-white">{v.label}</span>
								<span className="text-[11px] text-neutral-500">
									{v.width && v.height ? `${v.width}×${v.height}` : ""}
								</span>
							</span>
							<span className="flex items-center gap-2 text-xs font-semibold text-accent">
								{v.bytes ? (
									<span className="text-neutral-500">
										{formatBytes(v.bytes)}
									</span>
								) : null}
								⬇ {t("result.download")}
							</span>
						</a>
					);
				})}

				{best && (
					<button
						type="button"
						onClick={() => {
							navigator.clipboard
								.writeText(best.url)
								.then(() => onToast(t("result.copied")))
								.catch(() => onToast(best.url));
						}}
						className="mt-auto self-start text-xs text-neutral-500 hover:text-neutral-300"
					>
						🔗 {t("result.copy")} (mp4)
					</button>
				)}
			</div>
		</div>
	);
}

function PreviewModal({
	preview,
	onClose,
}: {
	preview: Preview;
	onClose: () => void;
}) {
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: full-screen overlay, click to close is standard modal UX
		<div
			className="fixed inset-0 z-40 grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			role="presentation"
			tabIndex={-1}
		>
			<div
				className="fade-in w-full max-w-3xl overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal
			>
				{preview.kind === "video" ? (
					// biome-ignore lint/a11y/useMediaCaption: X media has no caption tracks available
					<video
						src={preview.url}
						controls
						autoPlay
						playsInline
						className="max-h-[80vh] w-full bg-black"
					/>
				) : (
					<img
						src={preview.url}
						alt=""
						className="max-h-[80vh] w-full object-contain bg-black"
					/>
				)}
			</div>
		</div>
	);
}
