import {
  BadgeCheck,
  HardHat,
  Layers,
  Shovel,
  Droplets,
  Waves,
  Route,
  LayoutGrid,
  Home,
  Phone,
  MapPin,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Wrench,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ExternalLink,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  BadgeCheck,
  HardHat,
  Layers,
  Shovel,
  Droplets,
  Waves,
  Route,
  LayoutGrid,
  Home,
  Phone,
  MapPin,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Wrench,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ExternalLink,
};

export type IconKey = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const LucideIcon = iconMap[name];
  return <LucideIcon strokeWidth={1.75} {...props} />;
}
