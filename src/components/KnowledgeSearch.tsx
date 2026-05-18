import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Two search modes — mirrors the two tools the research server exposes.
//   kb       → POST /k/api/search   — BM25 over the knowledge base. Instant.
//   research → POST /k/api/research — the tiered grounded loop. Slow (~1-2 min).
// nginx proxies /k/api/* to the research container and injects the bearer
// token server-side; the browser never sees it. /k is already BasicAuth-gated.
type Mode = "kb" | "research";

interface Card {
  title: string;
  topic: string;
  source: string;
  published: string | null;
  summary: string;
  sowhat: string | null;
  link: string;
  bm25: number;
}

interface KbResult {
  cards: Card[];
  coverage: { count: number; newest: string | null; oldest: string | null };
}

interface Citation {
  url: string;
  title: string;
  date: string | null;
  tier: string;
}

interface ResearchResult {
  question: string;
  answer: string;
  citations: Citation[];
  confidence: string;
  retrieval_date: string;
  kb_coverage: { count: number; newest: string | null; oldest: string | null };
  warnings: string[];
  sources_used: { kb_cards: number; curated: number; web: number };
}

const TIER_STYLE: Record<string, string> = {
  kb: "border-emerald-700 bg-emerald-950 text-emerald-300",
  curated: "border-sky-700 bg-sky-950 text-sky-300",
  web: "border-zinc-700 bg-zinc-900 text-zinc-400",
};

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded border px-1.5 py-0.5 text-xs font-medium ${className ?? ""}`}>
      {children}
    </span>
  );
}

function CardList({ result }: { result: KbResult }) {
  if (result.cards.length === 0) {
    return <p className="mt-6 text-muted-foreground">No cards matched. Try different terms.</p>;
  }
  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground">
        {result.cards.length} of {result.coverage.count} cards · knowledge base spans{" "}
        {result.coverage.oldest} → {result.coverage.newest}
      </p>
      <div className="mt-3 grid gap-3">
        {result.cards.map((c, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="font-semibold text-foreground">{c.title}</span>
              <Badge className="border-zinc-700 bg-zinc-900 text-zinc-400">{c.topic}</Badge>
            </div>
            {/* Source + date prominent — a card is a dated citation. */}
            <div className="mt-1 text-xs text-muted-foreground">
              {c.source} · <span className="font-medium">{c.published ?? "date unknown"}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/90">{c.summary}</p>
            {c.sowhat && (
              <p className="mt-1 text-sm italic text-muted-foreground">→ {c.sowhat}</p>
            )}
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs text-primary hover:underline"
              >
                source ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchView({ result }: { result: ResearchResult }) {
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge className="border-border bg-card text-muted-foreground">
          confidence: {result.confidence}
        </Badge>
        <Badge className="border-border bg-card text-muted-foreground">
          retrieved {result.retrieval_date}
        </Badge>
        <Badge className="border-emerald-700 bg-emerald-950 text-emerald-300">
          KB {result.sources_used.kb_cards}
        </Badge>
        <Badge className="border-sky-700 bg-sky-950 text-sky-300">
          curated {result.sources_used.curated}
        </Badge>
        <Badge className="border-zinc-700 bg-zinc-900 text-zinc-400">
          web {result.sources_used.web}
        </Badge>
      </div>

      <article className="prose prose-invert mt-4 max-w-none prose-a:text-primary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.answer}</ReactMarkdown>
      </article>

      {result.warnings.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-800 bg-amber-950/40 p-3">
          <div className="text-xs font-semibold text-amber-300">Grounding warnings</div>
          <ul className="mt-1 list-disc pl-5 text-xs text-amber-200/80">
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {result.citations.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-semibold text-foreground">Citations</div>
          <ol className="mt-2 grid gap-1.5">
            {result.citations.map((c, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="text-muted-foreground">{i + 1}.</span>
                <Badge className={TIER_STYLE[c.tier] ?? TIER_STYLE.web}>{c.tier}</Badge>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  {c.title || c.url}
                </a>
                <span className="text-xs text-muted-foreground">
                  {c.date ?? "date unknown"}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

const KnowledgeSearch = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("kb");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [kbResult, setKbResult] = useState<KbResult | null>(null);
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q || loading) return;
    setLoading(true);
    setError("");
    setKbResult(null);
    setResearchResult(null);
    try {
      const endpoint = mode === "kb" ? "/k/api/search" : "/k/api/research";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || `Request failed (HTTP ${res.status}).`);
      } else if (mode === "kb") {
        setKbResult(data as KbResult);
      } else {
        setResearchResult(data as ResearchResult);
      }
    } catch {
      setError("Could not reach the research service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card/50 p-5">
      <form onSubmit={submit}>
        <div className="flex gap-2">
          {(["kb", "research"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {m === "kb" ? "Knowledge base" : "Deep research"}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "kb"
                ? "Search the knowledge base…"
                : "Ask a decision question…"
            }
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {loading ? "…" : "Search"}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {mode === "kb"
            ? "Instant BM25 retrieval over the curated knowledge base — no web, no LLM."
            : "Full grounded loop: knowledge base + curated sources + web, synthesized. Takes ~1-2 minutes."}
        </p>
      </form>

      {loading && mode === "research" && (
        <p className="mt-6 text-muted-foreground">
          Researching across all three tiers… this takes ~1-2 minutes.
        </p>
      )}
      {loading && mode === "kb" && (
        <p className="mt-6 text-muted-foreground">Searching…</p>
      )}
      {error && <p className="mt-6 text-amber-300">{error}</p>}
      {kbResult && <CardList result={kbResult} />}
      {researchResult && <ResearchView result={researchResult} />}
    </div>
  );
};

export default KnowledgeSearch;
