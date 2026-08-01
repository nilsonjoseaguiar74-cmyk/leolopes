import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Home,
  Instagram,
  LogIn,
  MessageCircle,
  SkipForward,
  X,
} from "lucide-react";

import logo from "@/assets/logo-leonardo.jpg.asset.json";
import portraitAsset from "@/assets/leonardo-run-portrait.jpg.asset.json";
import raceAsset from "@/assets/leonardo-race.jpg.asset.json";
import heroImg from "@/assets/hero-trail.jpg";
import { contact, methodology, pains, projects, stats } from "@/lib/mock";

/* ────────────────────────────── cenas ────────────────────────────── */

const scenes = [
  { id: "hero", label: "Abertura" },
  { id: "leonardo", label: "Quem é Leonardo" },
  { id: "dor", label: "A dor" },
  { id: "metodologia", label: "Metodologia" },
  { id: "resultados", label: "Resultados" },
  { id: "projetos", label: "Projetos" },
  { id: "cta", label: "Começar" },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/* ────────────────────────── micro-componentes ────────────────────── */

function LetterReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const i = index++;
            return (
              <motion.span
                key={`${char}-${i}`}
                aria-hidden
                className="inline-block"
                initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.022 }}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

function useCountUp(target: number, decimals = 0, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value.toFixed(decimals);
}

function NumberCounter({ value, className }: { value: string; className?: string }) {
  const parsed = useMemo(() => {
    const match = value.match(/[\d.,]+/);
    const raw = match?.[0] ?? "0";
    const numeric = Number(raw.replace(/\./g, "").replace(",", "."));
    const decimals = raw.includes(",") ? 1 : 0;
    return {
      numeric: Number.isFinite(numeric) ? numeric : 0,
      decimals,
      prefix: match ? value.slice(0, match.index) : "",
      suffix: match ? value.slice((match.index ?? 0) + raw.length) : value,
      thousands: raw.includes("."),
    };
  }, [value]);

  const current = useCountUp(parsed.numeric, parsed.decimals);
  const display = parsed.thousands
    ? Number(current).toLocaleString("pt-BR", { maximumFractionDigits: parsed.decimals })
    : current.replace(".", ",");

  return (
    <span className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rx = useSpring(0, { stiffness: 140, damping: 18 });
  const ry = useSpring(0, { stiffness: 140, damping: 18 });

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -12);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`glass-panel rounded-2xl border border-border p-6 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SceneShell({
  children,
  eyebrow,
  parallax,
}: {
  children: React.ReactNode;
  eyebrow: string;
  parallax: { x: number; y: number };
}) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 pb-28 pt-24 lg:px-12">
      <motion.div
        style={{ x: parallax.x * 0.4, y: parallax.y * 0.4 }}
        className="pointer-events-none absolute -left-24 top-1/4 size-[420px] rounded-full bg-primary/12 blur-[130px]"
      />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="eyebrow relative mb-6"
      >
        {eyebrow}
      </motion.p>
      <motion.div style={{ x: parallax.x * -0.18, y: parallax.y * -0.18 }} className="relative">
        {children}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────── experiência ───────────────────────── */

export function EntryLanding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const lock = useRef(false);
  const touchY = useRef(0);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(pointerX, { stiffness: 380, damping: 32 });
  const cursorY = useSpring(pointerY, { stiffness: 380, damping: 32 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const enter = useCallback(
    (to: string) => {
      if (leaving) return;
      setLeaving(true);
      window.setTimeout(() => navigate({ to }), 780);
    },
    [leaving, navigate],
  );

  const go = useCallback(
    (next: number) => {
      if (leaving) return;
      if (next >= scenes.length) {
        enter("/home");
        return;
      }
      const target = Math.max(0, next);
      setDir(target > index ? 1 : -1);
      setIndex(target);
    },
    [enter, index, leaving],
  );

  useEffect(() => {
    const step = (delta: number) => {
      if (lock.current) return;
      lock.current = true;
      window.setTimeout(() => (lock.current = false), 780);
      go(index + delta);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 12) return;
      step(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        step(1);
      }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      }
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onTouchStart = (e: TouchEvent) => (touchY.current = e.touches[0]!.clientY);
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchY.current - (e.changedTouches[0]?.clientY ?? touchY.current);
      if (Math.abs(delta) > 42) step(delta > 0 ? 1 : -1);
    };
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 42,
        y: (e.clientY / window.innerHeight - 0.5) * 42,
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("pointermove", onMove);
    };
  }, [go, index, pointerX, pointerY]);

  const cursorScale = useTransform(cursorX, () => 1);

  return (
    <motion.div
      animate={
        leaving
          ? { opacity: 0, scale: 1.14, filter: "blur(22px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.78, ease: EASE }}
      className="relative h-[100dvh] w-full overflow-hidden bg-background text-foreground lg:cursor-none"
    >
      {/* fundo cinematográfico */}
      <motion.img
        src={heroImg}
        alt=""
        aria-hidden
        style={{ x: tilt.x * 0.6, y: tilt.y * 0.6 }}
        animate={{ scale: 1 + index * 0.03, opacity: index === 0 ? 0.55 : 0.2 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 size-full scale-110 object-cover"
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      {/* topo */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 lg:px-10 lg:py-6">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-3 rounded-full border border-border-strong bg-background/40 px-3 py-2 backdrop-blur transition-colors hover:bg-secondary"
        >
          <img
            src={logo.url}
            alt="Logotipo Leonardo Lopes"
            width={28}
            height={28}
            className="size-7 rounded-md object-cover"
          />
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Leonardo OS</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => enter("/home")}
            className="hidden items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground sm:inline-flex"
          >
            <SkipForward className="size-3.5" />
            Pular apresentação
          </button>
          <button
            onClick={() => enter("/home")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-background/40 px-3.5 py-2 text-xs font-medium backdrop-blur transition-colors hover:bg-secondary"
          >
            <Home className="size-3.5" />
            Home
          </button>
          <button
            onClick={() => enter("/aluno")}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.04]"
            style={{ boxShadow: "var(--shadow-signal)" }}
          >
            <LogIn className="size-3.5" />
            Entrar
          </button>
        </div>
      </header>

      {/* indicador lateral */}
      <nav
        aria-label="Cenas da apresentação"
        className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {scenes.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className="group flex items-center gap-3"
            aria-current={i === index}
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                i === index ? "w-9 bg-primary" : "w-4 bg-border-strong group-hover:w-6"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* cenas */}
      <main className="relative z-20 h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={scenes[index]!.id}
            initial={{ opacity: 0, y: dir * 46, filter: "blur(14px)", scale: 0.985 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: dir * -46, filter: "blur(14px)", scale: 1.015 }}
            transition={{ duration: 0.72, ease: EASE }}
            className="h-full"
          >
            <SceneContent index={index} tilt={tilt} onEnter={() => enter("/home")} onNext={() => go(index + 1)} />
          </motion.section>
        </AnimatePresence>
      </main>

      {/* base */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 px-5 pb-5 lg:px-10 lg:pb-7">
        <button
          onClick={() => go(index + 1)}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="grid size-8 place-items-center rounded-full border border-border-strong"
          >
            <ArrowDown className="size-3.5" />
          </motion.span>
          Role, deslize ou use as setas
        </button>
        <p className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
        </p>
      </footer>

      {/* barra de progresso */}
      <motion.div
        className="absolute inset-x-0 top-0 z-40 h-px origin-left bg-primary"
        animate={{ scaleX: (index + 1) / scenes.length }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* menu lateral glass */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="absolute inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="glass-panel absolute inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col gap-8 border-r border-border p-7"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">Navegar</p>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="grid size-9 place-items-center rounded-full border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="grid gap-1">
                {scenes.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      go(i);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-secondary ${
                      i === index ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                    <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto grid gap-2">
                {[
                  { label: "Home completa", to: "/home" },
                  { label: "Portal do aluno", to: "/aluno" },
                  { label: "Portal corporativo", to: "/empresas" },
                  { label: "Administração", to: "/admin" },
                ].map((l) => (
                  <button
                    key={l.to}
                    onClick={() => enter(l.to)}
                    className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:bg-secondary"
                  >
                    {l.label}
                    <ArrowUpRight className="size-4 text-primary" />
                  </button>
                ))}
                <div className="mt-2 flex gap-2">
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
                  >
                    <MessageCircle className="size-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs"
                  >
                    <Instagram className="size-3.5" />
                    Instagram
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* cursor interativo */}
      <motion.div
        aria-hidden
        style={{ x: cursorX, y: cursorY, scale: cursorScale }}
        className="pointer-events-none absolute left-0 top-0 z-[60] hidden lg:block"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="size-9 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-[2px]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────── conteúdo ─────────────────────────── */

function SceneContent({
  index,
  tilt,
  onEnter,
  onNext,
}: {
  index: number;
  tilt: { x: number; y: number };
  onEnter: () => void;
  onNext: () => void;
}) {
  const id = scenes[index]!.id;

  if (id === "hero") {
    return (
      <SceneShell eyebrow="Leonardo OS · experiência de marca" parallax={tilt}>
        <h1 className="max-w-4xl text-[2.7rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[5.4rem]">
          <LetterReveal text="Evolução física" />
          <br />
          <span className="signal-text">
            <LetterReveal text="construída com ciência" delay={0.28} />
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Uma apresentação curta antes da plataforma. Sete cenas, um propósito: mostrar como o
          acompanhamento próximo transforma rotina em resultado.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ boxShadow: "var(--shadow-signal)" }}
          >
            <Compass className="size-4" />
            Conhecer Leonardo
          </button>
          <button
            onClick={onEnter}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/40 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
          >
            Explorar a plataforma
            <ArrowRight className="size-4" />
          </button>
        </motion.div>
      </SceneShell>
    );
  }

  if (id === "leonardo") {
    return (
      <SceneShell eyebrow="Cena 02 · quem é Leonardo" parallax={tilt}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ x: tilt.x * 0.25, y: tilt.y * 0.25, transformPerspective: 1000 }}
            className="relative hidden lg:block"
          >
            <img
              src={portraitAsset.url}
              alt="Leonardo Lopes correndo em prova de rua"
              width={753}
              height={1443}
              className="w-full rounded-2xl border border-border object-cover elevated"
            />
          </motion.div>
          <div>
            <h2 className="text-3xl font-semibold leading-[1.05] sm:text-4xl lg:text-[3.4rem]">
              <LetterReveal text="Ciência, escuta e presença real" />
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Educação Física e Gestão Ambiental. Doze anos entre academias, pistas, piscinas e
              trilhas — sempre com a mesma premissa: acolher antes de prescrever.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASE }}
                >
                  <NumberCounter value={s.value} className="font-mono text-2xl sm:text-3xl" />
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SceneShell>
    );
  }

  if (id === "dor") {
    return (
      <SceneShell eyebrow="Cena 03 · o ponto de partida" parallax={tilt}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-[3.4rem]">
          <LetterReveal text="Talvez você reconheça algo aqui" />
        </h2>
        <div className="mt-10 flex flex-wrap gap-2.5">
          {pains.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
              className="rounded-full border border-border bg-surface/50 px-4 py-2.5 text-sm text-muted-foreground backdrop-blur"
            >
              {p}
            </motion.span>
          ))}
        </div>
        <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground">
          Nenhuma dessas frases é um defeito. São pontos de partida — e todos têm um caminho de
          saída construído com método.
        </p>
      </SceneShell>
    );
  }

  if (id === "metodologia") {
    return (
      <SceneShell eyebrow="Cena 04 · metodologia" parallax={tilt}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-[3.2rem]">
          <LetterReveal text="Quatro etapas, zero improviso" />
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m, i) => (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 26, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.12 + i * 0.09, duration: 0.7, ease: EASE }}
            >
              <TiltCard className="h-full">
                <p className="font-mono text-xs text-primary">{m.step}</p>
                <h3 className="mt-4 text-base font-medium">{m.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </SceneShell>
    );
  }

  if (id === "resultados") {
    return (
      <SceneShell eyebrow="Cena 05 · resultados" parallax={tilt}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-[3.2rem]">
              <LetterReveal text="Resultado é consequência de constância" />
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { v: "94%", l: "retenção após 6 meses" },
                { v: "2.100", l: "avaliações realizadas" },
                { v: "480", l: "alunos acompanhados" },
              ].map((k, i) => (
                <motion.div
                  key={k.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
                >
                  <TiltCard>
                    <NumberCounter value={k.v} className="font-mono text-3xl" />
                    <p className="mt-2 text-xs text-muted-foreground">{k.l}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.img
            src={raceAsset.url}
            alt="Leonardo Lopes ao final de uma corrida"
            width={1170}
            height={1613}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ x: tilt.x * -0.3, y: tilt.y * -0.3 }}
            className="hidden max-h-[46vh] w-full rounded-2xl border border-border object-cover elevated lg:block"
          />
        </div>
      </SceneShell>
    );
  }

  if (id === "projetos") {
    return (
      <SceneShell eyebrow="Cena 06 · projetos" parallax={tilt}>
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.06] sm:text-4xl lg:text-[3.2rem]">
          <LetterReveal text="Movimento que alcança pessoas e comunidades" />
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28, rotateY: dirTilt(i) }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.12 + i * 0.1, duration: 0.75, ease: EASE }}
            >
              <TiltCard className="h-full">
                <p className="eyebrow text-primary">{p.kind}</p>
                <h3 className="mt-4 text-lg font-medium">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </SceneShell>
    );
  }

  return (
    <SceneShell eyebrow="Cena 07 · próximo passo" parallax={tilt}>
      <h2 className="max-w-3xl text-[2.4rem] font-semibold leading-[1.02] sm:text-5xl lg:text-[4.4rem]">
        <LetterReveal text="Pronto para entrar" />
        <br />
        <span className="signal-text">
          <LetterReveal text="no Leonardo OS?" delay={0.24} />
        </span>
      </h2>
      <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
        A partir daqui você acessa a plataforma completa: metodologia, resultados, produtos,
        portais e acompanhamento.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <button
          onClick={onEnter}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          style={{ boxShadow: "var(--shadow-signal)" }}
        >
          Entrar na plataforma
          <ArrowRight className="size-4" />
        </button>
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/40 px-7 py-4 text-sm font-medium backdrop-blur transition-colors hover:bg-secondary"
        >
          <MessageCircle className="size-4" />
          Falar pelo WhatsApp
        </a>
      </motion.div>
    </SceneShell>
  );
}

function dirTilt(i: number) {
  return i === 0 ? -10 : i === 2 ? 10 : 0;
}
