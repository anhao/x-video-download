import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

if (process.env.NODE_ENV === "production" && !process.env.VITE_SITE_URL) {
	console.warn(
		"\n⚠️  VITE_SITE_URL is not set — canonical/hreflang/og URLs will be relative.",
		"Set it (see .env.example) and rebuild before deploying.\n",
	);
}

const config = defineConfig({
	define: {
		"import.meta.env.VITE_BUILD_DATE": JSON.stringify(new Date().toISOString()),
	},
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});

export default config;
