import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Bell, Menu, Search, X } from "lucide-react";
import { useState, type ComponentType } from "react";
import logo from "@/assets/logo-leonardo.jpg.asset.json";

export type NavItem = { label: string; to: string; icon: ComponentType<{ className?: string }> };

export function AppShell({
  workspace,
  nav,
  user,
  children,
}: {
  workspace: string;
  nav: NavItem[];
  user: { name: string; role: string };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[268px_minmax(0,1fr)]">
      {/* Sidebar — desktop */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <SidebarBody workspace={workspace} nav={nav} user={user} pathname={pathname} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir navegação"
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
            >
              <Menu className="size-4" />
            </button>
            <div className="hidden min-w-0 items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-2 sm:flex sm:w-80">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                placeholder="Buscar…"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>
            <p className="truncate text-sm font-medium sm:hidden">{workspace}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              aria-label="Notificações"
              className="relative grid size-9 place-items-center rounded-lg border border-border"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </button>
            <div className="grid size-9 place-items-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 py-6 pb-24 lg:px-8 lg:py-10 lg:pb-16"
        >
          {children}
        </motion.main>

        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground lg:px-8">
          DEVs: Rodrigo - Rafaela - Vitor
        </footer>
      </div>

      {/* Drawer — mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="relative flex h-full w-[280px] flex-col border-r border-sidebar-border bg-sidebar"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg border border-border"
            >
              <X className="size-4" />
            </button>
            <SidebarBody
              workspace={workspace}
              nav={nav}
              user={user}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </motion.aside>
        </div>
      )}
    </div>
  );
}

function SidebarBody({
  workspace,
  nav,
  user,
  pathname,
  onNavigate,
}: {
  workspace: string;
  nav: NavItem[];
  user: { name: string; role: string };
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex items-center gap-3 px-5 py-5">
        <img
          src={logo.url}
          alt="Logotipo Leonardo Lopes"
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Leonardo OS</p>
          <p className="eyebrow truncate text-[10px]">{workspace}</p>
        </div>
      </div>

      <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4">
        <ul className="grid gap-0.5">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`nav-${workspace}`}
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary"
                    />
                  )}
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-xs font-semibold text-primary">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
        <Link
          to="/"
          className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Voltar ao site
        </Link>
      </div>
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {lead && <p className="mt-2 max-w-xl text-sm text-muted-foreground">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="surface-panel p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 font-mono text-2xl font-medium">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </motion.div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`surface-panel ${className}`}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
        <h2 className="truncate text-sm font-medium">{title}</h2>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function ShellOutlet() {
  return <Outlet />;
}
