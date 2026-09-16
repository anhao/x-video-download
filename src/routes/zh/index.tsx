import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/zh/")({
	head: () => seoMeta("zh"),
	component: () => <HomePage locale="zh" />,
});
