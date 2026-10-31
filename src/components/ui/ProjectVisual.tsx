"use client";

import { motion, type Variants } from "framer-motion";
import type { ProjectVisualKind } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

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

// Mini app screens for the featured projects: simplified from the real layouts, with
// fictional data and only the site palette. Green marks the one element that tells the story.

const MONO = { fontFamily: "var(--font-plex-mono), ui-monospace, monospace" } as const;
const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: EASE } },
});

// Window chrome shared by the desktop screens: frame, title bar with three dots.
function AppWindow() {
  return (
    <>
      <rect width="400" height="300" fill="var(--bg)" />
      <rect
        x="10.5"
        y="10.5"
        width="379"
        height="279"
        fill="var(--bg-elevated)"
        stroke="var(--border-strong)"
      />
      <line x1="10.5" y1="24.5" x2="389.5" y2="24.5" stroke="var(--border-strong)" />
      {[19, 27, 35].map((cx) => (
        <circle key={cx} cx={cx} cy="17.5" r="2" fill="var(--muted-2)" />
      ))}
    </>
  );
}

function ManagerAdvVisual() {
  const reduced = useReducedMotion();
  const rowTop = (i: number) => 66 + i * 44;

  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="Tela de atendimento do Manager ADV: fila de conversas, caso na etapa 4 de 10 e rascunho de resposta da IA aguardando revisão humana"
    >
      <AppWindow />
      <motion.g
        // Reduced motion is only known after hydration: remount so it starts in the final state.
        key={reduced ? "static" : "animated"}
        style={MONO}
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Sidebar: case-flow sections, Atendimento active */}
        <line x1="38.5" y1="25" x2="38.5" y2="289" stroke="var(--border)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={i}>
            {i === 1 && <rect x="14" y={54 + i * 20 - 4} width="21" height="16" fill="var(--bg)" />}
            <rect
              x="20"
              y={54 + i * 20}
              width="9"
              height="8"
              rx="1.5"
              fill={i === 1 ? "var(--fg)" : "var(--muted-2)"}
              opacity={i === 1 ? 1 : 0.55}
            />
          </g>
        ))}

        {/* Conversation queue */}
        <line x1="140.5" y1="25" x2="140.5" y2="289" stroke="var(--border)" />
        <rect x="45.5" y="31.5" width="88" height="11" fill="none" stroke="var(--border-strong)" />
        <rect x="51" y="35.5" width="34" height="3" fill="var(--muted-2)" opacity="0.6" />
        <text x="46" y="56" fontSize="8" fill="var(--fg)">
          Aguardando (3)
        </text>
        <rect x="46" y="59" width="67" height="1" fill="var(--fg)" />
        <rect x="120" y="51" width="14" height="4" fill="var(--muted-2)" opacity="0.6" />

        {[0, 1, 2, 3, 4].map((i) => {
          const top = rowTop(i);
          return (
            <g key={i}>
              {i === 0 && (
                <>
                  <rect x="39" y={top} width="101" height="44" fill="var(--bg)" />
                  <rect x="39" y={top} width="2" height="44" fill="var(--fg)" />
                </>
              )}
              <rect
                x="47"
                y={top + 7}
                width={[46, 40, 52, 36, 44][i]}
                height="5"
                fill="var(--fg)"
                opacity="0.75"
              />
              {i === 0 ? (
                <text x="134" y={top + 12} fontSize="7.5" textAnchor="end" fill="var(--fg)">
                  1h 20m
                </text>
              ) : (
                <rect x="118" y={top + 8} width="16" height="3.5" fill="var(--muted)" opacity="0.6" />
              )}
              <rect
                x="47"
                y={top + 18}
                width={[74, 62, 68, 70, 58][i]}
                height="3.5"
                fill="var(--muted-2)"
                opacity="0.5"
              />
              {i === 2 && <circle cx="129" cy={top + 20} r="4.5" fill="var(--fg)" />}
              <circle cx="49" cy={top + 32} r="2" fill={i === 0 ? "var(--fg)" : "var(--muted)"} />
              <rect x="55" y={top + 30.5} width={[34, 28, 40, 30, 36][i]} height="3" fill="var(--muted-2)" opacity="0.55" />
              <line x1="39" y1={top + 44} x2="140" y2={top + 44} stroke="var(--border)" />
            </g>
          );
        })}

        {/* Chat header: client, stage of the 10-step case pipeline */}
        <rect x="141" y="25" width="248.5" height="264.5" fill="var(--bg)" />
        <circle cx="157" cy="40" r="9" fill="var(--border-strong)" />
        <text x="157" y="42.6" fontSize="7" textAnchor="middle" fill="var(--fg)">
          MS
        </text>
        <rect x="172" y="32" width="58" height="5" fill="var(--fg)" opacity="0.8" />
        <text x="172" y="48" fontSize="7.5" fill="var(--muted)">
          Etapa 4 de 10 · Produção
        </text>
        {/* AI mode toggle (Off / Suggest / Automatic) */}
        <rect x="345.5" y="32.5" width="36" height="12" fill="none" stroke="var(--border-strong)" />
        <path d="M352 35 l-2.5 4.2 h2.4 l-1.4 3.6 l4-5 h-2.4 l1.6-2.8 z" fill="var(--muted)" />
        <rect x="359" y="37" width="17" height="3" fill="var(--muted-2)" opacity="0.7" />
        <rect x="149" y="56" width="232" height="2" fill="var(--border-strong)" />
        <rect x="149" y="56" width="92.8" height="2" fill="var(--fg)" />

        {/* Next step */}
        <line x1="141" y1="64.5" x2="389.5" y2="64.5" stroke="var(--border)" />
        <text x="149" y="77" fontSize="7" letterSpacing="0.6" fill="var(--muted)">
          PRÓXIMO PASSO
        </text>
        <rect x="290.5" y="68.5" width="91" height="12" fill="none" stroke="var(--fg)" strokeOpacity="0.6" />
        <text x="336" y="77" fontSize="7" textAnchor="middle" fill="var(--fg)">
          Pedir 2 documentos
        </text>
        <line x1="141" y1="86.5" x2="389.5" y2="86.5" stroke="var(--border)" />

        {/* Messages: client on the left, office on the right */}
        <motion.g variants={fadeUp(0.15)}>
          <rect x="149" y="94" width="124" height="24" rx="3" fill="var(--bg-elevated)" />
          <rect x="156" y="100" width="104" height="3.5" fill="var(--muted)" opacity="0.6" />
          <rect x="156" y="108" width="70" height="3.5" fill="var(--muted)" opacity="0.6" />
        </motion.g>
        <motion.g variants={fadeUp(0.45)}>
          <rect x="261" y="124" width="120" height="17" rx="3" fill="var(--border-strong)" />
          <rect x="268" y="130.5" width="96" height="3.5" fill="var(--fg)" opacity="0.55" />
        </motion.g>
        <motion.g variants={fadeUp(0.75)}>
          <rect x="149" y="147" width="96" height="17" rx="3" fill="var(--bg-elevated)" />
          <rect x="156" y="153.5" width="74" height="3.5" fill="var(--muted)" opacity="0.6" />
        </motion.g>
        <motion.g variants={fadeUp(1.05)}>
          <rect x="277" y="170" width="104" height="17" rx="3" fill="var(--border-strong)" />
          <rect x="284" y="176.5" width="80" height="3.5" fill="var(--fg)" opacity="0.55" />
        </motion.g>

        {/* AI draft: the AI suggests, a person reviews and decides */}
        <motion.g variants={fadeUp(1.4)}>
          <rect x="149" y="204" width="232" height="78" fill="var(--accent-dim)" />
          <rect x="149" y="204" width="3" height="78" fill="var(--accent)" />
          <text x="160" y="219" fontSize="7.5" letterSpacing="0.3" fill="var(--accent)">
            RASCUNHO DA IA · REVISE ANTES DE ENVIAR
          </text>
          {!reduced &&
            [0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={164 + i * 7}
                cy="234"
                r="2"
                fill="var(--fg)"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: [0, 1, 0.3, 1, 0.3, 1, 0],
                    transition: { delay: 1.75 + i * 0.12, duration: 1.4, ease: "linear" },
                  },
                }}
              />
            ))}
          <motion.g
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: reduced ? 0 : 3.2, duration: 0.4 } },
            }}
          >
            <rect x="160" y="228" width="196" height="3.5" fill="var(--fg)" opacity="0.6" />
            <rect x="160" y="237" width="150" height="3.5" fill="var(--fg)" opacity="0.6" />
          </motion.g>
          <rect x="160" y="252" width="46" height="17" rx="2" fill="var(--accent)" />
          <text x="183" y="263" fontSize="8" textAnchor="middle" fill="var(--bg)">
            Enviar
          </text>
          <rect x="212.5" y="252.5" width="34" height="16" rx="2" fill="none" stroke="var(--border-strong)" />
          {/* Edit: pencil icon */}
          <path d="M225 264.5 l1-3.2 6.4-6.4 2.2 2.2 -6.4 6.4 z" fill="none" stroke="var(--fg)" strokeWidth="1" />
        </motion.g>
      </motion.g>
    </svg>
  );
}

// Weekly cash in (up) and out (down); the last five weeks are the forecast built from
// open receivables and payables.
const CASH_IN = [44, 52, 38, 60, 48, 66, 54, 58, 46, 50, 56, 48, 60, 52];
const CASH_OUT = [30, 36, 28, 40, 34, 44, 38, 30, 42, 34, 40, 32, 38, 36];
const FORECAST_FROM = 9;
const BAR_X = (i: number) => 96 + i * 20.5;
const ZERO_Y = 208;

function balancePoints(from: number, to: number) {
  let total = 0;
  const points: string[] = [];
  CASH_IN.forEach((value, i) => {
    total += value - CASH_OUT[i];
    if (i >= from && i <= to) points.push(`${BAR_X(i) + 5.5},${(188 - total * 0.3).toFixed(1)}`);
  });
  return points.join(" ");
}

function CaixaNovoVisual() {
  const reduced = useReducedMotion();
  const barDelay = (i: number) => (i < FORECAST_FROM ? 0.1 + i * 0.06 : 0.85 + (i - FORECAST_FROM) * 0.06);

  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="Tela de fluxo de caixa do Caixa Novo: entradas, saídas e saldo da semana, com gráfico de entradas e saídas e previsão das próximas semanas"
    >
      <AppWindow />
      <motion.g
        // Reduced motion is only known after hydration: remount so it starts in the final state.
        key={reduced ? "static" : "animated"}
        style={MONO}
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Sidebar: generic logo block and six sections, Cash flow active */}
        <line x1="80.5" y1="25" x2="80.5" y2="289" stroke="var(--border)" />
        <rect x="18" y="33" width="40" height="11" fill="var(--border-strong)" />
        {[40, 34, 44, 38, 42, 46].map((width, i) => {
          const y = 58 + i * 20;
          return (
            <g key={i}>
              {i === 1 && <rect x="14" y={y - 5.5} width="62" height="14" fill="var(--bg)" />}
              <rect
                x="20"
                y={y}
                width={width - 10}
                height="3.5"
                fill={i === 1 ? "var(--fg)" : "var(--muted-2)"}
                opacity={i === 1 ? 0.9 : 0.6}
              />
              {i === 2 && (
                <>
                  <circle cx="69" cy={y + 1.75} r="4.5" fill="var(--fg)" />
                  <text x="69" y={y + 4.2} fontSize="6.5" textAnchor="middle" fill="var(--bg)">
                    7
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Title and Day | Week | Month, Week active */}
        <text x="92" y="43" fontSize="9" fill="var(--fg)">
          Fluxo de caixa
        </text>
        <rect x="302.5" y="32.5" width="75" height="13" fill="none" stroke="var(--border-strong)" />
        <rect x="327.5" y="32.5" width="25" height="13" fill="var(--border-strong)" />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={308 + i * 25}
            y="37.5"
            width="14"
            height="3"
            fill={i === 1 ? "var(--fg)" : "var(--muted-2)"}
            opacity={i === 1 ? 0.9 : 0.6}
          />
        ))}

        {/* KPIs */}
        {[
          { label: "ENTRADAS", value: "R$ 3,4 mi", color: "var(--accent)" },
          { label: "SAÍDAS", value: "R$ 2,8 mi", color: "var(--muted)" },
          { label: "SALDO", value: "+R$ 0,6 mi", color: "var(--fg)" },
        ].map((kpi, i) => (
          <g key={kpi.label}>
            <rect x={92.5 + i * 96} y="54.5" width="93" height="34" fill="none" stroke="var(--border-strong)" />
            <text x={100 + i * 96} y="67" fontSize="7" letterSpacing="0.6" fill="var(--muted)">
              {kpi.label}
            </text>
            <text x={100 + i * 96} y="82" fontSize="9.5" fill={kpi.color}>
              {kpi.value}
            </text>
          </g>
        ))}

        {/* Diverging bars around zero, forecast weeks translucent */}
        <line x1="90" y1={ZERO_Y + 0.5} x2="378" y2={ZERO_Y + 0.5} stroke="var(--border-strong)" />
        {CASH_IN.map((value, i) => {
          const forecast = i >= FORECAST_FROM;
          const grow: Variants = {
            hidden: { scaleY: 0, opacity: forecast ? 0.35 : 1 },
            visible: {
              scaleY: 1,
              opacity: forecast ? 0.35 : 1,
              transition: { delay: barDelay(i), duration: 0.6, ease: EASE },
            },
          };
          return (
            <g key={i}>
              <motion.rect
                x={BAR_X(i)}
                y={ZERO_Y - value}
                width="11"
                height={value}
                fill="var(--accent)"
                style={{ transformBox: "fill-box", originY: 1 }}
                variants={grow}
              />
              <motion.rect
                x={BAR_X(i)}
                y={ZERO_Y + 1}
                width="11"
                height={CASH_OUT[i]}
                fill="var(--muted-2)"
                style={{ transformBox: "fill-box", originY: 0 }}
                variants={grow}
              />
            </g>
          );
        })}

        <line
          x1={BAR_X(FORECAST_FROM) - 4.75}
          y1="112"
          x2={BAR_X(FORECAST_FROM) - 4.75}
          y2="280"
          stroke="var(--muted)"
          strokeDasharray="3 3"
        />
        <text x={BAR_X(FORECAST_FROM) + 1} y="120" fontSize="7" letterSpacing="0.6" fill="var(--muted)">
          PREVISÃO
        </text>

        {/* Running balance */}
        <motion.polyline
          points={balancePoints(0, FORECAST_FROM)}
          fill="none"
          stroke="var(--fg)"
          strokeWidth="1.25"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { delay: 0.6, duration: 0.9, ease: "easeOut" } },
          }}
        />
        <motion.polyline
          points={balancePoints(FORECAST_FROM, CASH_IN.length - 1)}
          fill="none"
          stroke="var(--fg)"
          strokeWidth="1.25"
          strokeDasharray="2.5 2.5"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.7, transition: { delay: 1.4, duration: 0.5 } },
          }}
        />
      </motion.g>
    </svg>
  );
}

const VISUALS: Record<ProjectVisualKind, () => React.ReactElement> = {
  ngo: NgoVisual,
  ecopiso: EcopisoVisual,
  agent: AgentVisual,
  gsfront: GsFrontVisual,
  manageradv: ManagerAdvVisual,
  caixanovo: CaixaNovoVisual,
};

export function ProjectVisual({ visual }: { visual: ProjectVisualKind }) {
  const Visual = VISUALS[visual];
  return <Visual />;
}
