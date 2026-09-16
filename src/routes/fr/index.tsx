import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/fr/")({
	head: () => seoMeta("fr"),
	component: () => <HomePage locale="fr" />,
});
