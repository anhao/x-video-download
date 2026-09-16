import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/de/")({
	head: () => seoMeta("de"),
	component: () => <HomePage locale="de" />,
});
