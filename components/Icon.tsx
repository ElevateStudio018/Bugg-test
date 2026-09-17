import {
  HardHat,
  Maximize2,
  Hammer,
  ChefHat,
  Bath,
  Layers,
  Shovel,
  Ruler,
  Phone,
  MapPin,
  FileText,
  ChevronDown,
  Menu,
  X,
  User,
  Mail,
  Wrench,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  HardHat,
  Maximize2,
  Hammer,
  ChefHat,
  Bath,
  Layers,
  Shovel,
  Ruler,
  Phone,
  MapPin,
  FileText,
  ChevronDown,
  Menu,
  X,
  User,
  Mail,
  Wrench,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
};

export type IconKey = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const LucideIcon = iconMap[name];
  return <LucideIcon strokeWidth={1.75} {...props} />;
}
