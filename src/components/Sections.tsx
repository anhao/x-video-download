import { useDict, useI18n } from "#/lib/i18n";

/** "How it works" — numbered 3-step flow under the search box. */
export function HowItWorks() {
	const { t } = useI18n();
	const { sections } = useDict();

	return (
		<section className="mt-20">
			<h2 className="text-center text-2xl font-extrabold tracking-tight text-white">
				{sections.howTitle}
			</h2>
			<div className="mt-8 grid gap-4 sm:grid-cols-3">
				{sections.steps.map((step, i) => (
					<div key={step.title} className="x-card rounded-2xl p-5">
						<span className="grid size-9 place-items-center rounded-full bg-accent/15 text-sm font-extrabold text-accent">
							{i + 1}
						</span>
						<h3 className="mt-3.5 text-[15px] font-bold text-white">
							{step.title}
						</h3>
						<p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
							{step.desc}
						</p>
					</div>
				))}
			</div>
			<p className="sr-only">{t("input.hint")}</p>
		</section>
	);
}

const FEATURE_ICONS = ["🔑", "🎞️", "📋", "🎬", "⚡", "🌐"];

/** Six feature cards. */
export function Features() {
	const { sections } = useDict();

	return (
		<section className="mt-16">
			<h2 className="text-center text-2xl font-extrabold tracking-tight text-white">
				{sections.featuresTitle}
			</h2>
			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{sections.features.map((f, i) => (
					<div key={f.title} className="x-card rounded-2xl p-5">
						<span className="text-2xl" aria-hidden="true">
							{FEATURE_ICONS[i] ?? "✨"}
						</span>
						<h3 className="mt-3 text-[15px] font-bold text-white">{f.title}</h3>
						<p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
							{f.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

/** FAQ accordion using native details/summary — zero JS, SEO-friendly. */
export function Faq() {
	const { sections } = useDict();

	return (
		<section className="mt-16">
			<h2 className="text-center text-2xl font-extrabold tracking-tight text-white">
				{sections.faqTitle}
			</h2>
			<div className="mt-8 space-y-3">
				{sections.faqs.map((item) => (
					<details
						key={item.q}
						className="x-card group rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
					>
						<summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-bold text-white">
							{item.q}
							<span
								className="shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-45"
								aria-hidden="true"
							>
								+
							</span>
						</summary>
						<p className="mt-3 text-sm leading-relaxed text-neutral-400">
							{item.a}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}
