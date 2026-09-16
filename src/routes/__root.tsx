import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { I18nProvider } from "#/lib/i18n";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				name: "theme-color",
				content: "#000000",
			},
			{
				name: "description",
				content:
					"Download videos, GIFs and photos from X (Twitter) posts — up to 4K, no login required.",
			},
			{
				title: "X Video Downloader",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<I18nProvider>{children}</I18nProvider>
				<Scripts />
			</body>
		</html>
	);
}
