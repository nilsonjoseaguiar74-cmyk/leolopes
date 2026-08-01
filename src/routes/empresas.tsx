import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Target,
  Users,
  Gauge,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/app/shell";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/empresas", icon: LayoutDashboard },
  { label: "Funcionários", to: "/empresas/funcionarios", icon: Users },
  { label: "Projetos", to: "/empresas/projetos", icon: Building2 },
  { label: "Programas", to: "/empresas/programas", icon: Target },
  { label: "Campanhas", to: "/empresas/campanhas", icon: Megaphone },
  { label: "Indicadores", to: "/empresas/indicadores", icon: Gauge },
  { label: "Analytics", to: "/empresas/analytics", icon: BarChart3 },
  { label: "Relatórios", to: "/empresas/relatorios", icon: FileText },
  { label: "Comunicação", to: "/empresas/comunicacao", icon: MessageSquare },
  { label: "Financeiro", to: "/empresas/financeiro", icon: CreditCard },
];

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Portal Corporativo — Leonardo OS" },
      {
        name: "description",
        content: "Programas de qualidade de vida, indicadores e analytics para empresas.",
      },
      { property: "og:title", content: "Portal Corporativo — Leonardo OS" },
      { property: "og:description", content: "Saúde corporativa com indicadores executivos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmpresasLayout,
});

function EmpresasLayout() {
  return (
    <AppShell
      workspace="Portal Corporativo"
      nav={nav}
      user={{ name: "Grupo Norte", role: "Gestor de RH" }}
    >
      <Outlet />
    </AppShell>
  );
}
