import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaskFlow — Smart To-Do List" },
      {
        name: "description",
        content:
          "TaskFlow is a professional to-do dashboard: add, edit, filter and track tasks with priorities, due dates and localStorage persistence.",
      },
      { property: "og:title", content: "TaskFlow — Smart To-Do List" },
      {
        property: "og:description",
        content:
          "A responsive to-do list dashboard built with HTML, CSS and JavaScript. Tasks persist in your browser.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The app itself is plain HTML/CSS/JS in public/app (index.html, style.css, script.js).
function Index() {
  return (
    <iframe
      src="/app/index.html"
      title="TaskFlow — Smart To-Do List"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
