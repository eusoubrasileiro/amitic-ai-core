import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import KnowledgeSearch from "@/components/KnowledgeSearch";

// Mirrors topics.py TOPICS in the content-watcher repo. Canonical display order.
const TOPICS: { slug: string; title: string; blurb: string }[] = [
  { slug: "agent-architecture", title: "Agent Architecture", blurb: "Tools-first vs intent/NLU, multi-agent design, agent loops" },
  { slug: "agent-harness", title: "Agent Harness & Software Factories", blurb: "Parallel-worktree dispatch, review pipelines, three-layer tool split" },
  { slug: "context-engineering", title: "Context Engineering", blurb: "Context windows, memory, retrieval, RAG vs long-context" },
  { slug: "coding-agents", title: "Coding Agents", blurb: "Claude Code, Crush, Codex, Cursor — and model comparisons" },
  { slug: "capability-and-cost-trends", title: "Capability & Cost Trends", blurb: "Compute, cost and time-horizon data — the strategy topic" },
  { slug: "agent-security", title: "Agent Security", blurb: "Prompt injection, sandboxing, agent isolation, agent-specific attacks" },
  { slug: "methodology", title: "Methodology", blurb: "XP/TDD-with-AI, anti-vibe coding, clean code for agents" },
  { slug: "evals-and-benchmarks", title: "Evals & Benchmarks", blurb: "Coding-agent benchmarks and the counter-evidence about what they measure" },
];

const TOPIC_BY_SLUG = Object.fromEntries(TOPICS.map((t) => [t.slug, t]));

function TopicIndex() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-foreground">Knowledge</h1>
      <p className="mt-2 text-muted-foreground">
        Current AI-agent knowledge — synthesized, rank-ordered, date-filtered. Updated by the watcher.
      </p>

      <div className="mt-8">
        <KnowledgeSearch />
      </div>

      <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Browse topics
      </h2>
      <div className="mt-4 grid gap-3">
        {TOPICS.map((t) => (
          <Link
            key={t.slug}
            to={`/k/${t.slug}`}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
          >
            <div className="font-semibold text-foreground">{t.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{t.blurb}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopicPage({ slug }: { slug: string }) {
  const topic = TOPIC_BY_SLUG[slug];
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (!topic) return;
    setState("loading");
    fetch(`/k/data/${slug}.md`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        setMarkdown(text);
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [slug, topic]);

  if (!topic) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-muted-foreground">Unknown topic.</p>
        <Link to="/k" className="mt-4 inline-block text-primary hover:underline">
          ← All topics
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/k" className="text-sm text-primary hover:underline">
        ← All topics
      </Link>
      {state === "loading" && <p className="mt-8 text-muted-foreground">Loading…</p>}
      {state === "error" && (
        <p className="mt-8 text-muted-foreground">
          Could not load this topic page. It may not have been synthesized yet.
        </p>
      )}
      {state === "ready" && (
        <article className="prose prose-invert mt-6 max-w-none prose-headings:scroll-mt-20 prose-a:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      )}
    </div>
  );
}

// A distilled video-article (Phase 7). Unlike a topic page — served as a
// static .md from /k/data/ — an article is fetched through the research
// container's /k/api/article/{slug} route, which reads the knowledge repo's
// articles/ directory. The article's markdown carries its own outward link
// back to the source video.
function ArticlePage({ slug }: { slug: string }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setState("loading");
    // location.origin only — a relative URL would inherit credentials from a
    // `user:pass@` page URL and the Fetch API rejects credentialed URLs.
    fetch(`${window.location.origin}/k/api/article/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        setMarkdown(d.markdown ?? "");
        setState("ready");
      })
      .catch(() => setState("error"));
  }, [slug]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/k" className="text-sm text-primary hover:underline">
        ← All topics
      </Link>
      {state === "loading" && <p className="mt-8 text-muted-foreground">Loading…</p>}
      {state === "error" && (
        <p className="mt-8 text-muted-foreground">Could not load this article.</p>
      )}
      {state === "ready" && (
        <article className="prose prose-invert mt-6 max-w-none prose-headings:scroll-mt-20 prose-a:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      )}
    </div>
  );
}

const Knowledge = () => {
  const { slug, articleSlug } = useParams<{ slug: string; articleSlug: string }>();
  return (
    <div className="min-h-screen bg-background">
      {articleSlug ? (
        <ArticlePage slug={articleSlug} />
      ) : slug ? (
        <TopicPage slug={slug} />
      ) : (
        <TopicIndex />
      )}
    </div>
  );
};

export default Knowledge;
