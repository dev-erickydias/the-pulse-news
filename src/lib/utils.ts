import { formatDistanceToNow, format } from "date-fns";
import { enUS } from "date-fns/locale";

export function timeAgo(date: string): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: enUS,
  });
}

export function formatDate(date: string): string {
  return format(new Date(date), "MMM dd, yyyy", { locale: enUS });
}

export function formatDateLong(date: string): string {
  return format(new Date(date), "MMMM dd, yyyy 'at' HH:mm", {
    locale: enUS,
  });
}

export function getReadingTime(content: string | null): number {
  if (!content) return 2;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    general: "bg-slate/90",
    business: "bg-emerald-700/90",
    technology: "bg-blue-700/90",
    science: "bg-purple-700/90",
    health: "bg-rose-700/90",
    sports: "bg-amber-700/90",
    entertainment: "bg-pink-700/90",
  };
  return colors[category] || "bg-slate/90";
}
