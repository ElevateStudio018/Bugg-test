-- Interest in working at the company, sent from the form behind "Jobba hos oss" on the site through the
-- submit-application Edge Function: stored for the admin (Intresseanmälningar) and e-mailed to the company. Only the
-- status can change afterwards.

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  phone text not null default '' check (char_length(phone) <= 40),
  email text not null default '' check (char_length(email) <= 200),
  -- What the applicant can do or would like to work with, in their own words.
  experience text not null default '' check (char_length(experience) <= 200),
  message text not null check (char_length(message) between 1 and 3000),
  status text not null default 'new' check (status in ('new', 'read', 'done')),
  -- A one-way hash of the sender's address, only to limit how often one sender can send.
  sender_hash text not null default '',
  created_at timestamptz not null default now()
);
create index job_applications_created_idx on public.job_applications (created_at desc);
create index job_applications_sender_idx on public.job_applications (sender_hash, created_at);
alter table public.job_applications enable row level security;
create policy "Admins read applications" on public.job_applications for select to authenticated using ((select public.is_admin()));
create policy "Admins mark applications" on public.job_applications for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins delete applications" on public.job_applications for delete to authenticated using ((select public.is_admin()));

create or replace function private.job_applications_guard()
returns trigger
language plpgsql
as $$
begin
  if (new.name, new.phone, new.email, new.experience, new.message, new.created_at, new.sender_hash)
    is distinct from (old.name, old.phone, old.email, old.experience, old.message, old.created_at, old.sender_hash) then
    raise exception 'An application''s content cannot be changed' using errcode = 'insufficient_privilege';
  end if;
  return new;
end;
$$;
create trigger job_applications_guard before update on public.job_applications for each row execute function private.job_applications_guard();

-- Stores an application, with a limit per sender.
create or replace function public.insert_job_application(
  p_name text, p_phone text, p_email text, p_experience text, p_message text, p_sender_hash text, p_max_per_hour int default 5
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  recent int;
  application_id uuid;
begin
  select count(*) into recent from public.job_applications where sender_hash = p_sender_hash and created_at > now() - interval '1 hour';
  if recent >= p_max_per_hour then
    return jsonb_build_object('status', 'rate_limited');
  end if;
  insert into public.job_applications (name, phone, email, experience, message, sender_hash)
  values (p_name, p_phone, p_email, p_experience, p_message, p_sender_hash)
  returning id into application_id;
  return jsonb_build_object('status', 'saved', 'id', application_id);
end;
$$;
revoke execute on function public.insert_job_application(text, text, text, text, text, text, int) from public, anon, authenticated;
grant execute on function public.insert_job_application(text, text, text, text, text, text, int) to service_role;
revoke execute on all functions in schema private from public, anon, authenticated;
grant execute on all functions in schema private to service_role;

-- New applications show up in the admin at once where Realtime is on.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    alter publication supabase_realtime add table public.job_applications;
  end if;
end;
$$;
