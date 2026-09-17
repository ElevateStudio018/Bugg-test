import Link from "next/link";
import { PlaceholderArt } from "./PlaceholderArt";
import { company } from "@/lib/content";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/tjanster/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-dark/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-dark/30"
    >
      <PlaceholderArt icon={service.icon} tag={false} alt={`${service.name} i ${company.city}`} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 text-dark">{service.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-body">{service.shortDescription}</p>
      </div>
    </Link>
  );
}
