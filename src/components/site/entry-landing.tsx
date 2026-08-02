import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoGlow from "@/assets/logo-leonardo-shield-light.png.asset.json";

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
      <path
        d="M0,520 L240,452 L470,516 L720,404 L980,502 L1210,446 L1440,504"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.2"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

/** Drifting trail dust. */
function Dust({ count = 22 }: { count?: number }) {
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

/** Ascent trail: a drawn route with a light travelling along it. */
function AscentTrail({ x, reduced }: { x: MotionValue<number>; reduced: boolean }) {
  const tx = useTransform(x, [-1, 1], [34, -34]);
  const path =
    "M-40,600 C220,560 320,470 470,486 C620,502 640,404 800,382 C930,364 1010,300 1160,282 C1300,266 1380,236 1480,214";
  return (
    <motion.svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[74%] w-full will-change-transform"
      aria-hidden
      style={{ x: tx }}
    >
      <motion.path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.6"
        strokeDasharray="6 9"
        opacity={0.55}
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 0.5, ease: EASE }}
      />
      {!reduced && (
        <>
          <circle r="4" fill="var(--primary)">
            <animateMotion dur="9s" repeatCount="indefinite" path={path} />
          </circle>
          <circle r="12" fill="var(--primary)" opacity="0.18">
            <animateMotion dur="9s" repeatCount="indefinite" path={path} />
          </circle>
        </>
      )}
    </motion.svg>
  );
}

/** Soft light ring that trails the pointer. */
function CursorHalo() {
  const px = useMotionValue(-500);
  const py = useMotionValue(-500);
  const sx = useSpring(px, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX);
      py.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30 hidden size-24 rounded-full border border-primary/25 md:block"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
      }}
    />
  );
}

/** Small altitude/telemetry readout in the scene corners. */
function Telemetry({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 1, ease: EASE }}
      className={`absolute z-20 hidden sm:block ${className}`}
    >
      <p className="text-[9px] tracking-[0.28em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-mono text-xs text-foreground/70">{value}</p>
    </motion.div>
  );
}

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
        />

        {/* topographic contours */}
        {Array.from({ length: 9 }, (_, i) => (
          <Contour key={i} index={i} total={9} x={x} y={y} reduced={reduced} />
        ))}

        <AscentTrail x={x} reduced={reduced} />

        <Ridge x={x} y={y} />

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

      {!reduced && !leaving && <CursorHalo />}

      <Telemetry label="Altitude" value="1 340 m" className="left-6 top-6" />
      <Telemetry label="Cadência" value="182 spm" className="right-6 top-6" />
      <Telemetry label="Ciclo" value="Base · Semana 01" className="left-6 bottom-12" />
      <Telemetry label="Protocolo" value="Leonardo OS v1.0" className="right-6 bottom-12" />

      {/* ---------- Logo + copy + single CTA ---------- */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 18%, transparent), transparent 68%)",
            }}
            animate={reduced ? { opacity: 0.5 } : { opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="will-change-transform"
            style={{ x: logoX, y: logoY }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(18px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.1, ease: EASE }}
          >
            <motion.img
              src={logoGlow.url}
              alt="Logotipo Leonardo Lopes"
              width={1200}
              height={1119}
              className="w-[72vw] max-w-[460px] select-none sm:w-[42vw]"
              animate={reduced ? { y: 0 } : { y: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>




        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.5, duration: 1.1, ease: EASE }}
          className="mt-2 max-w-[22ch] text-balance text-lg font-medium tracking-tight text-foreground/90 sm:text-2xl"
        >
          O próximo passo começa aqui.
        </motion.p>

        <motion.button
          type="button"
          onClick={enter}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9, ease: EASE }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-secondary/40 px-8 py-3.5 text-sm font-semibold tracking-tight backdrop-blur-md transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Entrar
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>

      {/* ---------- Footer credit ---------- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.9 }}
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
