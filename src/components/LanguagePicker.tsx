import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LOCALES, type Locale } from "#/lib/i18n";

/** Dropdown locale switcher — each option navigates to the locale's path. */
export function LanguagePicker({ locale }: { locale: Locale }) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const current = LOCALES.find((l) => l.code === locale);

	useEffect(() => {
		if (!open) return;
		const onDocClick = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<div ref={rootRef} className="relative">
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label="Language"
				onClick={() => setOpen((v) => !v)}
				className="x-btn flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-white/5"
			>
				<GlobeIcon />
				<span className="hidden sm:inline">{current?.label ?? "English"}</span>
				<span
					className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					aria-hidden="true"
				>
					▾
				</span>
			</button>

			{open && (
				<ul
					aria-label="Language"
					className="fade-in absolute right-0 z-50 mt-2 max-h-80 w-44 overflow-y-auto rounded-xl border border-line bg-surface-2 py-1.5 shadow-2xl"
				>
					{LOCALES.map((l) => (
						<li
							key={l.code}
							aria-current={l.code === locale ? "true" : undefined}
						>
							<Link
								to={l.path}
								onClick={() => setOpen(false)}
								className={`flex items-center justify-between px-3.5 py-2 text-sm ${l.code === locale ? "font-bold text-accent" : "text-neutral-300 hover:bg-white/5"}`}
							>
								{l.label}
								{l.code === locale && <span aria-hidden="true">✓</span>}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function GlobeIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width="14"
			height="14"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M2 12h20" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
		</svg>
	);
}
