import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/ru/")({
	head: () => seoMeta("ru"),
	component: () => <HomePage locale="ru" />,
});
