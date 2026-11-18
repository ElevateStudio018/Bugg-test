"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BriefcaseBusiness, Check, Mail, Phone, RotateCcw, Trash2 } from "lucide-react";
import { AdminButton } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Dialog } from "../ui/Dialog";
import { EmptyState } from "../ui/EmptyState";
import { Skeleton } from "../ui/Skeleton";
import { useToast } from "../ui/Toast";
import { useAdminData } from "@/contexts/admin/AdminDataContext";
import { errorMessage } from "@/lib/admin/supabase";
import { formatRelative } from "@/lib/admin/dates";
import { deleteApplication, listApplications, setApplicationStatus, type Application, type ApplicationFilter } from "@/lib/admin/applications";

const filters: { id: ApplicationFilter; label: string }[] = [
  { id: "open", label: "Att hantera" },
  { id: "done", label: "Hanterade" },
  { id: "all", label: "Alla" },
];
const PAGE = 30;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

const contactLink =
  "inline-flex min-h-10 items-center gap-2 rounded-xl bg-stone-50 px-3 text-[14px] font-semibold text-admin-ink ring-1 ring-inset ring-admin-line transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin";

function ApplicationCard({
  application,
  fresh,
  onStatus,
  onDelete,
}: {
  application: Application;
  fresh: boolean;
  onStatus: (status: Application["status"]) => void;
  onDelete: () => void;
}) {
  const done = application.status === "done";
  return (
    <article
      aria-labelledby={`application-${application.id}`}
      className={`rounded-2xl bg-white p-5 ring-1 transition sm:p-6 ${fresh ? "ring-admin/40" : "ring-admin-line"}`}
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${done ? "bg-stone-100 text-stone-500" : "bg-admin/10 text-admin"}`}
        >
          {initials(application.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span id={`application-${application.id}`} className="break-words text-[16px] font-semibold text-admin-ink">
              {application.name}
            </span>
            {fresh && <Badge tone="prime">Ny</Badge>}
            {done && (
              <Badge tone="success">
                <Check aria-hidden="true" className="h-3.5 w-3.5" /> Hanterad
              </Badge>
            )}
          </p>
          <p className="mt-0.5 text-[13px] text-admin-muted">{formatRelative(application.created_at)}</p>
        </div>
      </header>

      {(application.phone || application.email) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {application.phone && (
            <a href={`tel:${application.phone.replace(/[^\d+]/g, "")}`} className={contactLink}>
              <Phone aria-hidden="true" className="h-4 w-4 text-admin" /> {application.phone}
            </a>
          )}
          {application.email && (
            <a
              href={`mailto:${application.email}?subject=${encodeURIComponent("Din intresseanmälan till Markmontage")}`}
              className={`${contactLink} break-all`}
            >
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-admin" /> {application.email}
            </a>
          )}
        </div>
      )}

      {application.experience && (
        <p className="mt-4 text-[14px] text-admin-muted">
          Vill jobba med: <span className={`font-semibold ${done ? "text-admin-muted" : "text-admin-ink"}`}>{application.experience}</span>
        </p>
      )}
      <p className={`mt-3 whitespace-pre-wrap break-words text-[15px] leading-relaxed ${done ? "text-admin-muted" : "text-admin-ink"}`}>
        {application.message}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-admin-line pt-4">
        {done ? (
          <AdminButton size="sm" icon={RotateCcw} onClick={() => onStatus("read")}>
            Flytta tillbaka
          </AdminButton>
        ) : (
          <AdminButton size="sm" icon={Check} onClick={() => onStatus("done")}>
            Markera som hanterad
          </AdminButton>
        )}
        <AdminButton size="sm" variant="ghost" icon={Trash2} onClick={onDelete} className="text-red-700 hover:bg-red-50">
          Ta bort
        </AdminButton>
      </div>
    </article>
  );
}

/** Intresseanmälningar: who would like to work at the company, newest first; mark them as handled or remove them. */
export function ApplicationsTab() {
  const toast = useToast();
  const { newApplications, refreshApplications } = useAdminData();
  const [filter, setFilter] = useState<ApplicationFilter>("open");
  const [rows, setRows] = useState<Application[] | null>(null);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(PAGE);
  const [fresh, setFresh] = useState<Set<string>>(() => new Set());
  const [removing, setRemoving] = useState<Application | null>(null);
  const requestId = useRef(0);

  const load = useCallback(async () => {
    const id = ++requestId.current;
    try {
      const result = await listApplications(filter, limit);
      if (id !== requestId.current) return;
      // Seen now: still marked "Ny" on this visit, but no longer counted as new.
      const unseen = result.rows.filter((row) => row.status === "new").map((row) => row.id);
      setRows(result.rows.map((row) => (row.status === "new" ? { ...row, status: "read" } : row)));
      setTotal(result.total);
      if (unseen.length > 0) {
        setFresh((current) => new Set([...current, ...unseen]));
        await setApplicationStatus(unseen, "read");
        void refreshApplications();
      }
    } catch (error) {
      if (id !== requestId.current) return;
      toast.error(errorMessage(error, "Anmälningarna kunde inte hämtas."));
      setRows((current) => current ?? []);
    }
  }, [filter, limit, refreshApplications, toast]);

  useEffect(() => {
    void load();
    // A new application arriving (the counter goes up) shows at once.
  }, [load, newApplications]);

  async function changeStatus(application: Application, status: Application["status"], undoable = true) {
    const previous = application.status;
    const leaves = (filter === "open" && status === "done") || (filter === "done" && status !== "done");
    setRows(
      (current) =>
        (leaves
          ? current?.filter((row) => row.id !== application.id)
          : current?.map((row) => (row.id === application.id ? { ...row, status } : row))) ?? null,
    );
    if (leaves) setTotal((count) => Math.max(0, count - 1));
    try {
      await setApplicationStatus([application.id], status);
      if (!undoable) return void load();
      toast.success(status === "done" ? "Markerad som hanterad." : "Flyttad tillbaka.", {
        label: "Ångra",
        onClick: () => void changeStatus({ ...application, status }, previous, false),
      });
    } catch (error) {
      toast.error(errorMessage(error, "Ändringen kunde inte sparas."));
      void load();
    }
  }

  async function remove(application: Application) {
    setRemoving(null);
    try {
      await deleteApplication(application.id);
      setRows((current) => current?.filter((row) => row.id !== application.id) ?? null);
      setTotal((count) => Math.max(0, count - 1));
      toast.success("Anmälan är borttagen.");
    } catch (error) {
      toast.error(errorMessage(error, "Anmälan kunde inte tas bort."));
    }
  }

  const empty =
    filter === "done"
      ? { title: "Inga hanterade anmälningar än", text: "När du markerar en anmälan som hanterad hamnar den här." }
      : { title: "Inga anmälningar att hantera", text: "Nya anmälningar från Jobba hos oss på hemsidan dyker upp här." };

  return (
    <section aria-labelledby="applications-heading" className="max-w-[860px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="applications-heading" className="text-[18px] font-semibold text-admin-ink">
          Vill jobba hos er
        </h2>
        <div role="group" aria-label="Visa" className="flex flex-wrap gap-1 rounded-xl bg-stone-900/5 p-1">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => {
                setFilter(item.id);
                setLimit(PAGE);
                setRows(null);
              }}
              className={`min-h-10 rounded-lg px-3.5 text-[14px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-admin ${
                filter === item.id ? "bg-white text-admin-ink shadow-sm" : "text-admin-muted hover:text-admin-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {rows === null ? (
        <div className="space-y-4" role="status" aria-label="Laddar anmälningar">
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 ring-1 ring-admin-line">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3.5 w-56" />
                </div>
              </div>
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl bg-white ring-1 ring-admin-line">
          <EmptyState icon={BriefcaseBusiness} title={empty.title} text={empty.text} />
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {rows.map((application) => (
              <li key={application.id}>
                <ApplicationCard
                  application={application}
                  fresh={fresh.has(application.id)}
                  onStatus={(status) => void changeStatus(application, status)}
                  onDelete={() => setRemoving(application)}
                />
              </li>
            ))}
          </ul>
          {rows.length < total && (
            <div className="text-center">
              <AdminButton variant="ghost" size="sm" onClick={() => setLimit(limit + PAGE)}>
                Visa fler ({total - rows.length} till)
              </AdminButton>
            </div>
          )}
        </>
      )}

      <Dialog
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title="Ta bort anmälan?"
        description={removing ? `Anmälan från ${removing.name} tas bort för gott.` : undefined}
        size="sm"
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setRemoving(null)} data-autofocus>
              Behåll
            </AdminButton>
            <AdminButton variant="danger" onClick={() => removing && void remove(removing)}>
              Ta bort
            </AdminButton>
          </>
        }
      />
    </section>
  );
}
