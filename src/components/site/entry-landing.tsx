import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo-leonardo.jpg.asset.json";

const EASE = [0.16, 1, 0.3, 1] as const;

const menu = [
  { label: "Home", href: "/home" },
  { label: "Sobre", href: "/home#sobre" },
  { label: "Metodologia", href: "/home#metodologia" },
  { label: "Resultados", href: "/home#resultados" },
  { label: "Projetos", href: "/home#projetos" },
  { label: "Blog", href: "/home#blog" },
  { label: "Produtos", href: "/home#produtos" },
  { label: "Contato", href: "/home#contato" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Normalized camera pointer: x/y in [-1, 1], depth in [0, 1]. */
function useCamera(disabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 42, damping: 22, mass: 0.9 });
  const y = useSpring(rawY, { stiffness: 42, damping: 22, mass: 0.9 });
  const active = useMotionValue(0);
  const glowIntensity = useSpring(active, { stiffness: 60, damping: 26 });

  useEffect(() => {
    if (disabled) return;
    let frame = 0;
    const set = (cx: number, cy: number) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(Math.max(-1, Math.min(1, (cx / window.innerWidth) * 2 - 1)));
        rawY.set(Math.max(-1, Math.min(1, (cy / window.innerHeight) * 2 - 1)));
        active.set(1);
      });
    };
    const onMove = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) set(t.clientX, t.clientY);
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      rawX.set(Math.max(-1, Math.min(1, e.gamma / 28)));
      rawY.set(Math.max(-1, Math.min(1, (e.beta - 45) / 34)));
      active.set(1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("deviceorientation", onOrientation);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("deviceorientation", onOrientation);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled, rawX, rawY, active]);

  return { x, y, glowIntensity };
}

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={`${ch}-${ci}`}
              aria-hidden
              className="inline-block will-change-transform"
              initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: delay + wi * 0.055 + ci * 0.018,
                duration: 0.85,
                ease: EASE,
              }}
            >
              {ch}
            </motion.span>
          ))}
          <span aria-hidden>&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/** Minimal wireframe mountain ridge — one depth layer of the scene. */
function Ridge({
  d,
  opacity,
  lineOpacity,
}: {
  d: string;
  opacity: number;
  lineOpacity: number;
}) {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[62%] w-full"
      aria-hidden
    >
      <path d={`${d} L1440,520 L0,520 Z`} fill="var(--background)" opacity={opacity} />
      <path
        d={d}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.1"
        opacity={lineOpacity}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

const RIDGES = [
  { d: "M0,300 L210,182 L330,246 L520,120 L700,252 L880,168 L1080,268 L1250,196 L1440,286", depth: 10, opacity: 0.55, line: 0.1 },
  { d: "M0,352 L180,268 L360,330 L560,222 L760,320 L960,250 L1160,336 L1320,286 L1440,344", depth: 22, opacity: 0.72, line: 0.16 },
  { d: "M0,410 L220,344 L420,404 L620,320 L820,398 L1040,336 L1240,406 L1440,368", depth: 40, opacity: 0.88, line: 0.24 },
  { d: "M0,470 L260,424 L500,472 L760,414 L1020,468 L1260,428 L1440,462", depth: 66, opacity: 1, line: 0.34 },
];

function Particles({ count = 26 }: { count?: number }) {
  const seeds = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: (i * 37) % 100,
      top: (i * 61) % 100,
      size: 1 + ((i * 13) % 3) * 0.6,
      dur: 9 + ((i * 7) % 9),
      delay: (i % 11) * 0.7,
    })),
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {seeds.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/50"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ y: [0, -34, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** Abstract wireframe human silhouette that lights up with the camera. */
function MeshFigure({ energy }: { energy: number }) {
  const nodes = [
    [50, 6], [50, 20], [34, 30], [66, 30], [24, 46], [76, 46],
    [50, 44], [40, 60], [60, 60], [36, 80], [64, 80], [32, 96], [68, 96],
  ] as const;
  const edges = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [1, 6], [6, 7], [6, 8],
    [7, 9], [8, 10], [9, 11], [10, 12], [7, 8], [2, 3],
  ] as const;

  return (
    <svg viewBox="0 0 100 104" className="h-full w-full" aria-hidden>
      <g stroke="var(--primary)" strokeLinecap="round">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            strokeWidth={0.7}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 + energy * 0.55 }}
            transition={{ duration: 1.4, delay: 0.35 + i * 0.05, ease: EASE }}
          />
        ))}
      </g>
      <g fill="var(--primary)">
        {nodes.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={0.9}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4 + energy * 0.6, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.6 + i * 0.04, ease: EASE }}
          />
        ))}
      </g>
    </svg>
  );
}

export function EntryLanding() {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [energy, setEnergy] = useState(0.15);
  const { x, y, glowIntensity } = useCamera(reduced || leaving);

  useEffect(() => {
    const unsub = glowIntensity.on("change", (v) => setEnergy(0.15 + v * 0.85));
    return unsub;
  }, [glowIntensity]);

  // Camera transforms
  const rotY = useTransform(x, [-1, 1], [5.5, -5.5]);
  const rotX = useTransform(y, [-1, 1], [-3.5, 3.5]);
  const zoom = useTransform(y, [-1, 1], [1.06, 0.99]);
  const glowX = useTransform(x, [-1, 1], ["18%", "82%"]);
  const glowY = useTransform(y, [-1, 1], ["24%", "72%"]);

  const start = useCallback(
    (immediate?: boolean) => {
      if (leaving) return;
      setLeaving(true);
      window.setTimeout(() => navigate({ to: "/home" }), immediate ? 240 : 1150);
    },
    [leaving, navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <motion.main
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      animate={
        leaving
          ? { opacity: 0, scale: 1.28, filter: "blur(22px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 1.1, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      <h1 className="sr-only">Leonardo Lopes — Leonardo OS: a jornada começa</h1>

      {/* ---------- Scene (depth layers) ---------- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{ rotateY: rotY, rotateX: rotX, scale: zoom, transformStyle: "preserve-3d" }}
      >
        {/* atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_65%)]" />

        {/* dynamic light following the cursor */}
        <motion.div
          className="absolute -inset-1/4 opacity-70 blur-3xl"
          style={{
            left: glowX,
            top: glowY,
            width: "48vmax",
            height: "48vmax",
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 24%, transparent), transparent 68%)",
          }}
        />

        {/* light rays */}
        <div className="absolute inset-x-0 top-0 h-[70%] opacity-[0.14] [mask-image:linear-gradient(to_bottom,black,transparent)] bg-[repeating-linear-gradient(102deg,color-mix(in_oklab,var(--primary)_60%,transparent)_0px,transparent_3px,transparent_42px)]" />

        {/* mountains */}
        {RIDGES.map((r, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 will-change-transform"
            style={{
              x: useTransform(x, [-1, 1], [r.depth, -r.depth]),
              y: useTransform(y, [-1, 1], [r.depth * 0.28, -r.depth * 0.28]),
              filter: `blur(${(RIDGES.length - 1 - i) * 1.6}px)`,
            }}
          >
            <Ridge d={r.d} opacity={r.opacity} lineOpacity={r.line} />
          </motion.div>
        ))}

        {/* volumetric fog */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,var(--background),transparent)]" />
        <motion.div
          className="absolute inset-x-0 bottom-[22%] h-40 opacity-40 blur-2xl"
          style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--primary) 12%, transparent), transparent)" }}
          animate={reduced ? undefined : { x: [-40, 40, -40] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduced && <Particles />}

        {/* subtle noise */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
          <filter id="entry-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#entry-noise)" />
        </svg>
      </motion.div>

      {/* ---------- Wireframe figure ---------- */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[24%] left-1/2 h-[26vh] max-h-72 min-h-40 -translate-x-1/2 will-change-transform"
        style={{
          x: useTransform(x, [-1, 1], [-14, 14]),
          y: useTransform(y, [-1, 1], [8, -8]),
          filter: `drop-shadow(0 0 ${8 + energy * 22}px color-mix(in oklab, var(--primary) 45%, transparent))`,
        }}
      >
        <div className="aspect-[100/104] h-full">
          <MeshFigure energy={energy} />
        </div>
      </motion.div>

      {/* ---------- Brand mark ---------- */}
      <motion.div
        className="absolute left-5 top-5 z-20 flex items-center gap-3 sm:left-8 sm:top-7"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <img
          src={logo.url}
          alt="Logotipo Leonardo Lopes"
          width={36}
          height={36}
          className="size-9 rounded-lg object-cover"
        />
        <span className="eyebrow text-[10px]">Leonardo OS</span>
      </motion.div>

      {/* ---------- Glass menu ---------- */}
      <div className="absolute right-5 top-5 z-30 sm:right-8 sm:top-7">
        <motion.button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="glass-panel grid size-11 place-items-center rounded-full transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="glass-panel absolute right-0 mt-3 w-56 overflow-hidden p-2"
            >
              {menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.label}
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Copy + actions ---------- */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="max-w-[19ch] text-balance text-[2rem] font-semibold leading-[1.06] tracking-tight sm:max-w-[24ch] sm:text-5xl lg:text-6xl"
          initial={{ opacity: 1 }}
        >
          <LetterReveal text="Seu próximo nível começa com" delay={0.25} />
          <span className="signal-text">
            <LetterReveal text="um movimento." delay={0.75} />
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.8, ease: EASE }}
          className="mt-7 space-y-1"
        >
          <p className="text-sm font-medium tracking-tight">Leonardo Lopes</p>
          <p className="eyebrow text-[10px]">Personal Trainer</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => start()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
            style={{ boxShadow: "var(--shadow-signal)" }}
          >
            Iniciar jornada
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => start(true)}
            className="rounded-full px-6 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Pular
          </button>
        </motion.div>
      </div>

      {/* ---------- Footer credit ---------- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute inset-x-0 bottom-4 z-20 text-center text-[10px] tracking-[0.18em] text-muted-foreground uppercase"
      >
        DEVs: Rodrigo - Rafaela - Vitor
      </motion.p>

      {/* ---------- Light expansion on exit ---------- */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-40 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 65%, transparent), transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 22, opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
