import { createFileRoute } from "@tanstack/react-router";
import HomePage from "#/components/HomePage";
import { seoMeta } from "#/lib/seo";

export const Route = createFileRoute("/es/")({
	head: () => seoMeta("es"),
	component: () => <HomePage locale="es" />,
});
