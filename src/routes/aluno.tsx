import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Activity,
  CalendarDays,
  ClipboardList,
  CreditCard,
  Dumbbell,
  Images,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Sparkles,
  User,
  FolderOpen,
  History,
} from "lucide-react";
import { AppShell, type NavItem } from "@/components/app/shell";
import { student } from "@/lib/mock";

const nav: NavItem[] = [
  { label: "Dashboard", to: "/aluno", icon: LayoutDashboard },
  { label: "Minha Evolução", to: "/aluno/evolucao", icon: LineChart },
  { label: "Avatar Evolutivo", to: "/aluno/avatar", icon: Sparkles },
  { label: "Treinos", to: "/aluno/treinos", icon: Dumbbell },
  { label: "Avaliações", to: "/aluno/avaliacoes", icon: ClipboardList },
  { label: "Fotos", to: "/aluno/fotos", icon: Images },
  { label: "Timeline", to: "/aluno/timeline", icon: History },
  { label: "Agenda", to: "/aluno/agenda", icon: CalendarDays },
  { label: "IA Coach", to: "/aluno/coach", icon: Activity },
  { label: "Materiais", to: "/aluno/materiais", icon: FolderOpen },
  { label: "Mensagens", to: "/aluno/mensagens", icon: MessageSquare },
  { label: "Financeiro", to: "/aluno/financeiro", icon: CreditCard },
  { label: "Perfil", to: "/aluno/perfil", icon: User },
];

export const Route = createFileRoute("/aluno")({
  head: () => ({
    meta: [
      { title: "Área do Aluno — Leonardo OS" },
      { name: "description", content: "Dashboard, evolução, treinos e acompanhamento do aluno." },
      { property: "og:title", content: "Área do Aluno — Leonardo OS" },
      { property: "og:description", content: "Sua evolução, seus treinos e seu acompanhamento." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AlunoLayout,
});

function AlunoLayout() {
  return (
    <AppShell workspace="Portal do Aluno" nav={nav} user={{ name: student.name, role: student.plan }}>
      <Outlet />
    </AppShell>
  );
}
