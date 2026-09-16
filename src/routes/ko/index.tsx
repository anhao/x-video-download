import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/ko/")({
	head: () => seoMeta("ko"),
	component: () => <HomePage locale="ko" />,
});
