import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Eye, EyeOff, GripVertical, Palette, Plus, Trash2, Type } from "lucide-react";

import { PageHeader, Panel } from "@/components/app/shell";
import { cmsSections } from "@/lib/mock";

export const Route = createFileRoute("/admin/cms")({
  component: Cms,
});

type Section = { name: string; type: string; visible: boolean };

function Cms() {
  const [sections, setSections] = useState<Section[]>(cmsSections);
  const [selected, setSelected] = useState(0);

  const toggle = (i: number) =>
    setSections((s) => s.map((x, idx) => (idx === i ? { ...x, visible: !x.visible } : x)));

  const duplicate = (i: number) =>
    setSections((s) => [
      ...s.slice(0, i + 1),
      { ...s[i]!, name: `${s[i]!.name} (cópia)` },
      ...s.slice(i + 1),
    ]);

  const remove = (i: number) => setSections((s) => s.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const copy = [...sections];
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
    setSections(copy);
    setSelected(j);
  };

  const current = sections[selected] ?? sections[0]!;

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Landing CMS"
        title="Editor visual da página"
        lead="Reorganize, oculte, duplique e edite cada seção sem escrever código."
        action={
          <button className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Plus className="size-4" />
            Nova seção
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel title={`Seções (${sections.length})`}>
          <ul className="grid gap-2">
            {sections.map((s, i) => (
              <motion.li
                layout
                key={`${s.name}-${i}`}
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${
                  i === selected ? "border-primary/40 bg-primary/5" : "border-border bg-surface-2/40"
                }`}
              >
                <button
                  onClick={() => setSelected(i)}
                  aria-label={`Selecionar ${s.name}`}
                  className="grid size-7 shrink-0 place-items-center text-muted-foreground"
                >
                  <GripVertical className="size-4" />
                </button>
                <button onClick={() => setSelected(i)} className="min-w-0 text-left">
                  <p className={`truncate text-sm ${s.visible ? "" : "text-muted-foreground line-through"}`}>
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.type}</p>
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <IconBtn label="Mover para cima" onClick={() => move(i, -1)}>
                    ↑
                  </IconBtn>
                  <IconBtn label="Mover para baixo" onClick={() => move(i, 1)}>
                    ↓
                  </IconBtn>
                  <button
                    onClick={() => toggle(i)}
                    aria-label="Alternar visibilidade"
                    className="grid size-7 place-items-center rounded-md text-muted-foreground hover:text-foreground"
                  >
                    {s.visible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => duplicate(i)}
                    aria-label="Duplicar"
                    className="grid size-7 place-items-center rounded-md text-muted-foreground hover:text-foreground"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  <button
                    onClick={() => remove(i)}
                    aria-label="Remover"
                    className="grid size-7 place-items-center rounded-md text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </Panel>

        <div className="grid gap-4">
          <Panel title={`Editando · ${current.name}`}>
            <div className="grid gap-4">
              <Field icon={<Type className="size-3.5" />} label="Título" value="Evolução física construída com ciência" />
              <Field icon={<Type className="size-3.5" />} label="Subtítulo" value="Não quero apenas o seu investimento." />
              <Field icon={<Type className="size-3.5" />} label="Texto do botão" value="Falar pelo WhatsApp" />
              <div className="grid gap-2">
                <span className="eyebrow flex items-center gap-2">
                  <Palette className="size-3.5" /> Fundo da seção
                </span>
                <div className="flex flex-wrap gap-2">
                  {["Carbono", "Grafite", "Vidro", "Sinal", "Transparente"].map((c, i) => (
                    <button
                      key={c}
                      className={`rounded-full border px-4 py-2 text-xs ${
                        i === 0 ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <span className="eyebrow">Animação de entrada</span>
                <div className="flex flex-wrap gap-2">
                  {["Fade + blur", "Slide up", "Escala", "Parallax", "Sem animação"].map((a, i) => (
                    <button
                      key={a}
                      className={`rounded-full border px-4 py-2 text-xs ${
                        i === 0 ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Incorporações">
            <div className="grid gap-2 sm:grid-cols-2">
              {["Instagram Reels", "Instagram Feed", "YouTube", "Vimeo", "Spotify", "Google Maps"].map((e) => (
                <div
                  key={e}
                  className="rounded-xl border border-border bg-surface-2/40 px-4 py-3 text-sm text-muted-foreground"
                >
                  {e}
                </div>
              ))}
            </div>
            <input
              placeholder="Cole uma URL ou iFrame…"
              className="mt-4 w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid size-7 place-items-center rounded-md font-mono text-xs text-muted-foreground hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="eyebrow flex items-center gap-2">
        {icon} {label}
      </span>
      <input
        defaultValue={value}
        className="rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary/60"
      />
    </label>
  );
}
