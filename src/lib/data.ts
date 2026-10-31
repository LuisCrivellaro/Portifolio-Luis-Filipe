// Content for the whole site. Any field left undefined is omitted from the page.
// Never fill a TODO with a guess: leave it empty until the real value is known.

// TODO: LinkedIn member ID (starts with "ACoAA"), so "Entrar em contato" opens the chat directly.
// Until it is set, the buttons open the LinkedIn profile, where the "Mensagem" button is.
const LINKEDIN_MEMBER_ID: string | undefined = undefined;
const LINKEDIN_PROFILE = "https://www.linkedin.com/in/luis-crivellaro/";

export const SITE = {
  name: "Luis Filipe Crivellaro",
  role: "Engenheiro de Software | IA & Automação",
  // Options considered:
  //   "Construo sistemas internos e agentes de IA que rodam em empresas reais."
  //   "Sistemas internos, agentes de IA e automação, feitos para empresas que usam no dia a dia."
  //   "Software que faz empresas reais funcionarem: sistemas internos, agentes de IA e automação."
  headline: "Construo sistemas internos e agentes de IA que rodam em empresas reais.",
  email: "lipecrivellaro468@gmail.com",
  github: "https://github.com/LuisCrivellaro",
  linkedin: LINKEDIN_PROFILE,
  linkedinChat: LINKEDIN_MEMBER_ID
    ? `https://www.linkedin.com/messaging/compose/?recipient=${LINKEDIN_MEMBER_ID}`
    : LINKEDIN_PROFILE,
  instagram: "https://www.instagram.com/lipe.crivellaro/",
  // Shown as a small status in the Hero and in Contact.
  availability: "Disponível para estágio e projetos freelance" as string | undefined,
  // Shown as a "Baixar currículo" button once the file exists in public/.
  cv: "/cv-luis-crivellaro.pdf",
} as const;

export type Testimonial = {
  name: string; // "Nome Sobrenome"
  role: string; // "Sócia" | "Gerente de Operações" | "Professor"
  company: string; // "ScaleUp" | "Escritório de advocacia" | "FIAP"
  quote: string; // real testimonial, 1 to 3 sentences
  photo?: string; // "/images/testimonials/nome.jpg" (only with permission)
  linkedin?: string; // the person's profile, for anyone who wants to check
  project?: string; // id of a featured project, e.g. "manager-adv"
};

// Only real people who authorized publication. Never fill with examples.
// The section (and its menu link) only appears with 2 or more items. Format:
// {
//   name: "Nome Sobrenome",
//   role: "Gerente de Operações",
//   company: "ScaleUp",
//   quote: "Depoimento real, de 1 a 3 frases.",
//   photo: "/images/testimonials/nome-sobrenome.jpg",
//   linkedin: "https://www.linkedin.com/in/...",
//   project: "manager-adv",
// },
export const TESTIMONIALS: readonly Testimonial[] = [];

export const SHOW_TESTIMONIALS = TESTIMONIALS.length >= 2;

export const NAV_LINKS = [
  { label: "Sobre", href: "#about" },
  { label: "Experiência", href: "#experience" },
  { label: "Projetos", href: "#projects" },
  ...(SHOW_TESTIMONIALS ? [{ label: "Depoimentos", href: "#testimonials" }] : []),
  { label: "Habilidades", href: "#skills" },
  { label: "Contato", href: "#contact" },
];

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const CONTACT = {
  avatar: {
    src: "/images/avatar-sticker-bw.png",
    width: 1024,
    height: 1371,
    alt: "Ilustra\u00e7\u00e3o de Luis Filipe Crivellaro em estilo sticker preto e branco",
  } satisfies Photo,
} as const;

export const ABOUT = {
  paragraphs: [
    "Sou estudante de Engenharia de Software na FIAP. Desde o estágio na ScaleUp construo para clientes reais e, hoje, desenvolvo o sistema interno de um escritório de advocacia internacional.",
    "Meu foco é software que resolve problema de negócio e IA com controle e segurança: o servidor dá a palavra final, e pessoas revisam as etapas que importam.",
  ],
  // Shown once the file exists in public/.
  portrait: {
    src: "/images/luis-retrato.jpg",
    width: 800,
    height: 960,
    alt: "Retrato de Luis Filipe Crivellaro",
  } satisfies Photo,
  focus: [
    "Sistemas internos para empresas",
    "Agentes de IA com controle no servidor",
    "Automação de fluxos com n8n",
    "Integração de APIs",
  ],
  stack: ["TypeScript", "React", "Next.js", "Supabase", "Claude API", "n8n"],
} as const;

export type ExperienceEntry = {
  id: string;
  company: string;
  role?: string;
  start?: string;
  end: string;
  current?: boolean;
  points: readonly string[];
};

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: "law-firm",
    company: "Escritório de advocacia internacional",
    // TODO: job title at the law firm.
    role: undefined,
    // TODO: start month/year, e.g. "Novembro de 2025".
    start: undefined,
    end: "Atual",
    current: true,
    points: [
      "Desenvolvimento de soluções tecnológicas internas",
      "Manager ADV, o sistema interno de gestão jurídica do escritório",
      "Ana, assistente virtual com IA para atendimento e agendamento",
    ],
  },
  {
    id: "scaleup",
    company: "ScaleUp",
    role: "Estagiário de Automação e Inteligência Artificial",
    start: "Março de 2025",
    end: "Outubro de 2025",
    points: [
      "Desenvolvimento de agentes de IA personalizados para empresas",
      "Criação de fluxos automatizados com n8n",
      "Integração de APIs e ferramentas externas",
      "Automação de processos operacionais",
      "Implementação de soluções para reduzir trabalho manual",
      "Aplicação de IA em diferentes contextos de negócio",
    ],
  },
];

export type Recognition = {
  id: string;
  event: string;
  year?: string;
  award?: string;
  description?: string;
  photo?: Photo;
};

// An entry is listed only once its award is filled in.
export const RECOGNITION: readonly Recognition[] = [
  {
    id: "fiap-next",
    event: "FIAP NEXT",
    // TODO: year of the event.
    year: undefined,
    // TODO: placement and category, e.g. "1º lugar — UX Learning Challenge".
    award: undefined,
    // TODO: one sentence about the awarded project and the team.
    description: undefined,
    photo: {
      src: "/images/luis-fiap-next.jpg",
      width: 1200,
      height: 1600,
      alt: "Luis Filipe Crivellaro no palco do FIAP NEXT, com medalha e prêmio",
    },
  },
];

export type ProjectStatus = "Em produção" | "Em teste" | "Protótipo" | "Em uso" | "Em implantação";

export type FeaturedProject = {
  id: string;
  name: string;
  client: string;
  problem: string;
  built: string;
  highlights: readonly string[];
  result?: string;
  tags: readonly string[];
  status?: ProjectStatus;
  statusNote?: string;
  private?: boolean;
  links: readonly { label: string; href: string }[];
  linkNote?: string;
  // Real screenshot with client names covered; when absent, the stylized mini screen is shown.
  image?: Photo;
  // Stylized mini screen of the real system, with fictional data.
  visual: ProjectVisualKind;
};

// Academic visuals (ngo, ecopiso, agent, gsfront) are kept for the earlier projects.
export type ProjectVisualKind = "ngo" | "ecopiso" | "agent" | "gsfront" | "manageradv" | "caixanovo";

export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    id: "manager-adv",
    name: "Manager ADV",
    client: "Escritório de advocacia internacional · Brasil, Dubai e Portugal",
    problem:
      "Um escritório de advocacia internacional precisava acompanhar cada caso do primeiro contato do cliente até o andamento do processo, com um advogado revisando cada etapa jurídica.",
    built:
      "Um sistema interno de gestão jurídica com painel de prazos, produção de petições com IA, fila de aprovação de minutas, auditoria (IA + advogado), clientes, treinamento da IA e painel de integrações. Junto dele, a Ana: assistente virtual com IA que atende clientes 24h pelo Telegram, tira dúvidas gerais e agenda, cancela e remarca consultas na agenda real do Google com link do Meet, seguindo regras de horário por tipo de cliente.",
    highlights: [
      "O modelo devolve apenas JSON validado. Quem decide e executa cada ação é o servidor.",
      "A remarcação cria o novo compromisso antes de apagar o antigo e reverte se algo falhar.",
      "Controle de acesso no banco por proprietário, trilha de auditoria e humano no circuito em cada etapa jurídica.",
      "Integrações reais: Claude (API da Anthropic), Google Agenda, Google Drive e Telegram (WhatsApp implementado e pausado).",
    ],
    // TODO: real result, e.g. cases tracked, hours saved per week, consultations booked by Ana.
    result: undefined,
    tags: [
      "TanStack Start",
      "React 19",
      "TypeScript",
      "Tailwind 4",
      "Vite",
      "Vitest",
      "Drizzle",
      "Supabase",
      "Cloudflare Workers",
      "Claude API",
    ],
    status: "Em produção",
    statusNote: "Atendimento em teste",
    private: true,
    links: [],
    image: {
      src: "/projects/manager-adv.png",
      width: 672,
      height: 504,
      alt: "Painel de casos do Manager ADV: menu do fluxo do caso, prazos, atendimentos e casos acompanhados",
    },
    visual: "manageradv",
  },
  {
    id: "caixa-novo",
    name: "Caixa Novo",
    client: "Distribuidora de frutas · 35 anos de mercado",
    problem:
      "Uma distribuidora de frutas com 35 anos de mercado precisava do fluxo de caixa, das contas a receber e das contas a pagar em um só lugar, feito para o dono e para o financeiro.",
    built:
      "Um painel de fluxo de caixa que funciona no celular, com tema claro e escuro: visão geral, fluxo de caixa, contas a receber e a pagar, fechamento de gaveta, lançamentos e indicadores. Gera um resumo do dia pronto para enviar no WhatsApp, dá uma nota de pagador a cada cliente pelo histórico dos últimos 180 dias, concilia extratos OFX, CSV ou Excel com os lançamentos (valor exato e até 3 dias de diferença na data) e importa planilhas com sugestão de colunas e conferência antes de aplicar.",
    highlights: [
      "Todo valor fica em centavos inteiros, sem erro de ponto flutuante.",
      "A camada de cálculo é separada das telas.",
      "Gráficos em SVG feitos à mão, sem biblioteca pesada.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "SVG", "Python"],
    // TODO: status ("Em uso" or "Em implantação").
    status: undefined,
    links: [
      { label: "GitHub", href: "https://github.com/LuisCrivellaro/Caixa-Novo" },
      // TODO: add { label: "Demo", href: "..." } if there is a deploy.
    ],
    linkNote: "Repositório público, só com dados de exemplo",
    image: {
      src: "/projects/caixa-novo.png",
      width: 1340,
      height: 1005,
      alt: "Visão geral do Caixa Novo com dados de exemplo: saldo projetado, prazos médios e títulos a receber e a pagar nos próximos 7 dias",
    },
    visual: "caixanovo",
  },
  // TODO: 03 — Divina App Conect (visual "divina"): what it is, who it's for, main features, stack, status, link, and the main screen to draw.
  // TODO: 04 — RafaLink CRM (visual "rafalink"): what it is, who it's for, main features, stack, status, link, and the main screen to draw.
  // TODO: 05 — Dark Pool (visual "darkpool"): what it is, who it's for, main features, stack, status, link, and the main screen to draw.
];

export type EarlierProject = {
  id: string;
  name: string;
  description: string;
  href?: string;
};

export const EARLIER_PROJECTS: readonly EarlierProject[] = [
  {
    id: "ngo-system",
    name: "Sistema Institucional para ONG",
    description: "Sistema interno para organizar os dados institucionais e os processos de uma ONG.",
    href: "https://cp1-front-web.vercel.app/",
  },
  {
    id: "ecopiso",
    name: "EcoPiso — Gerador de Energia Sustentável",
    description: "Protótipo de geração de energia limpa, com interface para visualizar dados de energia.",
  },
  {
    id: "ai-agent-automation",
    name: "Agente de IA e Automação",
    description: "Agente de IA para automação de processos, com fluxos no n8n e integração de APIs.",
  },
  {
    id: "gs-front",
    name: "GS Front",
    description: "Projeto front-end desenvolvido e publicado como trabalho acadêmico.",
    href: "https://gs-front-drab.vercel.app/",
  },
];

// TODO: add any tools used by projects 03–05.
export const SKILLS = {
  Desenvolvimento: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "TanStack Start",
    "HTML",
    "CSS",
    "SQL",
    "Python",
  ],
  "Back-end e dados": [
    "Supabase / Postgres",
    "Drizzle ORM",
    "APIs REST",
    "Cloudflare Workers",
    "Power BI",
  ],
  "IA e automação": [
    "Agentes de IA",
    "Claude API (Anthropic)",
    "Uso de ferramentas por LLM com validação no servidor",
    "n8n",
    "Automação de processos",
  ],
  "Ferramentas e qualidade": ["Git", "GitHub", "Vitest", "Vercel"],
} as const;
