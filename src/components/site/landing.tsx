import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Activity,
  Check,
  MessageCircle,
  Quote,
  Sparkles,
} from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SiteFooter, SiteHeader } from "@/components/site/chrome";
import heroImg from "@/assets/hero-trail.jpg";
import portraitAsset from "@/assets/leonardo-run-portrait.jpg.asset.json";
import raceAsset from "@/assets/leonardo-race.jpg.asset.json";
import {
  beforeAfter,
  brandWords,
  companies,
  faq,
  methodology,
  pains,
  posts,
  products,
  projects,
  specialties,
  stats,
  testimonials,
} from "@/lib/mock";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <WordMarquee />
        <About />
        <Methodology />
        <Specialties />
        <Results />
        <BeforeAfter />
        <Pain />
        <PrimaryCta />
        <Companies />
        <Projects />
        <Blog />
        <Products />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28 ${className}`}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>}
      </Reveal>
      <div className="mt-12 lg:mt-16">{children}</div>
    </section>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[92svh] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Atleta correndo em trilha de montanha ao amanhecer"
        width={1600}
        height={1008}
        style={{ y, scale }}
        className="absolute inset-0 size-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
      <div className="grid-lines absolute inset-0 opacity-40" />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 lg:px-8 lg:pb-24"
      >
        <Stagger className="max-w-4xl" gap={0.09}>
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/40 px-3.5 py-1.5 backdrop-blur">
              <Activity className="size-3.5 text-primary" />
              <span className="eyebrow text-[10px] text-foreground/80">
                Educação Física · Gestão Ambiental
              </span>
            </span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-7 text-[2.6rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
              Evolução física
              <br />
              <span className="signal-text">construída com ciência</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Não quero apenas o seu investimento. Quero o seu resultado. Acompanhamento
              individual, prescrição baseada em evidências e presença real em cada ciclo.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                style={{ boxShadow: "var(--shadow-signal)" }}
              >
                <MessageCircle className="size-4" />
                Falar pelo WhatsApp
              </a>
              <Link
                to="/aluno"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
              >
                Ver a plataforma
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </StaggerItem>
        </Stagger>

        <Stagger className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <p className="font-mono text-2xl font-medium sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </motion.div>
    </div>
  );
}

function WordMarquee() {
  const doubled = [...brandWords, ...brandWords];
  return (
    <div className="border-y border-border bg-surface/40 py-5">
      <div className="no-scrollbar overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-8">
          {doubled.map((w, i) => (
            <span key={`${w}-${i}`} className="flex items-center gap-8">
              <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">{w}</span>
              <span className="size-1 rounded-full bg-primary/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl" />
            <img
              src={portrait}
              alt="Retrato de Leonardo Lopes"
              width={1008}
              height={1264}
              loading="lazy"
              className="relative w-full rounded-2xl border border-border object-cover elevated"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">Sobre Leonardo</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
              Um profissional que acolhe antes de prescrever
            </h2>
            <div className="mt-6 grid gap-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Formado em Educação Física e em Gestão Ambiental, Leonardo une o rigor da ciência
                do exercício à leitura sensível de cada história. São mais de doze anos entre
                academias, pistas, piscinas e trilhas.
              </p>
              <p>
                O propósito é simples e exigente: transformar vidas por meio do movimento,
                respeitando idade, condição física, limitações e histórico de cada pessoa.
              </p>
            </div>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Atendimento humanizado",
              "Ciência aplicada à prática",
              "Constância acima da perfeição",
              "Respeito às limitações",
            ].map((p) => (
              <StaggerItem key={p}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm">{p}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <div className="border-y border-border bg-surface/30">
      <SectionShell
        id="metodologia"
        eyebrow="Como trabalho"
        title="Mais do que montar treinos, meu compromisso é acompanhar a sua evolução"
        lead="Um ciclo contínuo de avaliação, prescrição e ajuste — sempre com comunicação direta."
      >
        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m) => (
            <StaggerItem key={m.step}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass-panel h-full p-6"
              >
                <span className="font-mono text-xs text-primary">{m.step}</span>
                <h3 className="mt-5 text-lg font-medium">{m.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionShell>
    </div>
  );
}

function Specialties() {
  return (
    <SectionShell
      eyebrow="Especialidades"
      title="Do primeiro passo à montanha"
      lead="Programas distintos, mesma lógica: individualização e progressão sustentável."
    >
      <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((s) => (
          <StaggerItem key={s.title}>
            <div className="group h-full bg-surface p-7 transition-colors hover:bg-surface-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
}

function Results() {
  return (
    <div id="resultados" className="border-y border-border bg-surface/30">
      <SectionShell
        eyebrow="Resultados"
        title="Prova, não promessa"
        lead="Números de acompanhamento real, medidos ciclo a ciclo."
      >
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "480+", v: "alunos acompanhados desde 2013" },
            { k: "94%", v: "seguem ativos após seis meses" },
            { k: "2.100", v: "avaliações físicas realizadas" },
            { k: "38", v: "provas de corrida com alunos" },
          ].map((s) => (
            <StaggerItem key={s.k}>
              <div className="surface-panel h-full p-6">
                <p className="font-mono text-3xl font-medium signal-text">{s.k}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.v}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionShell>
    </div>
  );
}

function BeforeAfter() {
  return (
    <SectionShell
      eyebrow="Antes e depois"
      title="Evolução medida, não estimada"
      lead="Registros padronizados e indicadores objetivos de cada ciclo."
    >
      <Stagger className="grid gap-4 md:grid-cols-3">
        {beforeAfter.map((b) => (
          <StaggerItem key={b.name}>
            <div className="surface-panel overflow-hidden">
              <div className="grid grid-cols-2 gap-px bg-border">
                {["Antes", "Depois"].map((label, i) => (
                  <div
                    key={label}
                    className="relative aspect-[3/4] bg-surface-2"
                    style={{
                      background: i
                        ? "linear-gradient(160deg, oklch(0.3 0.05 150), oklch(0.2 0.01 155))"
                        : "linear-gradient(160deg, oklch(0.26 0.01 155), oklch(0.19 0.008 155))",
                    }}
                  >
                    <span className="eyebrow absolute left-3 top-3 text-[10px]">{label}</span>
                  </div>
                ))}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{b.name}</p>
                  <span className="font-mono text-xs text-muted-foreground">{b.weeks} semanas</span>
                </div>
                <p className="mt-2 font-mono text-2xl text-primary">{b.delta}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b.metric}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
}

function Pain() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/50">
      <div className="absolute -left-40 top-1/2 size-[420px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <SectionShell
        eyebrow="Você se reconhece?"
        title="O problema quase nunca é falta de vontade. É falta de método e de presença."
      >
        <Stagger className="flex flex-wrap gap-3">
          {pains.map((p) => (
            <StaggerItem key={p}>
              <span className="inline-flex rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm text-muted-foreground">
                {p}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed">
            Se você leu a si mesmo em alguma dessas frases, o próximo passo não é um treino. É uma
            conversa.
          </p>
        </Reveal>
      </SectionShell>
    </div>
  );
}

function PrimaryCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:p-16">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="absolute -right-20 -top-20 size-[320px] rounded-full bg-primary/15 blur-[110px]" />
          <div className="relative max-w-2xl">
            <p className="eyebrow">Primeiro passo</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-5xl">
              Escolher viver melhor começa com uma decisão simples
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Conversamos sobre sua rotina, seu histórico e seus objetivos. Sem compromisso, sem
              discurso pronto.
            </p>
            <a
              href="#contato"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{ boxShadow: "var(--shadow-signal)" }}
            >
              <MessageCircle className="size-4" />
              Dar o primeiro passo
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Companies() {
  const doubled = [...companies, ...companies];
  return (
    <div className="border-y border-border bg-surface/30 py-10">
      <p className="eyebrow text-center">Empresas e instituições atendidas</p>
      <div className="no-scrollbar mt-6 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-12">
          {doubled.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap text-lg font-medium tracking-tight text-muted-foreground/70"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <SectionShell
      id="projetos"
      eyebrow="Projetos"
      title="O trabalho vai além do atendimento individual"
      lead="Programas empresariais, ações sociais, palestras e eventos em ambiente natural."
    >
      <Stagger className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <StaggerItem key={p.title}>
            <motion.article whileHover={{ y: -6 }} className="glass-panel h-full overflow-hidden">
              <div
                className="h-40"
                style={{ background: "linear-gradient(140deg, oklch(0.32 0.07 150), oklch(0.2 0.01 155))" }}
              />
              <div className="p-6">
                <span className="eyebrow text-[10px]">{p.kind}</span>
                <h3 className="mt-3 text-lg font-medium">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
}

function Blog() {
  return (
    <div id="blog" className="border-y border-border bg-surface/30">
      <SectionShell eyebrow="Conteúdo" title="Autoridade construída com informação honesta">
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {posts.map((p) => (
            <StaggerItem key={p.title}>
              <a href="#blog" className="group block h-full bg-surface p-7 hover:bg-surface-2">
                <span className="eyebrow text-[10px] text-primary">{p.cat}</span>
                <h3 className="mt-4 text-lg font-medium leading-snug">{p.title}</h3>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{p.read} de leitura</span>
                  <ArrowUpRight className="size-4 transition-colors group-hover:text-primary" />
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </SectionShell>
    </div>
  );
}

function Products() {
  return (
    <SectionShell
      id="produtos"
      eyebrow="Produtos e serviços"
      title="Formas diferentes de começar"
      lead="Da avaliação pontual ao acompanhamento contínuo."
    >
      <Stagger className="grid gap-4 md:grid-cols-3">
        {products.map((p, i) => (
          <StaggerItem key={p.title}>
            <div
              className={`surface-panel h-full p-7 ${i === 0 ? "ring-1 ring-primary/40" : ""}`}
            >
              {i === 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
                  <Sparkles className="size-3" /> mais escolhido
                </span>
              )}
              <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
              <p className="mt-3 font-mono text-2xl">{p.price}</p>
              <ul className="mt-6 grid gap-2.5">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-border-strong px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Quero saber mais
              </a>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </SectionShell>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i] ?? testimonials[0]!;

  return (
    <div className="border-y border-border bg-surface/40">
      <SectionShell eyebrow="Depoimentos" title="Quem acompanha, conta melhor">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Quote className="size-6 text-primary" />
            <p className="mt-5 text-2xl font-light leading-snug sm:text-3xl">{t.quote}</p>
            <footer className="mt-7 text-sm">
              <span className="font-medium">{t.name}</span>
              <span className="text-muted-foreground"> · {t.role}</span>
            </footer>
          </motion.blockquote>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Depoimento ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 bg-primary" : "w-5 bg-border-strong"
                }`}
              />
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionShell eyebrow="Dúvidas" title="Perguntas frequentes">
      <div className="max-w-3xl divide-y divide-border rounded-2xl border border-border bg-surface/50">
        {faq.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
            >
              <span className="text-base font-medium">{f.q}</span>
              <span className="font-mono text-sm text-primary">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden px-6 pb-6 text-sm leading-relaxed text-muted-foreground"
              >
                {f.a}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contato" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contato</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
            Vamos entender o seu ponto de partida
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Preencha e retorno pelo WhatsApp. Ao enviar, seu contato entra no acompanhamento e
            aguarda a avaliação inicial.
          </p>
          <div className="mt-9 grid gap-3 text-sm">
            {["WhatsApp · (31) 90000-0000", "contato@leonardolopes.com", "Belo Horizonte · MG"].map(
              (x) => (
                <div key={x} className="rounded-xl border border-border bg-surface/60 px-4 py-3.5">
                  {x}
                </div>
              ),
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="surface-panel grid gap-4 p-7"
          >
            <Field label="Nome completo" placeholder="Como devo te chamar?" />
            <Field label="WhatsApp" placeholder="(00) 00000-0000" />
            <Field label="E-mail (opcional)" placeholder="voce@email.com" type="email" />
            <label className="grid gap-2">
              <span className="eyebrow">Objetivo principal</span>
              <textarea
                rows={4}
                placeholder="Conte um pouco sobre sua rotina e o que busca."
                className="rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-3 focus:ring-ring"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              {sent ? "Recebido — retorno em breve" : "Enviar e falar no WhatsApp"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Protótipo — nenhum dado é enviado.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-3 focus:ring-ring"
      />
    </label>
  );
}
