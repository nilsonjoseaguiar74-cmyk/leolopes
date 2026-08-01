import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mountain } from "lucide-react";
import logoGlow from "@/assets/logo-leonardo-mark.png.asset.json";

const EASE = [0.16, 1, 0.3, 1] as const;

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

/** Normalized pointer/gyro camera: x/y in [-1, 1]. */
function useCamera(disabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 38, damping: 24, mass: 1 });
  const y = useSpring(rawY, { stiffness: 38, damping: 24, mass: 1 });

  useEffect(() => {
    if (disabled) return;
    let frame = 0;
    const set = (cx: number, cy: number) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(Math.max(-1, Math.min(1, (cx / window.innerWidth) * 2 - 1)));
        rawY.set(Math.max(-1, Math.min(1, (cy / window.innerHeight) * 2 - 1)));
      });
    };
    const onMove = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) set(t.clientX, t.clientY);
    };
    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      rawX.set(Math.max(-1, Math.min(1, e.gamma / 26)));
      rawY.set(Math.max(-1, Math.min(1, (e.beta - 45) / 32)));
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
  }, [disabled, rawX, rawY]);

  return { x, y };
}

/* ---------------- Micro components ---------------- */

/** Per-letter reveal used for the wordmark / nomenclature. */
function LetterReveal({
  text,
  className,
  delay = 0,
  step = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: 22, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * step, duration: 0.9, ease: EASE }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

function NumberCounter({
  to,
  suffix = "",
  delay = 0,
  reduced,
}: {
  to: number;
  suffix?: string;
  delay?: number;
  reduced: boolean;
}) {
  const [value, setValue] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, delay, reduced]);
  return (
    <span className="font-mono tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ---------------- Topographic terrain ---------------- */

/** One contour line of the relief map, drawn with a self-tracing stroke. */
function Contour({
  index,
  total,
  x,
  y,
  reduced,
}: {
  index: number;
  total: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  reduced: boolean;
}) {
  const t = index / (total - 1);
  const depth = 8 + t * 54;
  const baseY = 150 + t * 300;
  const amp = 92 - t * 44;

  const d = (() => {
    const pts: string[] = [];
    const steps = 12;
    for (let i = 0; i <= steps; i++) {
      const px = (i / steps) * 1440;
      const wave =
        Math.sin(i * 0.72 + index * 0.55) * amp * 0.5 +
        Math.sin(i * 1.53 + index * 1.2) * amp * 0.22 +
        Math.cos(i * 0.34 - index * 0.4) * amp * 0.18;
      pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(0)},${(baseY - wave).toFixed(0)}`);
    }
    return pts.join(" ");
  })();

  const tx = useTransform(x, [-1, 1], [depth, -depth]);
  const ty = useTransform(y, [-1, 1], [depth * 0.3, -depth * 0.3]);

  return (
    <motion.svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[74%] w-full will-change-transform"
      aria-hidden
      style={{ x: tx, y: ty, filter: `blur(${(1 - t) * 2.2}px)` }}
      animate={
        reduced
          ? undefined
          : { translateZ: 0, scaleY: [1, 1.03 + t * 0.02, 1], opacity: [0.9, 1, 0.9] }
      }
      transition={{ duration: 9 + index * 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={0.9 + t * 0.7}
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.1 + t * 0.3 }}
        transition={{ duration: 2.2, delay: 0.2 + index * 0.07, ease: EASE }}
      />
    </motion.svg>
  );
}

/** Silhouetted ridge that anchors the horizon. */
function Ridge({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const tx = useTransform(x, [-1, 1], [70, -70]);
  const ty = useTransform(y, [-1, 1], [20, -20]);
  return (
    <motion.svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[74%] w-full will-change-transform"
      aria-hidden
      style={{ x: tx, y: ty }}
    >
      <path
        d="M0,520 L240,452 L470,516 L720,404 L980,502 L1210,446 L1440,504 L1440,620 L0,620 Z"
        fill="var(--background)"
      />
      <motion.path
        d="M0,520 L240,452 L470,516 L720,404 L980,502 L1210,446 L1440,504"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 2.6, delay: 0.4, ease: EASE }}
      />
    </motion.svg>
  );
}

/** Animated trail: a dashed route climbing to the summit with a moving hiker dot. */
function TrailPath({ reduced }: { reduced: boolean }) {
  const d = "M40,600 C260,560 300,470 470,470 C620,470 640,410 720,404";
  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[74%] w-full"
      aria-hidden
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.4"
        strokeDasharray="6 10"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.55 }}
        transition={{ duration: 3, delay: 1, ease: EASE }}
      />
      {!reduced && (
        <motion.circle
          r="4"
          fill="var(--primary)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 7, delay: 2, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
        >
          <animateMotion dur="7s" begin="2s" repeatCount="indefinite" path={d} />
        </motion.circle>
      )}
    </svg>
  );
}

/** Drifting trail dust. */
function Dust({ count = 28 }: { count?: number }) {
  const seeds = useRef(
    Array.from({ length: count }, (_, i) => ({
      left: (i * 41) % 100,
      top: 20 + ((i * 57) % 70),
      size: 1 + ((i * 13) % 3) * 0.7,
      dur: 11 + ((i * 7) % 10),
      delay: (i % 9) * 0.8,
      drift: 20 + ((i * 17) % 40),
    })),
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {seeds.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/45"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ x: [0, s.drift, 0], y: [0, -40, 0], opacity: [0, 0.65, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const STATS = [
  { value: 12, suffix: "+", label: "anos de estrada" },
  { value: 480, suffix: "", label: "alunos guiados" },
  { value: 97, suffix: "%", label: "aderência ao plano" },
];

export function EntryLanding() {
  const navigate = useNavigate();
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const { x, y } = useCamera(reduced || leaving);

  const rotY = useTransform(x, [-1, 1], [4.5, -4.5]);
  const rotX = useTransform(y, [-1, 1], [-3, 3]);
  const scene = useTransform(y, [-1, 1], [1.05, 1]);
  const glowX = useTransform(x, [-1, 1], ["24%", "76%"]);
  const glowY = useTransform(y, [-1, 1], ["22%", "68%"]);
  const logoX = useTransform(x, [-1, 1], [-10, 10]);
  const logoY = useTransform(y, [-1, 1], [6, -6]);

  const enter = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => navigate({ to: "/home" }), 900);
  }, [leaving, navigate]);

  return (
    <motion.main
      className="relative h-[100svh] w-full overflow-hidden bg-background"
      animate={
        leaving
          ? { opacity: 0, scale: 1.22, filter: "blur(20px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.9, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      <h1 className="sr-only">Leonardo Lopes — o próximo passo começa aqui</h1>

      {/* ---------- Living terrain ---------- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{ rotateY: rotY, rotateX: rotX, scale: scene, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_115%,color-mix(in_oklab,var(--primary)_11%,transparent),transparent_62%)]" />

        {/* altitude light following the cursor */}
        <motion.div
          className="absolute opacity-70 blur-3xl"
          style={{
            left: glowX,
            top: glowY,
            width: "52vmax",
            height: "52vmax",
            x: "-50%",
            y: "-50%",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 66%)",
          }}
          animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* aurora / wind streak */}
        {!reduced && (
          <motion.div
            className="absolute inset-x-[-30%] top-[8%] h-40 opacity-30 blur-3xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 26%, transparent), transparent)",
            }}
            animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.14, 0.34, 0.14] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* topographic contours */}
        {Array.from({ length: 9 }, (_, i) => (
          <Contour key={i} index={i} total={9} x={x} y={y} reduced={reduced} />
        ))}

        <Ridge x={x} y={y} />
        <TrailPath reduced={reduced} />

        {/* mist */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,var(--background)_18%,transparent)]" />
        <motion.div
          className="absolute inset-x-0 bottom-[18%] h-44 opacity-45 blur-2xl"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
          }}
          animate={reduced ? { x: 0 } : { x: [-50, 50, -50] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {!reduced && <Dust />}

        <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
          <filter id="entry-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
          </filter>
          <rect width="100%" height="100%" filter="url(#entry-grain)" />
        </svg>
      </motion.div>

      {/* ---------- Brand nomenclature (top bar) ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: EASE }}
        className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10"
      >
        <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          <Mountain className="size-3.5 text-primary" />
          Leonardo&nbsp;OS
        </div>
        <motion.button
          type="button"
          onClick={enter}
          whileHover={{ x: 3 }}
          className="text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          Pular
        </motion.button>
      </motion.div>

      {/* ---------- Logo + nomenclature + copy + single CTA ---------- */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="will-change-transform"
          style={{ x: logoX, y: logoY }}
          initial={{ opacity: 0, scale: 0.88, filter: "blur(22px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, ease: EASE }}
        >
          <motion.img
            src={logoGlow.url}
            alt="Logotipo Leonardo Lopes"
            width={880}
            height={660}
            className="w-[80vw] max-w-[520px] select-none sm:w-[50vw]"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <LetterReveal
          text="LEONARDO LOPES"
          delay={1.1}
          className="mt-1 text-[clamp(1rem,4.4vw,1.75rem)] font-semibold tracking-[0.34em] text-foreground"
        />

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.8, duration: 1.1, ease: EASE }}
          className="mt-4 h-px w-40 origin-center bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2, duration: 1, ease: EASE }}
          className="mt-3 text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          Personal Trainer · Trail &amp; Performance
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.3, duration: 1.1, ease: EASE }}
          className="mt-6 max-w-[22ch] text-balance text-lg font-medium tracking-tight text-foreground/90 sm:text-2xl"
        >
          O próximo passo começa aqui.
        </motion.p>

        <motion.button
          type="button"
          onClick={enter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.9, ease: EASE }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-9 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-secondary/40 px-8 py-3.5 text-sm font-semibold tracking-tight backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border border-primary/50"
              animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          Entrar
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* animated stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 3.1 + i * 0.15, duration: 0.9, ease: EASE }}
              className="text-center"
            >
              <div className="text-base font-semibold text-primary sm:text-lg">
                <NumberCounter to={s.value} suffix={s.suffix} delay={3.2 + i * 0.15} reduced={reduced} />
              </div>
              <div className="mt-1 text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- Footer credit ---------- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.9 }}
        className="absolute inset-x-0 bottom-4 z-20 text-center text-[10px] tracking-[0.18em] text-muted-foreground uppercase"
      >
        DEVs: Rodrigo - Rafaela - Vitor
      </motion.p>

      {/* ---------- Dissolve on exit ---------- */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-40 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 60%, transparent), transparent 70%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 20, opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.9, ease: EASE }}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}
