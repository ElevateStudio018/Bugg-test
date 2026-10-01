export interface FaktaRow {
  label: string;
  value: string;
}

export function FaktaBox({ title, rows }: { title: string; rows: FaktaRow[] }) {
  return (
    <div className="bg-moss px-6 py-7 text-white sm:px-8 sm:py-8">
      <h3 className="text-[24px] font-semibold leading-tight">{title}</h3>
      <dl className="mt-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 border-b border-white/70 py-4 text-[17px] leading-snug last:border-b-0 last:pb-0"
          >
            <dt className="font-bold">{row.label}:</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
