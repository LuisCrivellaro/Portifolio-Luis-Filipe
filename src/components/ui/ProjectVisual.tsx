import type { Project } from "@/lib/data";

function NgoVisual() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      <rect width="400" height="300" fill="var(--bg-elevated)" />
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row} transform={`translate(40, ${50 + row * 44})`}>
          <rect width="10" height="10" fill={row === 1 ? "var(--accent)" : "var(--muted-2)"} />
          <rect x="26" width={row === 0 ? 220 : 260 - row * 18} height="10" fill="var(--muted-2)" opacity="0.6" />
        </g>
      ))}
      <line x1="40" y1="30" x2="360" y2="30" stroke="var(--border-strong)" />
    </svg>
  );
}

function EcopisoVisual() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      <rect width="400" height="300" fill="var(--bg-elevated)" />
      <g opacity="0.35">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={i * 70} y1="0" x2={i * 70 + 90} y2="300" stroke="var(--muted-2)" />
        ))}
      </g>
      <polyline
        points="30,220 100,180 150,200 210,110 270,140 340,60"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
      />
      {[
        [30, 220],
        [100, 180],
        [150, 200],
        [210, 110],
        [270, 140],
        [340, 60],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="var(--fg)" />
      ))}
    </svg>
  );
}

function AgentVisual() {
  const nodes = [
    [80, 150],
    [200, 70],
    [200, 230],
    [320, 150],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      <rect width="400" height="300" fill="var(--bg-elevated)" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--muted-2)"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 3 ? 10 : 7}
          fill={i === 3 ? "var(--accent)" : "var(--bg)"}
          stroke={i === 3 ? "var(--accent)" : "var(--fg)"}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function GsFrontVisual() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      <rect width="400" height="300" fill="var(--bg-elevated)" />
      <rect x="24" y="24" width="352" height="252" fill="none" stroke="var(--border-strong)" />
      <circle cx="42" cy="42" r="3" fill="var(--muted-2)" />
      <circle cx="54" cy="42" r="3" fill="var(--muted-2)" />
      <circle cx="66" cy="42" r="3" fill="var(--muted-2)" />
      <line x1="24" y1="58" x2="376" y2="58" stroke="var(--border-strong)" />
      <rect x="44" y="82" width="140" height="16" fill="var(--muted-2)" opacity="0.7" />
      <rect x="44" y="112" width="200" height="8" fill="var(--muted-2)" opacity="0.4" />
      <rect x="44" y="128" width="170" height="8" fill="var(--muted-2)" opacity="0.4" />
      <rect x="44" y="160" width="90" height="26" fill="var(--accent)" opacity="0.85" />
    </svg>
  );
}

const VISUALS: Record<Project["visual"], () => React.ReactElement> = {
  ngo: NgoVisual,
  ecopiso: EcopisoVisual,
  agent: AgentVisual,
  gsfront: GsFrontVisual,
};

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  const Visual = VISUALS[visual];
  return <Visual />;
}
