import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/pt/")({
	head: () => seoMeta("pt"),
	component: () => <HomePage locale="pt" />,
});
