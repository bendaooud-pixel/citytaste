// Renders a markdown-formatted article body without an external library.
// Handles: ## H2, ### H3, | tables |, - lists, **bold**, *italic*, plain paragraphs.

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^\)]+)\)/g,
      (_match, label: string, href: string) => {
        const isExternal = href.startsWith("http");
        const isAffiliate = href.includes("getyourguide.com");
        const rel = isAffiliate ? "sponsored nofollow" : isExternal ? "noopener noreferrer" : "";
        const attrs = isExternal ? ` target="_blank" rel="${rel}"` : "";
        return `<a href="${href}" class="text-orange-500 hover:underline font-medium"${attrs}>${label}</a>`;
      }
    );
}

function renderTable(block: string): string {
  const lines = block.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return `<p>${inlineFormat(block)}</p>`;

  const header = lines[0]
    .split("|")
    .filter((c) => c.trim())
    .map((c) => `<th class="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">${c.trim()}</th>`)
    .join("");

  const rows = lines
    .slice(2) // skip separator row
    .map((row) => {
      const cells = row
        .split("|")
        .filter((c) => c.trim())
        .map(
          (c) =>
            `<td class="px-4 py-3 text-sm text-slate-700 border-t border-slate-100">${inlineFormat(c.trim())}</td>`
        )
        .join("");
      return `<tr class="hover:bg-orange-50/40 transition-colors">${cells}</tr>`;
    })
    .join("");

  return `
    <div class="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
      <table class="min-w-full divide-y divide-slate-100">
        <thead class="bg-slate-50"><tr>${header}</tr></thead>
        <tbody class="bg-white divide-y divide-slate-50">${rows}</tbody>
      </table>
    </div>`;
}

function renderList(block: string): string {
  const items = block
    .split("\n")
    .filter((l) => l.trim().startsWith("- "))
    .map(
      (l) =>
        `<li class="flex gap-2 text-slate-600 text-sm leading-relaxed">
          <span class="text-orange-400 mt-1 flex-shrink-0">▸</span>
          <span>${inlineFormat(l.replace(/^-\s+/, ""))}</span>
        </li>`
    )
    .join("");
  return `<ul class="space-y-2 my-4 ml-1">${items}</ul>`;
}

interface Props {
  body: string;
  className?: string;
}

export default function MarkdownRenderer({ body, className = "" }: Props) {
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);

  const renderedHtml = blocks
    .map((block) => {
      if (block.startsWith("## ")) {
        const text = inlineFormat(block.slice(3));
        return `<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4" style="font-family:var(--font-playfair)">${text}</h2>`;
      }
      if (block.startsWith("### ")) {
        const text = inlineFormat(block.slice(4));
        return `<h3 class="text-lg font-bold text-slate-800 mt-6 mb-3">${text}</h3>`;
      }
      if (block.startsWith("|")) {
        return renderTable(block);
      }
      if (block.split("\n").every((l) => !l.trim() || l.trim().startsWith("- "))) {
        return renderList(block);
      }
      return `<p class="text-slate-600 leading-relaxed mb-4">${inlineFormat(block)}</p>`;
    })
    .join("\n");

  return (
    <div
      className={`prose-citytaste ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
