import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brödsmulor">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[16px] text-ash">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-3">
            {index > 0 && <span aria-hidden="true">-</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-olive">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-coal">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
