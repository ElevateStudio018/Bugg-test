"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { KeyRound, Trash2, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminButton } from "@/components/admin/ui/Button";
import { Card, CardHeader } from "@/components/admin/ui/Card";
import { Dialog } from "@/components/admin/ui/Dialog";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { TextField } from "@/components/admin/ui/Field";
import { SkeletonLines } from "@/components/admin/ui/Skeleton";
import { useToast } from "@/components/admin/ui/Toast";
import { callFunction, errorMessage } from "@/lib/admin/supabase";
import { basePath } from "@/lib/admin/config";

interface StaffAccount {
  id: string;
  email: string;
  full_name: string;
}

/** A password that meets the rules (upper and lower case, digits and a sign, 14 characters), easy to read out. */
function suggestPassword(): string {
  const pick = (chars: string, count: number) => Array.from(crypto.getRandomValues(new Uint32Array(count)), (n) => chars[n % chars.length]).join("");
  return `${pick("ABCDEFGHJKLMNPQRSTUVWXYZ", 2)}${pick("abcdefghijkmnpqrstuvwxyz", 6)}-${pick("23456789", 4)}!${pick("abcdefghijkmnpqrstuvwxyz", 1)}`;
}

/** The staff's accounts for their page on the site (Personal): who has one, adding one and removing one. */
export default function StaffAccountsPage() {
  const toast = useToast();
  const [accounts, setAccounts] = useState<StaffAccount[] | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(suggestPassword);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<{ email: string; password: string } | null>(null);
  const [removing, setRemoving] = useState<StaffAccount | null>(null);

  const load = useCallback(async () => {
    try {
      const result = await callFunction<{ staff: StaffAccount[] }>("staff-accounts", { action: "list" });
      setAccounts(result.staff);
    } catch (problem) {
      toast.error(errorMessage(problem, "Kontona kunde inte hämtas."));
      setAccounts([]);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function create(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Fyll i namn och en e-postadress.");
    setBusy(true);
    try {
      await callFunction("staff-accounts", { action: "create", name: name.trim(), email: email.trim(), password });
      setCreated({ email: email.trim(), password });
      setName("");
      setEmail("");
      setPassword(suggestPassword());
      void load();
    } catch (problem) {
      setError(errorMessage(problem, "Kontot kunde inte skapas."));
    } finally {
      setBusy(false);
    }
  }

  async function remove(account: StaffAccount) {
    setRemoving(null);
    try {
      await callFunction("staff-accounts", { action: "remove", id: account.id });
      toast.success(`${account.full_name || account.email} kan inte längre logga in.`);
      void load();
    } catch (problem) {
      toast.error(errorMessage(problem, "Kontot kunde inte tas bort."));
    }
  }

  const staffUrl = typeof window === "undefined" ? "" : `${window.location.origin}${basePath}/personal/`;

  return (
    <>
      <PageHeader
        title="Personal"
        description="Konton för personalens sida på hemsidan. Där finns förbättringsförslag, policyer och kontaktpersoner."
      />
      <div className="grid max-w-[1100px] gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <Card>
          <CardHeader title="Konton" description={staffUrl ? `Personalen loggar in på ${staffUrl}` : undefined} />
          {accounts === null ? (
            <SkeletonLines lines={4} />
          ) : accounts.length === 0 ? (
            <EmptyState icon={Users} title="Inga konton än" text="Lägg till den första till höger." />
          ) : (
            <ul className="-mx-2 divide-y divide-admin-line">
              {accounts.map((account) => (
                <li key={account.id} className="flex items-center gap-3 px-2 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-admin-ink">{account.full_name || account.email}</p>
                    <p className="truncate text-[13px] text-admin-muted">{account.email}</p>
                  </div>
                  <AdminButton size="sm" variant="ghost" icon={Trash2} onClick={() => setRemoving(account)} className="text-red-700 hover:bg-red-50">
                    Ta bort
                  </AdminButton>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="Lägg till" description="Du väljer lösenordet och ger det till den anställda." />
          <form onSubmit={create} noValidate className="space-y-4">
            <TextField label="Namn" value={name} onChange={setName} autoComplete="off" />
            <TextField label="E-postadress" type="email" inputMode="email" value={email} onChange={setEmail} autoComplete="off" />
            <div>
              <TextField
                label="Lösenord"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
                hint="Minst 12 tecken med stora och små bokstäver, siffror och tecken."
              />
              <AdminButton size="sm" variant="ghost" icon={KeyRound} className="mt-1" onClick={() => setPassword(suggestPassword())}>
                Föreslå ett nytt
              </AdminButton>
            </div>
            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[14px] text-red-800">
                {error}
              </p>
            )}
            <AdminButton type="submit" variant="primary" icon={UserPlus} className="w-full" busy={busy} busyLabel="Skapar…">
              Skapa konto
            </AdminButton>
          </form>
        </Card>
      </div>

      <Dialog
        open={created !== null}
        onClose={() => setCreated(null)}
        title="Kontot är klart"
        description={created ? `Ge ${created.email} lösenordet nedan. Det visas bara nu.` : undefined}
        size="sm"
        footer={
          <AdminButton variant="primary" onClick={() => setCreated(null)}>
            Klar
          </AdminButton>
        }
      >
        <p className="rounded-xl bg-stone-100 px-4 py-3 font-mono text-[17px] text-admin-ink">{created?.password}</p>
      </Dialog>

      <Dialog
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title="Ta bort kontot?"
        description={removing ? `${removing.full_name || removing.email} kan då inte logga in på personalens sida.` : undefined}
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
    </>
  );
}
