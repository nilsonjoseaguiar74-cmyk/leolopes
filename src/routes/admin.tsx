import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  FolderOpen,
  Images,
  KanbanSquare,
  LayoutDashboard,
  LayoutTemplate,
  Package,
  Settings,
  Sparkles,
  Target,
  UserPlus,
  Users,
  History,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/app/shell";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "CRM", to: "/admin/crm", icon: KanbanSquare },
  { label: "Leads", to: "/admin/leads", icon: UserPlus },
  { label: "Alunos", to: "/admin/alunos", icon: Users },
  { label: "Empresas", to: "/admin/empresas", icon: Building2 },
  { label: "Treinos", to: "/admin/treinos", icon: ClipboardList },
  { label: "Avaliações", to: "/admin/avaliacoes", icon: FileText },
  { label: "Anamneses", to: "/admin/anamneses", icon: BookOpen },
  { label: "Avatar Evolutivo", to: "/admin/avatar", icon: Sparkles },
  { label: "Editor de Objetivos", to: "/admin/objetivos", icon: Target },
  { label: "Timeline", to: "/admin/timeline", icon: History },
  { label: "Landing CMS", to: "/admin/cms", icon: LayoutTemplate },
  { label: "Biblioteca", to: "/admin/biblioteca", icon: Images },
  { label: "Blog", to: "/admin/blog", icon: FolderOpen },
  { label: "Produtos", to: "/admin/produtos", icon: Package },
  { label: "Financeiro", to: "/admin/financeiro", icon: CreditCard },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Configurações", to: "/admin/configuracoes", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel Administrativo — Leonardo OS" },
      { name: "description", content: "CRM, CMS, alunos, avaliações e analytics do Leonardo OS." },
      { property: "og:title", content: "Painel Administrativo — Leonardo OS" },
      { property: "og:description", content: "Operação completa da plataforma." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AppShell
      workspace="Administração"
      nav={nav}
      user={{ name: "Leonardo Lopes", role: "Administrador" }}
    >
      <Outlet />
    </AppShell>
  );
}
