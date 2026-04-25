import { useState } from "react";

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function escapeLatex(str = "") {
  return str
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}");
}

export function employmentToLatex(employments) {
  return employments
    .map((job) => {
      const start = formatDate(job.start);
      const end = formatDate(job.end);

      const dateLine =
        start && end
          ? `${start} -- ${end}`
          : start
            ? `Since ${start}`
            : end
              ? `Until ${end}`
              : "";

      const duties = job.duties_conducted
        .map((d) => `\\item ${escapeLatex(d)}`)
        .join("\n");

      return `
\\subsection*{${escapeLatex(job.officialTitle)}}

\\textit{${escapeLatex(job.employerPublic)} — ${escapeLatex(
        job.employerBlindName,
      )}} \\\\
\\textit{${dateLine}}

${escapeLatex(job.excerpt)}

\\begin{itemize}
${duties}
\\end{itemize}
      `.trim();
    })
    .join("\n\n");
}

export function LatexEmploymentViewer({ data }) {
  const [open, setOpen] = useState(false);

  const latex = employmentToLatex(data);

  const copy = async () => {
    await navigator.clipboard.writeText(latex);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => setOpen((v) => !v)}>
        {open ? "Hide LaTeX" : "Show LaTeX"}
      </button>

      <button onClick={copy} style={{ marginLeft: 10 }}>
        Copy LaTeX
      </button>

      {open && (
        <pre
          style={{
            marginTop: 12,
            padding: 12,
            background: "#111",
            color: "#0f0",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {latex}
        </pre>
      )}
    </div>
  );
}
