-- The staff's own page on the site (/personal): staff accounts, made by the admin (Edge Function staff-accounts), sign
-- in there and read their own profile. They reach nothing in the admin.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('admin', 'staff', 'none'));

drop policy if exists "Everyone reads their own profile" on public.profiles;
create policy "Everyone reads their own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
