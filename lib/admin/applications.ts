import { supabase } from "./supabase";

/** Interest in working at the company, sent from the form behind "Jobba hos oss" on the site. */
export interface Application {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** What they can do or would like to work with, in their own words. */
  experience: string;
  message: string;
  status: "new" | "read" | "done";
  created_at: string;
}

export type ApplicationFilter = "open" | "done" | "all";

export async function listApplications(filter: ApplicationFilter, limit: number): Promise<{ rows: Application[]; total: number }> {
  let request = supabase().from("job_applications").select("id, name, phone, email, experience, message, status, created_at", { count: "exact" });
  if (filter === "open") request = request.in("status", ["new", "read"]);
  if (filter === "done") request = request.eq("status", "done");
  const { data, count, error } = await request.order("created_at", { ascending: false }).range(0, limit - 1);
  if (error) throw error;
  return { rows: (data as Application[]) ?? [], total: count ?? 0 };
}

export async function countNewApplications(): Promise<number> {
  const { count } = await supabase().from("job_applications").select("id", { count: "exact", head: true }).eq("status", "new");
  return count ?? 0;
}

export async function setApplicationStatus(ids: string[], status: Application["status"]): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase().from("job_applications").update({ status }).in("id", ids);
  if (error) throw error;
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase().from("job_applications").delete().eq("id", id);
  if (error) throw error;
}
