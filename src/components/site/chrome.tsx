import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-leonardo.jpg.asset.json";
import { contact } from "@/lib/mock";

const nav = [
  { label: "Sobre", href: "/home#sobre" },
  { label: "Metodologia", href: "/home#metodologia" },
  { label: "Resultados", href: "/home#resultados" },
  { label: "Projetos", href: "/home#projetos" },
  { label: "Produtos", href: "/home#produtos" },
  { label: "Blog", href: "/home#blog" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["oklch(0.16 0.008 150 / 0)", "oklch(0.16 0.008 150 / 0.82)"]);
  const border = useTransform(scrollY, [0, 120], ["oklch(1 0 0 / 0)", "oklch(1 0 0 / 0.09)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:px-8">
        <Link to="/home" className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Logotipo Leonardo Lopes"
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-tight">Leonardo Lopes</span>
            <span className="eyebrow block text-[10px]">Leonardo OS</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            to="/aluno"
            className="ml-2 hidden rounded-full border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-flex"
          >
            Área do aluno
          </Link>
          <a
            href="#contato"
            className="ml-1 hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Começar
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background/95 px-5 py-4 lg:hidden"
        >
          <div className="grid gap-1">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link
                to="/aluno"
                className="rounded-full border border-border-strong px-4 py-2.5 text-center text-sm"
              >
                Área do aluno
              </Link>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
              >
                Começar
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo.url}
                alt="Logotipo Leonardo Lopes"
                width={44}
                height={44}
                loading="lazy"
                className="size-11 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-semibold">Leonardo Lopes</p>
                <p className="eyebrow text-[10px]">CREF 000000-G/MG</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Educador físico e gestor ambiental. Evolução sustentável, ciência aplicada e
              acompanhamento humano.
            </p>
          </div>

          <FooterCol
            title="Plataforma"
            links={[
              { label: "Área do aluno", to: "/aluno" },
              { label: "Portal corporativo", to: "/empresas" },
              { label: "Administração", to: "/admin" },
            ]}
          />
          <FooterCol
            title="Conteúdo"
            links={[
              { label: "Blog", href: "/home#blog" },
              { label: "Projetos", href: "/home#projetos" },
              { label: "Produtos", href: "/home#produtos" },
            ]}
          />
          <FooterCol
            title="Contato"
            links={[
              { label: contact.whatsappLabel, href: contact.whatsappUrl, external: true },
              { label: `Instagram ${contact.instagramHandle}`, href: contact.instagramUrl, external: true },
              { label: contact.city, href: "/home#contato" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Leonardo Lopes. Todos os direitos reservados.</p>
          <p className="font-mono">Leonardo OS v1.0 · protótipo navegável</p>
          <p>DEVs: Rodrigo - Rafaela - Vitor</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href?: string; to?: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.to ? (
              <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </Link>
            ) : (
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
